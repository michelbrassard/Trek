'use client'

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import clsx from "clsx";

interface Node {
    id: string;
    title: string;
    description: string;
    group?: number;
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
    vx?: number;
    vy?: number;
    isCompleted?: boolean
}

interface Link {
    source: string | Node;
    target: string | Node;
    value?: number;
}

interface Prerequisite {
    id: string
}

interface Goal {
    id: string,
    title: string,
    description: string,
    isCompleted: boolean
    prerequisites: Prerequisite[]
}

interface SkillGoals {
    id: string,
    title: string,
    description: string,
    goals: Goal[]
}

interface ForceGraphProps {
    skillGoals: SkillGoals;
    width?: number;
    height?: number;
    className?: string;
}

export default function MiniForceGraph({ skillGoals, width = 120, height = 120, className }: ForceGraphProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const nodes: Node[] = skillGoals.goals.map(goal => (
            {id: goal.id, title: goal.title, description: goal.description, isCompleted: goal.isCompleted }
        ))
        const links: Link[] = skillGoals.goals.flatMap(goal =>
            goal.prerequisites.map(prereq => (
                {source: prereq.id, target:goal.id, value: 0}
            ))
        );

        const container = d3.select(svgRef.current);
        container.selectAll("*").remove();

        const simulation = d3
            .forceSimulation<Node>([...nodes]) // clone to prevent mutation
            .force(
                "link",
                d3
                    .forceLink<Node, Link>([...links])
                    .id(d => d.id)
                    .distance(15)
            )
            .force("charge", d3.forceManyBody().strength(-2))
            .force("center", d3.forceCenter(width / 2, height / 2));

        
        function getSource(link: Link): Node | undefined {
            return nodes.find(n => n === link.source)
        }
        function getTarget(link: Link): Node | undefined {
            return nodes.find(n => n === link.target)
        }

        const link = container
            .append("g")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("class", link => {
                if (getSource(link)?.isCompleted && getTarget(link)?.isCompleted) {
                    return "stroke-blue-500" 
                }
                return "stroke-neutral-500"
            })
            .attr("stroke-opacity", link => getSource(link)?.isCompleted ? 0.7 : 0.2)
            .attr("stroke-width", 1)
            .attr("stroke-linecap", "round")

        const node = container
            .append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")

        node
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 2)
            .attr("class", d => clsx(d.isCompleted ? "fill-blue-500" : "fill-neutral-500"))

        while (simulation.alpha() > 0.01) simulation.tick();
        link
            .attr("x1", d => (typeof d.source === "object" ? d.source.x ?? 0 : 0))
            .attr("y1", d => (typeof d.source === "object" ? d.source.y ?? 0 : 0))
            .attr("x2", d => (typeof d.target === "object" ? d.target.x ?? 0 : 0))
            .attr("y2", d => (typeof d.target === "object" ? d.target.y ?? 0 : 0));

        node.attr("transform", d => `translate(${d.x ?? 0}, ${d.y ?? 0})`);

        return () => {
            simulation.stop();
        };
    }, [width, height, skillGoals.goals, skillGoals.id]);

    return (
        <div className="relative">
            <svg 
                ref={svgRef} 
                width={width} 
                height={height} 
                style={{ maxWidth: "100%", height: "auto" }} 
                className={clsx("rounded-2xl", className)}
            />
        </div>
    )
}
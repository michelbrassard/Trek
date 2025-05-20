'use client'

import { useEffect, useRef } from "react";
import * as d3 from "d3";

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
}

export default function ForceGraph({ skillGoals, width = 800, height = 600 }: ForceGraphProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const nodes: Node[] = skillGoals.goals.map(goal => (
            {id: goal.id, title: goal.title, description: goal.description}
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
            .distance(100)
        )
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2));

        const link = container
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 1);


        const node = container
            .append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .attr("cursor", "pointer");

        // Append rectangles
        node
            .append("rect")
            .attr("x", -40) // center horizontally
            .attr("y", -15) // center vertically
            .attr("width", 80)
            .attr("height", 60)
            .attr("rx", 6)
            .attr("class", "fill-neutral-500 transition-all");

        // Append text inside rectangles
        // Title line
        node
            .append("text")
            .text(d => d.title)
            .attr("text-anchor", "middle")
            .attr("y", 5) // shift up
            .style("font", "bold 16px sans-serif")
            .style("class", "fill-black");

        // Description line
        node
            .append("text")
            .text(d => d.description)
            .attr("text-anchor", "middle")
            .attr("y", 20) // shift down
            .style("font", "16px sans-serif")
            .style("class", "fill-neutral-900");
        
        node.on("click", function(_, d) {
            console.log("Clicked node:", d.id);
        });
        node.select('rect').on("mouseover", function (_event, _d) {
            console.log(_d, _event)
            d3.select(this)
                .transition()
                .duration(150)
                .attr("class", "fill-blue-500");
        })
        node.select('rect').on("mouseout", function (_event, _d) {
            console.log(_d, _event)
            d3.select(this)
                .transition()
                .duration(150)
                .attr("class", "fill-neutral-500");
        });

        simulation.on("tick", () => {
            link
                .attr("x1", d => (typeof d.source === "object" ? d.source.x ?? 0 : 0))
                .attr("y1", d => (typeof d.source === "object" ? d.source.y ?? 0 : 0))
                .attr("x2", d => (typeof d.target === "object" ? d.target.x ?? 0 : 0))
                .attr("y2", d => (typeof d.target === "object" ? d.target.y ?? 0 : 0));

            node.attr("transform", d => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
        });

        return () => {
            simulation.stop();
        };
    }, [width, height, skillGoals.goals]);

    return <svg 
            ref={svgRef} 
            width={width} 
            height={height} 
            style={{ maxWidth: "100%", height: "auto" }} 
            className="bg-[radial-gradient(circle,_#ddd_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#222_1px,_transparent_1px)] [background-size:20px_20px]"
        />;
}
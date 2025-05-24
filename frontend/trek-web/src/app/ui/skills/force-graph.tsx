'use client'

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { AnimatePresence, motion } from "framer-motion";

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
    isCompleted?: boolean //TODO
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
    const [hoveredElement, setHoveredElement] = useState<Node | null>()
    const [hoveredX, setHoveredX] = useState<number>()
    const [hoveredY, setHoveredY] = useState<number>()

    useEffect(() => {
        if (!svgRef.current) return;

        const nodes: Node[] = skillGoals.goals.map(goal => (
            {id: goal.id, title: goal.title, description: goal.description }
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
            .attr("stroke-opacity", 0.2)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5")

        const node = container
            .append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .attr("cursor", "pointer")
            .on("click", function(_, d) {
                console.log("Clicked node:", d.id);
            });

        node
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 20)
            .attr("class", "fill-neutral-500 transition-all")
            .on("mouseover", function (event, d) {
                setHoveredElement(d)
                setHoveredX(d.x! + 15)
                setHoveredY(d.y! + 15)
                d3.select(this)
                    .transition()
                    .duration(150)
                    .attr("class", "fill-blue-500");
                })
            .on("mouseout", function () {
                setHoveredElement(null)
                setHoveredX(0)
                setHoveredY(0)
                d3.select(this)
                    .transition()
                    .duration(150)
                    .attr("class", "fill-neutral-500");
            });

        node
            .append("text")
            .attr("x", 30)
            .attr("y", 5)
            .text(d => d.title)
            .attr("class", "dark:fill-white fill-black capitalize");
        
        simulation.on("tick", () => {
            link
                .attr("x1", d => (typeof d.source === "object" ? d.source.x ?? 0 : 0))
                .attr("y1", d => (typeof d.source === "object" ? d.source.y ?? 0 : 0))
                .attr("x2", d => (typeof d.target === "object" ? d.target.x ?? 0 : 0))
                .attr("y2", d => (typeof d.target === "object" ? d.target.y ?? 0 : 0));

            node.attr("transform", d => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
        });

        // while (simulation.alpha() > 0.01) simulation.tick();
        // link
        //     .attr("x1", d => (typeof d.source === "object" ? d.source.x ?? 0 : 0))
        //     .attr("y1", d => (typeof d.source === "object" ? d.source.y ?? 0 : 0))
        //     .attr("x2", d => (typeof d.target === "object" ? d.target.x ?? 0 : 0))
        //     .attr("y2", d => (typeof d.target === "object" ? d.target.y ?? 0 : 0));

        // node.attr("transform", d => `translate(${d.x ?? 0}, ${d.y ?? 0})`);

        return () => {
            simulation.stop();
        };
    }, [width, height, skillGoals.goals]);

    return (
        <div className="relative">
            <svg 
                ref={svgRef} 
                width={width} 
                height={height} 
                style={{ maxWidth: "100%", height: "auto" }} 
                className="bg-[radial-gradient(circle,_#ddd_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#222_1px,_transparent_1px)] [background-size:20px_20px]"
            />
            <AnimatePresence>
                {hoveredElement &&
                    <motion.div 
                        style={{ left: (hoveredX), top: hoveredY, position: 'absolute' }}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="backdrop-blur-md bg-neutral-100/60 dark:bg-neutral-900/60 py-2 px-3 rounded-xl min-w-[200px]">
                            <h2 className="text-xl font-bold capitalize">{hoveredElement.title}</h2>
                            <p>{hoveredElement.description}</p>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            
        </div>
        
    )
    
}
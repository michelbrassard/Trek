'use client'

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useRouter } from "next/navigation";

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
}

export default function ForceGraph({ skillGoals, width = 800, height = 600 }: ForceGraphProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [hoveredElement, setHoveredElement] = useState<Node | null>(null)
    const [hoveredX, setHoveredX] = useState<number>()
    const [hoveredY, setHoveredY] = useState<number>()
    const router = useRouter()

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
                    .distance(100)
            )
            .force("charge", d3.forceManyBody().strength(-100))
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
                    return "stroke-green-500"
                }
                return "stroke-neutral-500"
            })
            .attr("stroke-opacity", link => getSource(link)?.isCompleted ? 0.7 : 0.2)
            .attr("stroke-width", 2)
            .attr("stroke-linecap", "round")
            .attr("stroke-dasharray", link => {
                const source = getSource(link)
                const target = getTarget(link)

                if (source?.isCompleted && !target?.isCompleted) {
                    return "5,5" 
                }
                else if(!source?.isCompleted) {
                    return "0.5,4"
                }

                return "0,0"
            })
            .attr("stroke-dashoffset", 10);
        
        const animatedLinks = link.filter(d => {
            const source = getSource(d);
            return typeof source !== "string" && !!source && source.isCompleted === true;
        });
        
        function animateLoop() {
            animatedLinks
                .attr("stroke-dashoffset", 10)
                .transition()
                .duration(1000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", -10)
                .on("end", animateLoop);
        }
        animateLoop();

        function getCompletionStateStyling(node: Node): string {
            const foundLink = links.find(link => link.target === node)

            if (!foundLink) {
                return "fill-neutral-500"
            }

            return (typeof foundLink.source !== "string" && foundLink.source.isCompleted) ? 
            "fill-neutral-500"
            : 
            "fill-neutral-200 dark:fill-neutral-800";
        }

        const node = container
            .append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .attr("cursor", "pointer").on("click", function(_, d) {
                router.push(`${skillGoals.id}/goals/${d.id}`)
            });

        node
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 20)
            .attr("class", d => clsx("transition-all", (d.isCompleted ? "fill-green-500" : getCompletionStateStyling(d))))
            .on("mouseover", function (event, node) {
                setHoveredElement(node)
                setHoveredX(node.x! + 20)
                setHoveredY(node.y! + 20)
                d3.select(this)
                    .attr("r", 22);
            })
            .on("mouseout", function () {
                setHoveredElement(null)
                d3.select(this)
                    .attr("r", 20);
            });

        node
            .append("text")
            .attr("x", 30)
            .attr("y", 5)
            .text(d => d.title)
            .attr("class", "dark:fill-white fill-black capitalize");
        
        //simulation
        // simulation.on("tick", () => {
        //     link
        //         .attr("x1", d => (typeof d.source === "object" ? d.source.x ?? 0 : 0))
        //         .attr("y1", d => (typeof d.source === "object" ? d.source.y ?? 0 : 0))
        //         .attr("x2", d => (typeof d.target === "object" ? d.target.x ?? 0 : 0))
        //         .attr("y2", d => (typeof d.target === "object" ? d.target.y ?? 0 : 0));

        //     node.attr("transform", d => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
        // });

        //instant rearrange, no animation
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
    }, [width, height, skillGoals.goals, skillGoals.id, router]);

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
                        <div className="backdrop-blur-md bg-neutral-100/60 dark:bg-neutral-900/60 py-2 px-3 rounded-xl min-w-[200px] border border-neutral-200 dark:border-neutral-800">
                            <h2 className="text-[10px] font-medium text-neutral-500 uppercase">{hoveredElement.title}</h2>
                            <p>{hoveredElement.description}</p>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}
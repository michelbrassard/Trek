'use client'

import { useEffect, useRef } from "react";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        let clicked = false

        if (!canvas) {
            return
        }

        canvas.style.width = `${1000}px`;
        canvas.style.height = `${600}px`;

        const context = canvas.getContext('2d');
        const scale = window.devicePixelRatio;

        canvas.width = Math.floor(1000 * scale);
        canvas.height = Math.floor(600 * scale);

        if (!context) return
        
        context.scale(scale, scale);

        let x = 0
        let startX = 0
        let startY = 0
        let lineText = "0"

        canvas.addEventListener('mousedown', (event: MouseEvent) => {
            clicked = true
            startX = event.clientX - canvas.getBoundingClientRect().left
            startY = event.clientY - canvas.getBoundingClientRect().top

            context.lineWidth = 8
            context.lineCap = "round";
        });

        canvas.addEventListener("mousemove", (event: MouseEvent) => {
            if (!clicked) {
                return
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            x = event.clientX - canvas.getBoundingClientRect().left
            
            context.beginPath();
            context.fillStyle = "#3b82f6";
            context.strokeStyle = "#3b82f6";
            context.moveTo(startX, startY)
            context.lineTo(x, startY);
            context.stroke()

            context.fillText(`${Math.abs(x - startX) * 10}`, Math.max(x, startX) - 10 ,startY - 15)
        })

        canvas.addEventListener("mouseup", () => {
            clicked = false
        })

    }, [])

    return(
        <div>
            <canvas 
                ref={canvasRef}
                id="experiement" 
                width="1000" 
                height="600"
                className="mt-2 rounded-2xl bg-[radial-gradient(circle,_#ddd_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#222_1px,_transparent_1px)] [background-size:20px_20px] border border-neutral-200 dark:border-neutral-800"
            ></canvas>
        </div>
    )
}
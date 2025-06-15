'use client'

import { useEffect, useRef } from "react";

export default function Canvas() {
    const lineCanvasRef = useRef<HTMLCanvasElement>(null);
    const columnCanvasRef = useRef<HTMLCanvasElement>(null);
    const value = useRef(0)

    useEffect(() => {
        const loadLineCanvas = () => {
            const lineCanvas = lineCanvasRef.current;
            let clicked = false

            if (!lineCanvas) {
                return
            }

            const lineCanvasWidth = 800
            const lineCanvasHeight = 300
            lineCanvas.style.width = `${lineCanvasWidth}px`;
            lineCanvas.style.height = `${lineCanvasHeight}px`;

            const context = lineCanvas.getContext('2d');
            const scale = window.devicePixelRatio;

            lineCanvas.width = Math.floor(lineCanvasWidth * scale);
            lineCanvas.height = Math.floor(lineCanvasHeight * scale);

            if (!context) return
            context.scale(scale, scale);

            let x = 0
            let startX = 0
            let startY = 0

            lineCanvas.addEventListener('mousedown', (event: MouseEvent) => {
                clicked = true
                startX = event.clientX - lineCanvas.getBoundingClientRect().left
                startY = event.clientY - lineCanvas.getBoundingClientRect().top

                context.lineWidth = 8
                context.lineCap = "round";
                context.fillStyle = "#3b82f6";
                context.strokeStyle = "#3b82f6";
            });

            lineCanvas.addEventListener("mousemove", (event: MouseEvent) => {
                if (!clicked) {
                    return
                }
                context.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
                x = event.clientX - lineCanvas.getBoundingClientRect().left
                
                context.beginPath();
                
                context.moveTo(startX, startY)
                context.lineTo(x, startY);
                context.stroke()

                value.current = Math.abs(x - startX) * 10
                context.fillText(`${value.current}`, Math.max(x, startX) - 10 ,startY - 15)
            })

            lineCanvas.addEventListener("mouseup", () => {
                clicked = false
            })
        }

        const loadColumnCanvas = () => {
            const columnCanvas = columnCanvasRef.current;
            let clicked = false

            if (!columnCanvas) {
                return
            }

            const canvasWidth = 800
            const canvasHeight = 300
            columnCanvas.style.width = `${canvasWidth}px`;
            columnCanvas.style.height = `${canvasHeight}px`;
            const context = columnCanvas.getContext('2d');
            const scale = window.devicePixelRatio;

            columnCanvas.width = Math.floor(canvasWidth * scale);
            columnCanvas.height = Math.floor(canvasHeight * scale);

            if (!context) return
            context.scale(scale, scale);

            // let x = 0
            // let y = 0
            // let startX = 0
            // let startY = 0

            const rectangeX = 30
            let rectangeY =  canvasHeight - 70
            const rectangleWidth = canvasWidth - rectangeX * 2
            const rectangleHeight = 15

            context.roundRect(rectangeX, rectangeY, rectangleWidth, rectangleHeight, 20)
            context.fillStyle = "#3b82f6";
            context.fill()

            columnCanvas.addEventListener('mousemove', (event: MouseEvent) => {
                const mouseX = event.clientX - columnCanvas.getBoundingClientRect().left
                const mouseY = event.clientY - columnCanvas.getBoundingClientRect().top

                if(
                    (mouseX >= rectangeX && mouseX <= rectangeX + rectangleWidth) &&
                    (mouseY >= rectangeY && mouseY <= rectangeY + rectangleHeight)
                ) {
                    context.clearRect(0, 0, columnCanvas.width, columnCanvas.height);
                    context.roundRect(rectangeX, rectangeY, rectangleWidth, rectangleHeight, 20)
                    context.fillStyle = "red";
                    context.fill()
                    context.stroke()

                    if (clicked) {
                        rectangeY = mouseY
                        context.clearRect(0, 0, columnCanvas.width, columnCanvas.height);
                        context.roundRect(rectangeX, -mouseY, rectangleWidth, rectangleHeight, 20)
                        context.fillStyle = "green";
                        context.fill()
                        context.stroke()
                    }
                }
                else {
                    context.clearRect(0, 0, columnCanvas.width, columnCanvas.height);
                    context.roundRect(rectangeX, rectangeY, rectangleWidth, rectangleHeight, 20)
                    context.fillStyle = "#3b82f6";
                    context.fill()
                    context.stroke()
                }

            });

            columnCanvas.addEventListener('mousedown', () => {
                clicked = true
            });
            columnCanvas.addEventListener('mouseup', () => {
                clicked = false
            })

            // columnCanvas.addEventListener('mousedown', (event: MouseEvent) => {
            //     clicked = true
            //     startX = event.clientX - columnCanvas.getBoundingClientRect().left
            //     startY = event.clientY - columnCanvas.getBoundingClientRect().top

            // });

            // columnCanvas.addEventListener("mousemove", (event: MouseEvent) => {
            //     if (!clicked) {
            //         return
            //     }
                
            //     x = event.clientX - columnCanvas.getBoundingClientRect().left
            //     y = event.clientY - columnCanvas.getBoundingClientRect().top
                
            //     context.beginPath();
            //     context.moveTo(startX, startY)
            //     context.lineTo(x, y);
            //     context.stroke()
            // })

            // columnCanvas.addEventListener("mouseup", () => {
            //     clicked = false
            // })
        }

        loadLineCanvas()
        loadColumnCanvas()
        

    }, [])

    return(
        <div className="flex flex-col gap-2">
            <canvas 
                ref={lineCanvasRef}
                id="line" 
                width="800" 
                height="300"
                className="mt-2 rounded-2xl bg-[radial-gradient(circle,_#ddd_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#222_1px,_transparent_1px)] [background-size:20px_20px] border border-neutral-200 dark:border-neutral-800"
            ></canvas>
            <canvas 
                ref={columnCanvasRef}
                id="column" 
                width="800" 
                height="300"
                className="mt-2 rounded-2xl bg-[radial-gradient(circle,_#ddd_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#222_1px,_transparent_1px)] [background-size:20px_20px] border border-neutral-200 dark:border-neutral-800"
            ></canvas>
        </div>
    )
}
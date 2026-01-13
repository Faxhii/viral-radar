"use client";

import { useEffect, useRef } from 'react';

export default function Waveform() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = 600;
        let time = 0;

        const resize = () => {
            if (canvas) {
                width = canvas.width = window.innerWidth;
                height = canvas.height = 600;
            }
        };
        window.addEventListener('resize', resize);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.01;

            // Style: Gradient Stroke matching the global theme
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)'); // Violet faint
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)'); // White center
            gradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)'); // Cyan faint

            ctx.lineWidth = 1.5;
            ctx.strokeStyle = gradient;

            // Draw multiple lines for "depth"
            for (let j = 1; j <= 3; j++) {
                ctx.beginPath();
                for (let i = 0; i < width; i += 5) {
                    // Complex Sine Wave
                    const y = (height / 2) +
                        (Math.sin(i * 0.003 + time * j) * 50) *
                        (Math.sin(i * 0.001) * 2);

                    if (i === 0) ctx.moveTo(i, y);
                    else ctx.lineTo(i, y);
                }
                ctx.stroke();
            }

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 z-0"
        />
    );
}

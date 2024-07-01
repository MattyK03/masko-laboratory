import React, { useEffect, useRef } from "react";

const Zachet: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const drawCloud = (x: number, y: number) => {
			ctx.fillStyle = "#42aaff"; // Более голубой цвет

			// Основной широкий овал
			ctx.beginPath();
			ctx.ellipse(x + 100, y + 20, 100, 20, 0, 0, Math.PI * 2); // Широкий овал
			ctx.fill();

			// Верхние овалы
			ctx.beginPath();
			ctx.ellipse(x + 40, y + 5, 20, 10, 0, 0, Math.PI * 2); // Левый верхний овал
			ctx.ellipse(x + 100, y - 2, 15, 7.5, 0, 0, Math.PI * 2); // Средний верхний овал
			ctx.ellipse(x + 160, y + 5, 20, 10, 0, 0, Math.PI * 2); // Правый верхний овал
			ctx.fill();

			// Нижние овалы
			ctx.beginPath();
			ctx.ellipse(x + 40, y + 30, 20, 10, 0, 0, Math.PI * 2); // Левый нижний овал
			ctx.ellipse(x + 100, y + 35, 20, 10, 0, 0, Math.PI * 2); // Средний нижний овал
			ctx.ellipse(x + 160, y + 30, 20, 10, 0, 0, Math.PI * 2); // Правый нижний овал
			ctx.fill();
		};

		// Function to draw a parachute
		const drawParachute = (x: number, y: number) => {
			ctx.strokeStyle = "#8ffe09";
			ctx.beginPath();
			ctx.lineWidth = 3;
			// Линия к центру
			ctx.moveTo(x + 33, y);
			ctx.lineTo(x + 30, y + 30);
			// Линия к левому краю
			ctx.moveTo(x - 3, y - 19);
			ctx.lineTo(x + 15, y + 30);
			// Линия к правому краю
			ctx.moveTo(x + 70, y - 19);
			ctx.lineTo(x + 45, y + 30);
			ctx.stroke();

			ctx.fillStyle = "#991199";
			ctx.beginPath();
			ctx.arc(x + 33, y, 45, Math.PI * 1.15, Math.PI * 1.85);
			ctx.lineTo(x + 33, y);
			ctx.closePath();
			ctx.fill();

			ctx.fillStyle = "#964B00";
			ctx.fillRect(x + 15, y + 30, 30, 30);
		};

		// Draw clouds
		drawCloud(350, 270);
		drawCloud(450, 150);
		drawCloud(230, 120);

		// Draw parachutes
		drawParachute(470, 275);
		drawParachute(370, 300);
		drawParachute(270, 250);
		drawParachute(320, 175);
		drawParachute(420, 155);
	}, []);

	return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Zachet;

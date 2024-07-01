import React, { useEffect, useRef } from "react";
import "./Canvas.scss";

const Canvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Draw the grass
		ctx.fillStyle = "#00A000";
		ctx.fillRect(0, 250, 400, 50);

		// Draw the mushroom stem
		ctx.fillStyle = "#4B004B";
		ctx.fillRect(165, 150, 70, 100);

		// Draw the mushroom cap
		const gradient = ctx.createLinearGradient(100, 100, 300, 100);
		gradient.addColorStop(0, "#FF6347");
		gradient.addColorStop(1, "#FF4500");
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(200, 150, 100, 0.8 * Math.PI, 2.2 * Math.PI);
		ctx.lineTo(200, 150);
		ctx.closePath();
		ctx.fill();

		// Draw the spots on the mushroom cap
		ctx.fillStyle = "#FFFACD";
		const spots = [
			{ x: 150, y: 160, r: 10 },
			{ x: 160, y: 100, r: 10 },
			{ x: 220, y: 70, r: 10 },
			{ x: 250, y: 120, r: 10 },
			{ x: 200, y: 130, r: 10 },
		];

		spots.forEach((spot) => {
			ctx.beginPath();
			ctx.arc(spot.x, spot.y, spot.r, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.closePath();
		});

		// Draw the green curves
		ctx.strokeStyle = "#00A000";
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(165, 250);
		ctx.bezierCurveTo(160, 150, 140, 220, 140, 200);
		ctx.moveTo(220, 250);
		ctx.bezierCurveTo(240, 150, 250, 220, 265, 200);
		ctx.stroke();
	}, []);

	return <canvas ref={canvasRef} width={400} height={300} />;
};

export default Canvas;

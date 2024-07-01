import React, { useRef, useState, useEffect } from "react";

const Canvas = ({ tool, lineColor, lineWidth, shapeOptions, fillColor }) => {
	const canvasRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [context, setContext] = useState(null);
	const [startPos, setStartPos] = useState({ x: 0, y: 0 });
	const [points, setPoints] = useState([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.strokeStyle = lineColor;
		ctx.lineWidth = lineWidth;
		setContext(ctx);
	}, [lineColor, lineWidth]);

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		setStartPos({ x: offsetX, y: offsetY });
		if (tool === "pen" || tool === "eraser") {
			context.beginPath();
			context.moveTo(offsetX, offsetY);
		} else if (tool === "polyline") {
			setPoints([...points, { x: offsetX, y: offsetY, type: "line" }]);
		}
		setIsDrawing(true);
	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) return;
		const { offsetX, offsetY } = nativeEvent;
		if (tool === "pen") {
			context.lineTo(offsetX, offsetY);
			context.stroke();
		} else if (tool === "eraser") {
			context.clearRect(offsetX, offsetY, 10, 10);
		}
	};

	const endDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		if (tool === "line") {
			context.beginPath();
			context.moveTo(startPos.x, startPos.y);
			context.lineTo(offsetX, offsetY);
			context.stroke();
			context.closePath();
		} else if (tool === "rectangle") {
			context.beginPath();
			context.rect(
				startPos.x,
				startPos.y,
				offsetX - startPos.x,
				offsetY - startPos.y
			);
			context.stroke();
			context.closePath();
		} else if (tool === "circle") {
			const radius = Math.sqrt(
				(offsetX - startPos.x) ** 2 + (offsetY - startPos.y) ** 2
			);
			context.beginPath();
			context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
			context.stroke();
			context.closePath();
		} else if (tool === "polygon") {
			const radius = Math.sqrt(
				(offsetX - startPos.x) ** 2 + (offsetY - startPos.y) ** 2
			);
			drawPolygon(
				context,
				shapeOptions.sides,
				radius,
				startPos.x,
				startPos.y,
				lineColor,
				fillColor
			);
		} else if (tool === "arc") {
			const radius = Math.sqrt(
				(offsetX - startPos.x) ** 2 + (offsetY - startPos.y) ** 2
			);
			drawArc(context, startPos.x, startPos.y, offsetX, offsetY, radius);
		} else if (tool === "polyline") {
			setPoints([...points, { x: offsetX, y: offsetY, type: "line" }]);
			drawPolyline(context, points);
		}
		setIsDrawing(false);
	};

	const drawPolygon = (
		ctx,
		sides,
		radius,
		centerX,
		centerY,
		lineColor,
		fillColor
	) => {
		const angle = (2 * Math.PI) / sides;
		ctx.beginPath();
		for (let i = 0; i < sides; i++) {
			ctx.lineTo(
				centerX + radius * Math.cos(i * angle),
				centerY + radius * Math.sin(i * angle)
			);
		}
		ctx.closePath();
		ctx.strokeStyle = lineColor;
		ctx.fillStyle = fillColor;
		ctx.fill();
		ctx.stroke();
	};

	const drawArc = (ctx, x1, y1, x2, y2, radius) => {
		ctx.beginPath();
		ctx.arcTo(x1, y1, x2, y2, radius);
		ctx.stroke();
	};

	const drawPolyline = (ctx, points) => {
		if (points.length < 2) return;
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		for (let i = 1; i < points.length; i++) {
			if (points[i].type === "line") {
				ctx.lineTo(points[i].x, points[i].y);
			} else if (points[i].type === "arc") {
				drawArc(
					ctx,
					points[i - 1].x,
					points[i - 1].y,
					points[i].x,
					points[i].y,
					points[i].radius
				);
			}
		}
		ctx.stroke();
	};

	const handleAddArc = () => {
		if (points.length < 2) return;
		setPoints([
			...points,
			{
				x: points[points.length - 1].x,
				y: points[points.length - 1].y,
				type: "arc",
				radius: 50,
			},
		]);
		drawPolyline(context, points);
	};

	return (
		<canvas
			ref={canvasRef}
			onMouseDown={startDrawing}
			onMouseMove={draw}
			onMouseUp={endDrawing}
			width={800}
			height={600}
		/>
	);
};

export default Canvas;

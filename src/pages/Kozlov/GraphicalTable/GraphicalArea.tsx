import React from "react";
import { Circle, Layer, Line, Stage } from "react-konva";
import { Point } from "./GraphicalTable";

const GraphicalArea = ({
	points,
	setPoints,
}: {
	points: Point[];
	setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}) => {
	const handleDrag = (index: number, e: any) => {
		const newPoints = [...points];
		newPoints[index] = { x: e.target.x(), y: e.target.y() };
		setPoints(newPoints);
	};

	const handleStageClick = (e: any) => {
		if (e.target === e.target.getStage()) {
			const { x, y } = e.target.getPointerPosition();
			setPoints([...points, { x, y }]);
		}
	};

	return (
		<Stage
			width={600}
			height={600}
			onMouseDown={handleStageClick}
			style={{ backgroundColor: "#fff" }}
		>
			<Layer>
				{points.map((point, i) => (
					<Circle
						key={i}
						x={point.x}
						y={point.y}
						radius={10}
						fill="blue"
						draggable
						onDragMove={(e) => handleDrag(i, e)}
					/>
				))}
				<Line
					points={points.flatMap((p) => [p.x, p.y])}
					stroke="black"
					strokeWidth={2}
					lineCap="round"
					lineJoin="round"
				/>
			</Layer>
		</Stage>
	);
};

export default GraphicalArea;

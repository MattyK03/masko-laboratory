import { useState } from "react";

const Toolbar = ({
	tool,
	setTool,
	setLineColor,
	setLineWidth,
	setShapeOptions,
	setFillColor,
}) => {
	const [polygonSides, setPolygonSides] = useState(5);
	const [polygonRadius, setPolygonRadius] = useState(50);

	const handlePolygonChange = () => {
		setShapeOptions({ sides: polygonSides, radius: polygonRadius });
	};

	const handleToolChange = (event) => {
		setTool(event.target.value);
	};

	return (
		<div className="toolbar">
			<select onChange={handleToolChange}>
				<option value="pen">Pen</option>
				<option value="eraser">Eraser</option>
				<option value="line">Line</option>
				<option value="rectangle">Rectangle</option>
				<option value="circle">Circle</option>
				<option value="polygon">Polygon</option>
				<option value="arc">Arc</option>
				<option value="polyline">Polyline</option>
			</select>
			<input
				type="color"
				onChange={(e) => setLineColor(e.target.value)}
			/>
			<input
				type="number"
				onChange={(e) => setLineWidth(e.target.value)}
			/>
			<input
				type="color"
				onChange={(e) => setFillColor(e.target.value)}
				placeholder="Fill Color"
			/>
			{tool === "polygon" && (
				<>
					<input
						type="number"
						value={polygonSides}
						onChange={(e) => setPolygonSides(e.target.value)}
					/>
					<input
						type="number"
						value={polygonRadius}
						onChange={(e) => setPolygonRadius(e.target.value)}
					/>
					<button onClick={handlePolygonChange}>Set Polygon</button>
				</>
			)}
			{tool === "polyline" && (
				<>
					<button onClick={() => setTool("addArc")}>Add Arc</button>
				</>
			)}
		</div>
	);
};

export default Toolbar;

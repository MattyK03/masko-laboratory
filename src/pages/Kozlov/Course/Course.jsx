import { useState } from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar";

const Course = () => {
	const [tool, setTool] = useState("pen");
	const [lineColor, setLineColor] = useState("#000000");
	const [lineWidth, setLineWidth] = useState(1);
	const [shapeOptions, setShapeOptions] = useState({ sides: 5, radius: 50 });
	const [fillColor, setFillColor] = useState("#FFFFFF");

	const saveCanvas = () => {
		const canvas = document.querySelector("canvas");
		const dataURL = canvas.toDataURL("image/png");
		const link = document.createElement("a");
		link.href = dataURL;
		link.download = "canvas.png";
		link.click();
	};

	const loadCanvas = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.querySelector("canvas");
				const ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);
			};
			img.src = e.target.result;
		};
		reader.readAsDataURL(file);
	};

	return (
		<div className="App">
			<Toolbar
				tool={tool}
				setTool={setTool}
				setLineColor={setLineColor}
				setLineWidth={setLineWidth}
				setShapeOptions={setShapeOptions}
				setFillColor={setFillColor}
			/>
			<Canvas
				tool={tool}
				lineColor={lineColor}
				lineWidth={lineWidth}
				shapeOptions={shapeOptions}
				fillColor={fillColor}
			/>
			<button onClick={saveCanvas}>Save</button>
			<input type="file" onChange={loadCanvas} />
		</div>
	);
};

export default Course;

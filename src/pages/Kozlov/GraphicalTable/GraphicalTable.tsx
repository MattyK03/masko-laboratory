import { useState } from "react";
import GraphicalArea from "./GraphicalArea";
import PointsTable from "./PointsTable";

export interface Point {
	x: number;
	y: number;
}

const GraphicalTable = () => {
	const [points, setPoints] = useState<Point[]>([]);

	console.log(points);

	const onDeletePoint = (target: any) => {
		points.filter((point) => point !== target);
	};

	return (
		<div
			style={{
				display: "flex",
				gap: 20,
			}}
		>
			<GraphicalArea points={points} setPoints={setPoints} />
			<PointsTable points={points} setPoints={setPoints} />
		</div>
	);
};

export default GraphicalTable;

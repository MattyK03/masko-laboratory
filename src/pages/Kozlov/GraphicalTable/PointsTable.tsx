import React from "react";
import { Point } from "./GraphicalTable";
import "./GraphicalTable.scss";

type PointsTableProps = {
	points: Point[];
	setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
};

const PointsTable: React.FC<PointsTableProps> = ({ points, setPoints }) => {
	const handlePointChange = (
		index: number,
		coord: "x" | "y",
		value: string
	) => {
		const updatedPoints = points.map((point, i) => {
			if (i === index) {
				return { ...point, [coord]: parseFloat(value) || 0 };
			}
			return point;
		});
		setPoints(updatedPoints);
	};

	const onDeletePoint = (target: any) => {
		setPoints(() => points.filter((point) => point.x !== target));
	};

	return (
		<div className="table_container">
			<table className="table">
				<thead>
					<tr>
						<th>Index</th>
						<th>X Coordinate</th>
						<th>Y Coordinate</th>
					</tr>
				</thead>
				<tbody>
					{points.map((point, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>
								<input
									type="number"
									value={point.x.toFixed(2)}
									onChange={(e) =>
										handlePointChange(
											index,
											"x",
											e.target.value
										)
									}
								/>
							</td>
							<td>
								<input
									type="number"
									value={point.y.toFixed(2)}
									onChange={(e) =>
										handlePointChange(
											index,
											"y",
											e.target.value
										)
									}
								/>
							</td>
							<td onClick={() => onDeletePoint(points[index].x)}>
								Delete
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PointsTable;

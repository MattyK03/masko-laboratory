import { Button, TextField } from "@mui/material";
import { useState } from "react";
import MatrixInput from "./MatrixInput";

const MatrixOperations = () => {
	const [matrixA, setMatrixA] = useState(Array(4).fill(Array(4).fill(0)));
	const [matrixB, setMatrixB] = useState(Array(4).fill(Array(4).fill(0)));
	const [resultMatrix, setResultMatrix] = useState(
		Array(4).fill(Array(4).fill(0))
	);
	const [scalar, setScalar] = useState(1);

	const [activeMode, setActiveMode] = useState();

	const multiplyMatrices = () => {
		const result = Array(4)
			.fill(0)
			.map(() => Array(4).fill(0));
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				for (let k = 0; k < 4; k++) {
					result[i][j] += matrixA[i][k] * matrixB[k][j];
				}
			}
		}
		setResultMatrix(result);
	};

	const multiplyMatrixByScalar = () => {
		const result = matrixA.map((row) => row.map((value) => value * scalar));
		setResultMatrix(result);
	};

	return (
		<div>
			<h2>Matrix A</h2>
			<MatrixInput matrix={matrixA} setMatrix={setMatrixA} />
			<h2 style={{ marginTop: "20px" }}>Matrix B</h2>
			<MatrixInput matrix={matrixB} setMatrix={setMatrixB} />
			<Button
				variant="contained"
				color="primary"
				onClick={multiplyMatrices}
			>
				Multiply Matrices
			</Button>
			<h2>Multiply Matrix A by Scalar</h2>
			<TextField
				style={{ backgroundColor: "#fff", marginRight: "10px" }}
				value={scalar}
				onChange={(e) => setScalar(parseFloat(e.target.value))}
				type="number"
				variant="outlined"
			/>
			<Button
				variant="contained"
				color="secondary"
				onClick={multiplyMatrixByScalar}
			>
				Multiply by Scalar
			</Button>
			<h2>Result</h2>
			<MatrixInput matrix={resultMatrix} setMatrix={() => {}} />
		</div>
	);
};

export default MatrixOperations;

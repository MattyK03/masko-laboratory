import { Grid, TextField } from "@mui/material";

const MatrixInput = ({ matrix, setMatrix }) => {
	const handleInputChange = (row, col, value) => {
		const newMatrix = matrix.map((r, rowIndex) =>
			r.map((val, colIndex) => {
				if (rowIndex === row && colIndex === col) {
					return parseFloat(value);
				}
				return val;
			})
		);
		setMatrix(newMatrix);
	};

	return (
		<Grid container spacing={2} style={{ padding: "10px" }}>
			{matrix.map((row, rowIndex) =>
				row.map((value, colIndex) => (
					<Grid item xs={3} key={`${rowIndex}-${colIndex}`}>
						<TextField
							style={{ backgroundColor: "#fff" }}
							value={value}
							onChange={(e) =>
								handleInputChange(
									rowIndex,
									colIndex,
									e.target.value
								)
							}
							type="number"
							variant="outlined"
							fullWidth
						/>
					</Grid>
				))
			)}
		</Grid>
	);
};

export default MatrixInput;

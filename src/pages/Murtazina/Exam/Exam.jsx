import { Container, Typography } from "@mui/material";
import MatrixOperations from "./MatrixOperations";

const Exam = () => {
	return (
		<Container style={{ color: "#fff", padding: "30px 10px" }}>
			<Typography variant="h2" align="center" gutterBottom>
				Matrix Calculator
			</Typography>
			<MatrixOperations />
		</Container>
	);
};

export default Exam;

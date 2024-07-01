import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const App: FC<any> = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				margin: "0 auto",
				height: "calc(100vh + 60px)",
				width: "100%",
				maxWidth: 1280,
			}}
		>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default App;

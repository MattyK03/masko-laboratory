import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./globals.scss";

const App: FC<any> = () => {
	return (
		<div className="app">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default App;

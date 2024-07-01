import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/Home";
import ThreeScene from "../../pages/Kozlov/3DFigure/ThreeScene";
import Kozlov from "../../pages/Kozlov/Kozlov";
import Laboratory from "../../pages/Laboratory";
import Murtazina from "../../pages/Murtazina/Murtazina";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Navigate to="/home" />,
			},
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/laboratory/kozlov",
				element: <Kozlov />,
			},
			{
				path: "/laboratory/murtazina",
				element: <Murtazina />,
			},
			{
				path: "/laboratory/",
				element: <Laboratory />,
				children: [
					{
						path: "/laboratory/kozlov",
						element: <Kozlov />,
					},
				],
			},
			{
				path: "*",
				element: <Home />,
			},
		],
	},
	{
		path: "/3dfigure",
		element: <ThreeScene />,
	},
]);

export default router;

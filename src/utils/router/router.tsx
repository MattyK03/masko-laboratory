import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/Home";
import Laboratory from "../../pages/Laboratory";

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
				path: "/Laboratory/:id",
				element: <Laboratory />,
			},
		],
	},
]);

export default router;

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./assets/styles/globals.scss";
import "./assets/styles/reset.css";
import store from "./store";
import router from "./utils/router/router";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);

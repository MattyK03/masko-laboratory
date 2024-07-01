import { FC } from "react";
import ImageViewer from "./ImageViewer";
import "./ViewerLab.scss";

const ViewerLab: FC = () => {
	return (
		<div className="viewer">
			<ImageViewer />
		</div>
	);
};

export default ViewerLab;

import { useState } from "react";
import LaboratoryTab from "../../components/Laboratory/LaboratoryTab/LaboratoryTab";
import Canvas from "./Canvas/Canvas";
import Clock from "./Clock/Clock";
import Gazeta from "./Gazeta/Gazeta";
import ViewerLab from "./ImageViewer/ViewerLab";
import Zachet from "./Zachet";

const Murtazina = () => {
	const [activeTab, setActiveTab] = useState<string>("GAME");

	const tabs: any = {
		GAZETA: <Gazeta />,
		IMAGEVIEWER: <ViewerLab />,
		CLOCK: <Clock />,
		CANVAS: <Canvas />,
		ZACHET: <Zachet />,
	};

	console.log(activeTab);

	return (
		<div className="teacher__wrapper">
			<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
				{/* <LaboratoryTab
					title={"Gazeta"}
					tabKey={"GAZETA"}
					setActiveTab={setActiveTab}
				/> */}
				<LaboratoryTab
					title={"Image Viewer"}
					tabKey={"IMAGEVIEWER"}
					setActiveTab={setActiveTab}
				/>
				<LaboratoryTab
					title={"Clock"}
					tabKey={"CLOCK"}
					setActiveTab={setActiveTab}
				/>
				<LaboratoryTab
					title={"Canvas"}
					tabKey={"CANVAS"}
					setActiveTab={setActiveTab}
				/>
				<LaboratoryTab
					title={"Zachet"}
					tabKey={"ZACHET"}
					setActiveTab={setActiveTab}
				/>
			</div>
			{tabs[activeTab]}
		</div>
	);
};

export default Murtazina;

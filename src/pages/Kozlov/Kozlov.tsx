import { useState } from "react";
import { Link } from "react-router-dom";
import LaboratoryTab from "../../components/Laboratory/LaboratoryTab/LaboratoryTab";
import ThreeScene from "./3DFigure/ThreeScene";
import Course from "./Course/Course";
import GraphicalTable from "./GraphicalTable/GraphicalTable";
import SquareGame from "./SquareGame/SquareGame";

const Kozlov = () => {
	const [activeTab, setActiveTab] = useState<string>("GAME");

	const tabs: any = {
		GAME: <SquareGame />,
		TABLE: <GraphicalTable />,
		SCENE: <ThreeScene />,
		COURSE: <Course />,
	};

	return (
		<div className="teacher__wrapper">
			<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
				<LaboratoryTab
					title={"Game"}
					tabKey={"GAME"}
					setActiveTab={setActiveTab}
				/>
				<LaboratoryTab
					title={"Table"}
					tabKey={"TABLE"}
					setActiveTab={setActiveTab}
				/>
				<LaboratoryTab
					title={"Table"}
					tabKey={"TABLE"}
					setActiveTab={setActiveTab}
					component={
						<Link
							style={{
								backgroundColor: "transparent",
								border: 0,
							}}
							className="lab_tab"
							to={"/3dfigure"}
						>
							3D
						</Link>
					}
				/>
				<LaboratoryTab
					title={"Course"}
					tabKey={"COURSE"}
					setActiveTab={setActiveTab}
				/>
			</div>
			{tabs[activeTab]}
		</div>
	);
};

export default Kozlov;

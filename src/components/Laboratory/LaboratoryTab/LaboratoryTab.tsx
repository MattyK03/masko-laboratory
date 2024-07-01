import { FC } from "react";
import "./LaboratoryTab.scss";

interface Props {
	title: string;
	tabKey?: string;
	setActiveTab?: any;
	component?: any;
}

const LaboratoryTab: FC<Props> = ({
	title,
	tabKey,
	setActiveTab,
	component,
}) => {
	return (
		<div className="lab_tab">
			{component ? (
				component
			) : (
				<button
					style={{
						width: "100%",
						height: "100%",
						backgroundColor: "transparent",
						border: 0,
					}}
					onClick={() => setActiveTab(tabKey)}
				>
					{title}
				</button>
			)}
		</div>
	);
};

export default LaboratoryTab;

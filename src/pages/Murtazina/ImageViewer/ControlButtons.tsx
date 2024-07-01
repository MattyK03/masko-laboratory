import React from "react";
import "./ViewerLab.scss";

interface ControlButtonsProps {
	onNext: () => void;
	onPrevious: () => void;
	onToggleSlideshow: () => void;
	isSlideshowActive: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
	onNext,
	onPrevious,
	onToggleSlideshow,
	isSlideshowActive,
}) => {
	return (
		<div style={{ marginTop: "20px" }}>
			<button onClick={onPrevious}>Previous</button>
			<button onClick={onNext}>Next</button>
			<button onClick={onToggleSlideshow}>
				{isSlideshowActive ? "Stop Slideshow" : "Start Slideshow"}
			</button>
		</div>
	);
};

export default ControlButtons;

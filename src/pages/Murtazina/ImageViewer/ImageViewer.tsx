import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setFiles } from "../../../store/slices/imageSlice";
import ControlButtons from "./ControlButtons";
import "./ViewerLab.scss";

const ImageViewer: React.FC = () => {
	const dispatch = useDispatch();
	const imageUrls = useSelector((state: RootState) => state.images.imageUrls);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isSlideshowActive, setIsSlideshowActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const showNextImage = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
	}, [imageUrls.length]);

	const showPreviousImage = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
		);
	};

	const toggleSlideshow = () => {
		setIsSlideshowActive(!isSlideshowActive);
	};

	const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const imageFiles = Array.from(files).filter((file) =>
				file.type.startsWith("image/")
			);
			const fileReaders = imageFiles.map((file) => {
				return new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = (e) => {
						if (e.target && typeof e.target.result === "string") {
							resolve(e.target.result);
						}
					};
					reader.onerror = reject;
					reader.readAsDataURL(file);
				});
			});

			Promise.all(fileReaders).then((base64Images) => {
				dispatch(setFiles(base64Images));
			});
		}
	};

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isSlideshowActive) {
			interval = setInterval(showNextImage, 3000);
		}
		return () => clearInterval(interval);
	}, [isSlideshowActive, showNextImage]);

	return (
		<div className="image-viewer-container">
			<div className="FileSelector">
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFiles}
					style={{ display: "none" }}
					id="fileInput"
					multiple
				/>
				<label
					htmlFor="fileInput"
					className="fileInputLabel"
					onClick={() => {
						if (fileInputRef.current) {
							fileInputRef.current.setAttribute(
								"webkitdirectory",
								"true"
							);
							fileInputRef.current.setAttribute(
								"directory",
								"true"
							);
						}
					}}
				>
					Select Image Directory
				</label>
			</div>

			<div className="image-viewer">
				{imageUrls.length > 0 && (
					<>
						<img
							src={imageUrls[currentIndex]}
							alt={`Image ${currentIndex + 1}`}
							style={{
								maxWidth: "80%",
								maxHeight: "70vh",
								objectFit: "contain",
								cursor: "pointer",
							}}
							onClick={() => {
								if (fileInputRef.current) {
									fileInputRef.current.setAttribute(
										"webkitdirectory",
										"true"
									);
									fileInputRef.current.setAttribute(
										"directory",
										"true"
									);
									fileInputRef.current.click();
								}
							}}
						/>
						<ControlButtons
							onNext={showNextImage}
							onPrevious={showPreviousImage}
							onToggleSlideshow={toggleSlideshow}
							isSlideshowActive={isSlideshowActive}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default ImageViewer;

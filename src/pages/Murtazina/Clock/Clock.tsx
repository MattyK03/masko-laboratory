import React, { useEffect, useState } from "react";
//@ts-ignore
import "./Clock.scss";

const Clock: React.FC = () => {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timerID = setInterval(() => setDate(new Date()), 1000);
		return () => clearInterval(timerID);
	}, []);

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const hourDeg = (hours % 12) * 30 + minutes * 0.5;
	const minuteDeg = minutes * 6;
	const secondDeg = seconds * 6;

	return (
		<div className="clock">
			<div className="gear">
				{[...Array(12)].map((_, i) => (
					<div
						key={i}
						className="gear-tooth"
						style={{
							transform: `rotate(${i * 30}deg) translate(155px)`,
						}}
					/>
				))}
			</div>
			<div className="gear-frame">
				<div className="clock-face">
					<div className="decorative-elements">
						<div className="small-gear">
							<div className="gear">
								{[...Array(6)].map((_, i) => (
									<div
										key={i}
										className="gear-tooth"
										style={{
											transform: `rotate(${
												i * 60
											}deg) translate(20px)`,
											height: "20px",
											width: "10px",
										}}
									/>
								))}
							</div>
						</div>
						<div className="small-gear">
							<div className="gear">
								{[...Array(8)].map((_, i) => (
									<div
										key={i}
										className="gear-tooth"
										style={{
											transform: `rotate(${
												i * 45
											}deg) translate(25px)`,
										}}
									/>
								))}
							</div>
						</div>
						<div className="small-gear">
							<div className="gear">
								{[...Array(12)].map((_, i) => (
									<div
										key={i}
										className="gear-tooth"
										style={{
											transform: `rotate(${
												i * 30
											}deg) translate(30px)`,
										}}
									/>
								))}
							</div>
						</div>
						<div className="center-circle"></div>
					</div>
					<div
						className="hand hour"
						style={{ transform: `rotate(${hourDeg + 90}deg)` }}
					/>
					<div
						className="hand minute"
						style={{ transform: `rotate(${minuteDeg + 90}deg)` }}
					/>
					<div
						className="hand second"
						style={{ transform: `rotate(${secondDeg + 90}deg)` }}
					/>
					<div className="gear reverse">
						{[...Array(12)].map((_, i) => (
							<div
								key={i}
								className="gear-tooth"
								style={{
									transform: `rotate(${
										i * 30
									}deg) translate(110px)`,
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Clock;

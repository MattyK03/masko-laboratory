import React, { FC, useEffect, useRef, useState } from "react";
import "./SquareGame.scss";

const squareSize = 30;
const distance = squareSize * 3;
const fieldSize = {
	width: 900,
	height: 450,
};

const GameField: FC = () => {
	const [position, setPosition] = useState<{ x: number; y: number }>({
		x: 30,
		y: fieldSize.height / 2,
	});
	const [linePosition, setLinePosition] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [rounds, setRounds] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [mouseDown, setMouseDown] = useState(false);
	const gameAreaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (gameStarted) {
			const interval = setInterval(() => {
				setLinePosition((prev) => {
					let newPos = prev + speed;
					if (newPos > fieldSize.width - squareSize * 2) {
						setRounds(rounds + 1);
						setSpeed(1 + rounds * 0.1);
						setLinePosition(0);
						setPosition({ x: 30, y: fieldSize.height / 2 });
						setGameOver(false);
						setGameStarted(false);
						return 0;
					}
					return newPos;
				});
			}, 50);
			return () => clearInterval(interval);
		}
	}, [speed, gameStarted]);

	const checkCollision = () => {
		const rightLinePosition = linePosition + distance;

		if (
			position.x + squareSize > rightLinePosition ||
			position.x < linePosition + 5
		) {
			setGameOver(true);
			setGameStarted(false);
			setSpeed(0);
		}
	};

	useEffect(checkCollision, [position, linePosition]);

	const handleMouseMove = (event: React.MouseEvent) => {
		if (mouseDown && gameStarted && gameAreaRef.current) {
			const rect = gameAreaRef.current.getBoundingClientRect();
			const x = event.clientX - rect.left - 15;
			const y = event.clientY - rect.top - 15;
			setPosition({ x, y });
		}
	};

	const handleMouseDown = () => {
		setMouseDown(true);
	};

	const handleMouseUp = () => {
		setMouseDown(false);
	};

	const startGame = () => {
		if (!gameStarted) {
			setGameStarted(true);
			setSpeed(1 + rounds * 0.1);
			setLinePosition(0);
			setPosition({ x: 30, y: fieldSize.height / 2 });
			setGameOver(false);
		}
	};

	const resetGame = () => {
		if (gameOver) {
			setRounds(0);
			setSpeed(1);
			setLinePosition(0);
			setPosition({ x: 30, y: fieldSize.height / 2 });
			setGameOver(false);
			setGameStarted(false);
		}
	};

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<p style={{ color: "#fff", marginBottom: 8 }}>Раунд: {rounds}</p>
			<div
				className="game-area"
				ref={gameAreaRef}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				style={{ width: 900, height: 450 }}
			>
				{!gameOver ? (
					<>
						<div
							className="square"
							style={{
								left: `${position.x}px`,
								top: `${position.y}px`,
							}}
							onMouseDown={handleMouseDown}
							onClick={startGame}
						></div>
						<div
							className="line"
							style={{ left: `${linePosition}px` }}
						></div>
						<div
							className="line"
							style={{ left: `${linePosition + 90}px` }}
						></div>
					</>
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							gap: 12,
							userSelect: "none",
						}}
					>
						<p style={{ fontSize: 20, fontWeight: 500 }}>
							Игра окончена! <br /> Ваш счёт: {rounds}
						</p>
						<button className="restart" onClick={resetGame}>
							Заново
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default GameField;

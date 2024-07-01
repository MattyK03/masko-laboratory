import { FC } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import NavbarTab from "./NavbarTab";

const Navbar: FC<any> = () => {
	const teachersList = [
		{ name: "Муртазина", path: "/murtazina" },
		{ name: "Смирнов", path: "/smirnov" },
		{ name: "Козлов", path: "/kozlov" },
	];

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				marginTop: 200,
				minHeight: 60,
			}}
		>
			<Link style={{ color: "#fff", textDecoration: "none" }} to="/">
				Icon
			</Link>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: 12,
					width: "100%",
				}}
			>
				{teachersList.map((teacher, index: number) => {
					return (
						<NavbarTab
							key={index}
							name={teacher.name}
							path={teacher.path}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Navbar;

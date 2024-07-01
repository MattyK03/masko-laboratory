import { FC } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const NavbarTab: FC<any> = ({ name, path }) => {
	return (
		<Link to={`/laboratory${path}`} className="navbar__tab">
			{name}
		</Link>
	);
};

export default NavbarTab;

import { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import useUser from "../hooks/use-user";
import LoggedInUserContext from "../context/logged-in-user";

export default function Dashboard({ user: loggedInUser }) {
	const { user, setActiveUser } = useUser(loggedInUser.uid);

	console.log(".....", user);
	console.log("----", setActiveUser);
	useEffect(() => {
		document.title = "Instagram";
	}, []);

	return (
		<LoggedInUserContext.Provider value={{ user, setActiveUser }}>
			<div className="bg-gray-background">
				<Header />
				<hr />
				<div style={{ display: "flex" }}>
					<Timeline />
					<Sidebar />
				</div>
			</div>
		</LoggedInUserContext.Provider>
	);
}

Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
};

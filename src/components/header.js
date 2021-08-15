import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { DEFAULT_IMAGE_PATH } from "../constants/paths";
import useUser from "../hooks/use-user";

export default function Header() {
	const { user: loggedInUser } = useContext(UserContext);
	const { user } = useUser(loggedInUser?.uid);
	const { firebase } = useContext(FirebaseContext);
	const history = useHistory();

	return (
		<header style={{ display: "flex", justifyContent: "space-between" }}>
			<Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
				Instagram
			</Link>
			<div style={{ display: "flex", alignItems: "center" }}>
				{loggedInUser ? (
					<>
						{user && (
							<Link to={`/p/${user?.username}`}>
								<img
									style={{ width: "50px" }}
									src={`/images/avatars/${user?.username}.jpg`}
									alt={`${user?.username} profile`}
									onError={(e) => {
										e.target.src = DEFAULT_IMAGE_PATH;
									}}
								/>
							</Link>
						)}
						<span>{user?.username}</span>

						<button
							type="button"
							onClick={() => {
								firebase.auth().signOut();
								history.push(ROUTES.LOGIN);
							}}
						>
							Sign Out
						</button>
					</>
				) : (
					<>
						<Link to={ROUTES.LOGIN}>
							<button type="button">Log In</button>
						</Link>
						<Link to={ROUTES.SIGN_UP}>
							<button type="button">Sign Up</button>
						</Link>
					</>
				)}
			</div>
		</header>
	);
}

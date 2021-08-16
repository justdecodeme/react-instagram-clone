import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);

	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const isInvalid = username === "" || fullName === "" || password === "" || emailAddress === "";

	const handleSignUp = async (e) => {
		e.preventDefault();
		setError("");

		const usernameExists = await doesUsernameExist(username);
		if (!usernameExists) {
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);

				// authentication
				// -> emailAddress & password & username (displayName)
				await createdUserResult.user.updateProfile({
					displayName: username,
				});

				// firebase user collection (create a document)
				await firebase.firestore().collection("users").add({
					userId: createdUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: emailAddress.toLowerCase(),
					following: [],
					followers: [],
					dateCreated: Date.now(),
				});

				history.push(ROUTES.DASHBOARD);
			} catch (error) {
				setError(error.message);
			}
		} else {
			setError("That username is already taken, please try another.");
		}
	};

	useEffect(() => {
		document.title = "Sign Up - Instagram";
	}, []);

	return (
		<div>
			<div>
				<div>
					<h1>
						<img src="/images/logo.png" alt="Instagram" />
					</h1>

					{error && <p style={{ color: "red" }}>{error}</p>}

					<form onSubmit={handleSignUp} method="POST">
						<input
							type="text"
							placeholder="Username"
							onChange={({ target }) => setUsername(target.value)}
							value={username}
						/>
						<br />
						<input
							type="text"
							placeholder="Full name"
							onChange={({ target }) => setFullName(target.value)}
							value={fullName}
						/>
						<br />
						<input
							type="text"
							placeholder="Email address"
							onChange={({ target }) => setEmailAddress(target.value)}
							value={emailAddress}
						/>
						<br />
						<input
							type="password"
							placeholder="Password"
							onChange={({ target }) => setPassword(target.value)}
							value={password}
						/>
						<br />
						<button disabled={isInvalid} type="submit">
							Sign Up
						</button>
					</form>
				</div>
				<div>
					<p>
						Have an account?{` `}
						<Link to={ROUTES.LOGIN}>Login</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

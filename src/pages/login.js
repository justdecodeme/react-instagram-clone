import { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

const Login = () => {
	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const isInvalid = password === "" || emailAddress === "";

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");

		try {
			await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
			console.log("login success...");
			// history.push(ROUTES.DASHBOARD);
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		document.title = "Login - Instagram";
	}, []);

	return (
		<div style={{ maxWidth: "200px", margin: "0 auto", padding: "20px" }}>
			{error && <p style={{ color: "red" }}>{error}</p>}

			<form onSubmit={handleLogin} method="POST">
				<fieldset>
					<legend>Log In</legend>
					<input
						type="text"
						placeholder="Email address"
						onChange={({ target }) => setEmailAddress(target.value)}
					/>
					<br />
					<input
						type="password"
						placeholder="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
					<br />
					<button disabled={isInvalid}>Log In</button>
				</fieldset>
			</form>

			<Link to="/signup">Signup</Link>
		</div>
	);
};

export default Login;

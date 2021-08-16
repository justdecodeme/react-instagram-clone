import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Login() {
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
			history.push(ROUTES.DASHBOARD);
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		document.title = "Login - Instagram";
	}, []);

	return (
		<div>
			<div>
				<div>
					<h1>
						<img src="/images/logo.png" alt="Instagram" />
					</h1>

					{error && <p style={{ color: "red" }}>{error}</p>}

					<form onSubmit={handleLogin} method="POST">
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
							Login
						</button>
					</form>
				</div>
				<div>
					<p>
						Don't have an account?{` `}
						<Link to={ROUTES.SIGN_UP}>Sign up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

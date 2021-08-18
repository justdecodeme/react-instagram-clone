import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ReactLoader from "./components/loader";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/not-found"));

export default function App() {
	const { user } = useAuthListener();

	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<ReactLoader />}>
					<Switch>
						<IsUserLoggedIn user={user} path={ROUTES.LOGIN} loggedInPath={ROUTES.DASHBOARD}>
							<Login />
						</IsUserLoggedIn>
						<IsUserLoggedIn user={user} path={ROUTES.SIGN_UP} loggedInPath={ROUTES.DASHBOARD}>
							<SignUp />
						</IsUserLoggedIn>

						<ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
							<Dashboard />
						</ProtectedRoute>

						<Route path={ROUTES.PROFILE} component={Profile} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
}

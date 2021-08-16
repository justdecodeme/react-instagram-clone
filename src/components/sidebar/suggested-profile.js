import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
	updateLoggedInUserFollowing,
	updateFollowedUserFollowers,
	getUserByUserId,
} from "../../services/firebase";
import LoggedInUserContext from "../../context/logged-in-user";

export default function SuggestedProfile({
	profileDocId,
	username,
	profileId,
	userId,
	loggedInUserDocId,
}) {
	const [followed, setFollowed] = useState(false);
	const { setActiveUser } = useContext(LoggedInUserContext);

	async function handleFollowUser() {
		setFollowed(true);
		await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
		await updateFollowedUserFollowers(profileDocId, userId, false);
		const [user] = await getUserByUserId(userId);
		setActiveUser(user);
	}

	return !followed ? (
		<div>
			<div>
				<img
					src={`/images/avatars/${username}.jpg`}
					alt=""
					onError={(e) => {
						e.target.src = `/images/avatars/default.png`;
					}}
				/>
				<Link to={`/p/${username}`}>
					<p className="font-bold text-sm">{username}</p>
				</Link>
			</div>
			<button type="button" onClick={handleFollowUser}>
				Follow
			</button>
		</div>
	) : null;
}

SuggestedProfile.propTypes = {
	profileDocId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	profileId: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	loggedInUserDocId: PropTypes.string.isRequired,
};

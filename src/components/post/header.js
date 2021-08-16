/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ username }) {
	return (
		<Link to={`/p/${username}`} style={{ display: "flex", alignItems: "center" }}>
			<img
				src={`/images/avatars/${username}.jpg`}
				alt={`${username} profile picture`}
				style={{ width: "30px" }}
			/>
			<p>{username}</p>
		</Link>
	);
}

Header.propTypes = {
	username: PropTypes.string.isRequired,
};

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

export default function User({ username, fullName }) {
	return !username || !fullName ? (
		<Skeleton count={1} height={61} />
	) : (
		<Link to={`/p/${username}`} style={{ display: "flex" }}>
			<img
				src={`/images/avatars/${username}.jpg`}
				style={{ width: "30px", alignSelf: "center" }}
				alt=""
				onError={(e) => {
					e.target.src = DEFAULT_IMAGE_PATH;
				}}
			/>
			<div>
				<span>username: {username}</span> <br />
				<span>fullName: {fullName}</span>
			</div>
		</Link>
	);
}

User.propTypes = {
	username: PropTypes.string,
	fullName: PropTypes.string,
};

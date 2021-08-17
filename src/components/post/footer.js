import PropTypes from "prop-types";

export default function Footer({ caption, username }) {
	return (
		<div>
			username: {username}, caption: {caption}
		</div>
	);
}

Footer.propTypes = {
	caption: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};

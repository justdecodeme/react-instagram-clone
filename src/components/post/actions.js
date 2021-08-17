import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
	const {
		user: { uid: userId },
	} = useContext(UserContext);
	const [toggleLiked, setToggleLiked] = useState(likedPhoto);
	const [likes, setLikes] = useState(totalLikes);
	const { firebase, FieldValue } = useContext(FirebaseContext);

	if (docId === "lty7xMH3HN7MIJHs8VHY") {
		console.log("...docId", docId, likedPhoto);
	}

	const handleToggleLiked = async () => {
		setToggleLiked((toggleLiked) => !toggleLiked);

		await firebase
			.firestore()
			.collection("photos")
			.doc(docId)
			.update({
				likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId),
			});

		console.log("toggleLiked 2", toggleLiked);
		setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
	};

	return (
		<>
			<div>
				{docId === "lty7xMH3HN7MIJHs8VHY" ? ">>" : null}
				<button onClick={handleToggleLiked}>{toggleLiked ? "Unlike" : "Like"}</button>
				<button onClick={handleFocus}>Comment</button>
			</div>
			<div>
				<p>{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
			</div>
		</>
	);
}

Actions.propTypes = {
	docId: PropTypes.string.isRequired,
	totalLikes: PropTypes.number.isRequired,
	likedPhoto: PropTypes.bool.isRequired,
	handleFocus: PropTypes.func.isRequired,
};

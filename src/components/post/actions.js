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

	const handleToggleLiked = async () => {
		setToggleLiked((toggleLiked) => !toggleLiked);

		await firebase
			.firestore()
			.collection("photos")
			.doc(docId)
			.update({
				likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId),
			});

		setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
	};

	return (
		<>
			<div className="flex justify-between p-4">
				<div className="flex">
					<button onClick={handleToggleLiked}>{toggleLiked ? "Like" : "Unlike"}</button>
					<button onClick={handleFocus}>Comment</button>
				</div>
			</div>
			<div className="p-4 py-0">
				<p className="font-bold">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
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

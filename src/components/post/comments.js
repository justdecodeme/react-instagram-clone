import { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";

export default function Comments({ docId, comments: allComments, posted, commentInput }) {
	const [comments, setComments] = useState(allComments);
	const [commentsSlice, setCommentsSlice] = useState(3);

	const showNextComments = () => {
		setCommentsSlice(commentsSlice + 3);
	};

	return (
		<>
			<div>
				{comments.slice(0, commentsSlice).map((item) => (
					<p key={`${item.comment}-${item.displayName}`}>
						<Link to={`/p/${item.displayName}`}>{item.displayName}</Link>
						<span>{item.comment}</span>
					</p>
				))}
				{comments.length >= 3 && commentsSlice < comments.length && (
					<button
						type="button"
						onClick={showNextComments}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								showNextComments();
							}
						}}
					>
						View more comments
					</button>
				)}
				<p>{formatDistance(posted, new Date())} ago</p>
			</div>
			<AddComment
				docId={docId}
				comments={comments}
				setComments={setComments}
				commentInput={commentInput}
			/>
		</>
	);
}

Comments.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired,
};

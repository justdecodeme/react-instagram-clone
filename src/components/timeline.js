/* eslint-disable no-nested-ternary */
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import LoggedInUserContext from "../context/logged-in-user";
import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
	const { user } = useContext(LoggedInUserContext);
	const { photos } = usePhotos(user);

	return (
		<div style={{ width: "calc(100% - 200px)" }}>
			{!photos ? (
				<Skeleton count={4} width={400} height={300} />
			) : (
				photos.map((content) => <Post key={content.docId} content={content} />)
			)}
		</div>
	);
}

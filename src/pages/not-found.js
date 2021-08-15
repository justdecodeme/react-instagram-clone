import { useEffect } from "react";

const NotFound = () => {
	useEffect(() => {
		document.title = "Not Found - Instagram";
	}, []);

	return <div>NotFound</div>;
};

export default NotFound;

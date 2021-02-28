import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../../graphql/queries";

const PracticePage = () => {
	const { data } = useQuery(ME);

	useEffect(() => {
		if (data) {
			console.log(data);
		}
	}, [data]);

	return (
		<div>
			<h2>Practice</h2>
		</div>
	);
};

export default PracticePage;

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_RANDOM_ITEM } from "../graphql/queries";

const useItem = () => {
	const { data, loading, error, refetch } = useQuery(FETCH_RANDOM_ITEM, {
		fetchPolicy: "cache-and-network",
	});
	const [item, setItem] = useState(null);

	useEffect(() => {
		setItem(null);
		if (data) {
			setItem(data.fetchRandomItem);
		}
	}, [data]);

	const refetchItem = () => {
		refetch();
	};

	return { loading, error, item, refetchItem };
};

export default useItem;

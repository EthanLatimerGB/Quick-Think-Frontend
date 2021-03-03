import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ITEM } from "../graphql/queries";

const useCreateItem = () => {
	const [createItem, { data, loading }] = useMutation(CREATE_ITEM, {
		onError: (error) => console.log(error),
	});
	const [response, setResponse] = useState(null);

	useEffect(() => {
		if (!loading) {
			setResponse(null);
			if (data) {
				setResponse(data);
			}
		}
	}, [data]);

	return { createItem, loading, response };
};

export default useCreateItem;

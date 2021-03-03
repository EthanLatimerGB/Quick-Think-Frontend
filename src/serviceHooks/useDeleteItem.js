import { useEffect, useState } from "react";
import { DELETE_ITEM } from "../graphql/queries";
import { useMutation } from "@apollo/client";

const useDeleteItem = () => {
	const [deleteItem, { data, loading }] = useMutation(DELETE_ITEM, {
		onError: (error) => console.log(error)
	});
	const [response, setResponse] = useState(null);

	useEffect(() => {
		if (data && !loading) {
			setResponse(data.deleteItem);
		}
	}, [data]);

	const DeleteItem = async (id, refetchList) => {
		await deleteItem({
			variables: {
				itemID: id,
			},
		});
		await refetchList();
	};

	return { DeleteItem, response };
};

export default useDeleteItem;

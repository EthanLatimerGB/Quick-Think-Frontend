/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_ITEM_BY_ID } from "../../graphql/queries";
import LoadingScreen from "../views/LoadingScreen";
import useDeleteItem from "../../serviceHooks/useDeleteItem";

const DisplaySingleItem = ({ selectedID, refetchList, setSelected }) => {
	const { data, loading, error } = useQuery(FETCH_ITEM_BY_ID, {
		variables: { itemID: selectedID },
	});
	const { DeleteItem } = useDeleteItem();
	const [deleting, setDeleting] = useState(false);

	if (loading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <div>error</div>;
	}

	const item = data.fetchSpecificItem ? data.fetchSpecificItem : null;

	const handleDelete = async () => {
		setDeleting(true);
		await DeleteItem(item.id, refetchList);
		setDeleting(false);
		setSelected(null);
	};

	return (
		<div>
			<p>{item.itemEnglish}</p>
			<p>{item.itemForeign}</p>
			<p>{item.gender}</p>
			<p>{item.completed ? "completed" : "not completed"}</p>
			<button onClick={handleDelete}>{ deleting ? "Deleting" : "Delete"}</button>
		</div>
	);
};

export default DisplaySingleItem;

/* eslint-disable react/prop-types */
import React, { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import DisplaySingleItem from '../reuseables/DisplaySingleItem';
import ReactModal from 'react-modal';
import CreateItemModal from '../views/CreateItemModal';
import useListItems from "../../serviceHooks/useListItems";

const MyListPage = () => {
	const { data, loading, error, refetch} = useListItems();
	const [selectedItem, setSelectedItem] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	ReactModal.setAppElement('#root');

	if (loading) {
		return (
			<div>
				<LoadingScreen />
			</div>
		);
	}

	if (error) {
		return <div>Error has occured</div>;
	}

	const closeModal = () => setModalOpen(false);

	const DisplayCompletedIcon = ({ completed }) => {
		if(completed){
			return(
				<div className="completedIcon green"></div>
			);
		}
		return <div className="completedIcon"></div>;
	};

	const DisplayMoreItemInfo = ({ item }) => {
		if(!item) return null;
		return <DisplaySingleItem selectedID={item.id} refetchList={refetch} setSelected={setSelectedItem}/>;
	};

	return (
		<div className="mainWindow">
			<ReactModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
				<CreateItemModal closeModal={closeModal} refetch={() => refetch()}/>
			</ReactModal>
			<div className="mainWindowContainer">
				<div className="flexboxContainer">
					<div className="flexboxChildren">
						<div className="list">
							{data.map((item) => {
								return(
									<div className="singularItem" key={item.id}>
										<div className="itemText" onClick={() => setSelectedItem(item)}>
											{item.itemEnglish}
											<DisplayCompletedIcon completed={item.completed} />
										</div>
									</div>
								);
							})}
							<button onClick={() => setModalOpen(true)}>Click me</button>
						</div>
					</div>
					<div className="flexboxChildren">
						<DisplayMoreItemInfo item={selectedItem}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyListPage;

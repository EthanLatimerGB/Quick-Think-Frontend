/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import useCreateItem from '../../serviceHooks/useCreateItem';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoadingScreen from "./LoadingScreen";

const CreateItemModal = ({ closeModal, refetch }) => {
	const { createItem, response, loading } = useCreateItem();

	const initialValues = {
		itemEnglish: "",
		itemForeign: "",
		gender: "",
	};

	useEffect(() => {
		if(response){
			refetch();
			closeModal();
		}
	}, [response]);

	const validationSchema = Yup.object().shape({
		itemEnglish: Yup.string()
			.min(4, "Word must be longer than 4 characters")
			.required(),
		itemForeign: Yup.string()
			.min(4, "Word must be longer than 4 characters")
			.required(),
		gender: Yup.string(),
	});

	const handleSubmit = (values) => {
		createItem({
			variables: {
				itemEnglish: values.itemEnglish,
				itemForeign: values.itemForeign,
				gender: values.gender,
			},
		});
	};

	if(loading)return <LoadingScreen />;

	return (
		<div className="modalWindow">
			<div className="modalContainer">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<Field
								placeholder="The word in English"
								type="text"
								name="itemEnglish"
							/>
							<ErrorMessage name="itemEnglish" component="div" />

							<Field
								placeholder="The words translation"
								type="text"
								name="itemForeign"
							/>
							<ErrorMessage name="itemForeign" component="div" />

							<Field
								placeholder="The words gender if applicable"
								type="text"
								name="gender"
							/>
							<ErrorMessage name="gender" component="div" />

							<button type="submit" disabled={isSubmitting}>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};


export default CreateItemModal;
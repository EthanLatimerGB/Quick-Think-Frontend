import React, { useEffect } from "react";
import useItem from "../../serviceHooks/useItem";
import LoadingScreen from "./LoadingScreen";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import useItemResponse from "../../serviceHooks/useItemResponse";

const PracticePage = () => {
	const { loading, error, item, refetchItem } = useItem();
	const { verifyResponse, response } = useItemResponse();

	const handleRefresh = () => {
		refetchItem();
	};

	useEffect(() => {
		if (response) {
			setTimeout(() => {
				handleRefresh();
			}, 1000);
		}
	}, [response]);

	const validationSchema = yup.object().shape({
		itemForeign: yup
			.string()
			.min(4, "Answer must be larger than 4 characters")
			.max(40, "Answer must be shorter than 40 characters")
			.required("Answer is required"),
	});

	const initialValues = {
		itemForeign: "",
	};

	const handleSubmission = (values) => {
		verifyResponse({
			variables: {
				inputWord: values.itemForeign,
				itemID: item.id,
			},
		});
	};

	if (loading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <div>Error</div>;
	}

	if (item === null) {
		return (
			<div>
				<p>
					There are no more words to learn, add more by going to{" "}
					<b>My list</b>
				</p>
			</div>
		);
	}

	const DisplayResponse = () => {
		if (!response) return null;
		if (response.correct) {
			return (
				<div>
					<p>Correct</p>
				</div>
			);
		}
		if (!response.correct) {
			return (
				<div>
					<p>Incorrect</p>
				</div>
			);
		}
	};

	return (
		<div className="mainWindow">
			<div className="mainWindowContainer">
				<div>
					<h2>{item.itemEnglish}</h2>
					<h3>{item.gender}</h3>
					<button onClick={handleRefresh}>skip</button>
					<DisplayResponse />
				</div>
				<div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmission}
					>
						<Form>
							<Field
								placeholder="Enter the translation of this word"
								type="text"
								name="itemForeign"
							/>
							<ErrorMessage name="itemForeign" component="div" />
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default PracticePage;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useAuthContext } from "../../utils/AuthContext";
import { REGISTER } from "../../graphql/queries";
import { useHistory } from "react-router-dom";

const SignUpPage = () => {
	const { setToken } = useAuthContext();
	const [error, setError] = useState(null);

	const [createAccount, result] = useMutation(REGISTER, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message);
		},
	});

	const history = useHistory();

	useEffect(() => {
		if (result.data) {
			const token = result.data.createAccount.token;
			setToken(token);
			localStorage.setItem("quick-think-user-token", token);

			history.push("/");
		}
	}, [result.data]);

	const initialValues = {
		name: "",
		username: "",
		password: "",
	};

	const validationSchema = yup.object().shape({
		name: yup
			.string()
			.min(3, "Name must be longer than 3 characters")
			.max(15, "Name must be shorter than 15 characters")
			.required("Name is required"),
		username: yup
			.string()
			.min(5, "Username must be longer than 5 characters")
			.max(40, "Username cannot be longer than 40 characters")
			.required("Username is required"),
		password: yup
			.string()
			.min(7, "Password must be longer than 7 characters")
			.max(80, "Password cannot be longer than 80 characters")
			.required("Password is required"),
	});

	const handleSubmit = (values, { setSubmitting }) => {
		setSubmitting(false);
		createAccount({
			variables: {
				name: values.name,
				username: values.username,
				password: values.password,
			},
		});
	};

	const DisplayError = () => {
		if (error) {
			return <div>{error}</div>;
		} else return null;
	};

	return (
		<div className="registrationPage">
			<h2>Register</h2>
			<DisplayError />

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field placeholder="Name" type="name" name="name" />
						<ErrorMessage name="name" component="div" />
						<Field
							placeholder="Username"
							type="username"
							name="username"
						/>
						<ErrorMessage name="username" component="div" />
						<Field
							placeholder="Password"
							type="password"
							name="password"
						/>
						<ErrorMessage name="password" component="div" />
						<button type="submit" disabled={isSubmitting}>
							Register
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SignUpPage;

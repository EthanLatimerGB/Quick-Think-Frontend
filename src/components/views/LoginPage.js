import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useAuthContext } from "../../utils/AuthContext";
import { LOGIN } from "../../graphql/queries";
import { useHistory } from "react-router-dom";

const Login = () => {
	const { setToken } = useAuthContext();
	const history = useHistory();
	const [error, setError] = useState(null);

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message);
		},
	});

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.token;
			setToken(token);
			localStorage.setItem("quick-think-user-token", token);

			history.push("/");
		}
	}, [result.data]);

	const initialValues = {
		username: "",
		password: "",
	};

	const validationSchema = yup.object().shape({
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
		login({
			variables: {
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
		<div>
			<h2>Log in</h2>
			<DisplayError />

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
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
							Log in
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Login;

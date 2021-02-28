import { gql } from "@apollo/client";

export const REGISTER = gql`
	mutation createAccount(
		$name: String!
		$username: String!
		$password: String!
	) {
		createAccount(name: $name, username: $username, password: $password) {
			token
			user {
				id
				name
				listID
			}
		}
	}
`;

export const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
		}
	}
`;

export const ME = gql`
	query me {
		me {
			id
			name
		}
	}
`;

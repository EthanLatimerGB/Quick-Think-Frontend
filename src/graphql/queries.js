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

export const FETCH_RANDOM_ITEM = gql`
	query fetchRandomItem {
		fetchRandomItem {
			id
			itemEnglish
			itemForeign
			gender
			consistantCounter
			completed
		}
	}
`;

export const VERIFY_RESPONSE = gql`
	mutation verifyResponse($inputWord: String!, $itemID: String!) {
		verifyResponse(inputWord: $inputWord, itemID: $itemID) {
			correct
			item {
				completed
			}
		}
	}
`;

export const FETCH_ALL_ITEMS = gql`
	query ListItems {
		listItems {
			id
			itemEnglish
			completed
		}
	}
`;

export const FETCH_ITEM_BY_ID = gql`
	query fetchItem($itemID: String!) {
		fetchSpecificItem(itemID: $itemID) {
			id
			itemEnglish
			itemForeign
			gender
			consistantCounter
			completed
		}
	}
`;

export const CREATE_ITEM = gql`
	mutation createItem(
		$itemEnglish: String!
		$itemForeign: String!
		$gender: String
	) {
		createItem(
			itemEnglish: $itemEnglish
			itemForeign: $itemForeign
			gender: $gender
		)
	}
`;

export const DELETE_ITEM = gql`
	mutation deleteItem($itemID: String!) {
		deleteItem(itemID: $itemID)
	}
`;

import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../utils/AuthContext";
import { useApolloClient } from "@apollo/client";

const Appbar = () => {
	const { token, setToken } = useAuthContext();
	const client = useApolloClient();

	useEffect(() => {
		const token = localStorage.getItem("quick-think-user-token");
		if(token){
			setToken(token);
		}
	}, []);

	const handleLogout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	const LoggedInLinks = () => {
		console.log(token, " is token");

		if (token) {
			return (
				<div className="appBarLinks">
					<Link to="/practice/">Practice</Link>
					<Link to="/mylist/">My List</Link>
					<Link to="/settings/">Settings</Link>
					<button onClick={handleLogout}>Log out</button>
				</div>
			);
		}
		return (
			<div className="appBarLinks">
				<Link to="/login/">Login</Link>
				<Link to="/signup/">Sign Up</Link>
			</div>
		);
	};

	return (
		<div className="appBar">
			<div className="appBarContainer">
				<div className="appBarTitle">
					<Link to="/" className="title">
						Quick Think
					</Link>
				</div>
				<LoggedInLinks />
			</div>
		</div>
	);
};

export default Appbar;

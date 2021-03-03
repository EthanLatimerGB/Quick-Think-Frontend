//Dependencies
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Different view imports
import WelcomePage from "./components/views/WelcomePage";
import Appbar from "./components/appBar";
import Login from "./components/views/LoginPage";
import SignUpPage from "./components/views/SignUpPage";
import PracticePage from './components/views/PracticePage';
import MyListPage from './components/views/MyListPage';
import SettingsPage from './components/views/SettingsPage';

//Authentication Context
import { AuthContext } from "./utils/AuthContext";

const App = () => {
	const [token, setToken] = useState(null);

	return (
		<AuthContext.Provider
			value={{
				token: token,
				setToken: setToken,
			}}
		>
			<BrowserRouter>
				<Appbar />
				<Switch>
					<Route path="/settings/">
						<SettingsPage />
					</Route>
					<Route path="/mylist/">
						<MyListPage />
					</Route>
					<Route path="/practice/">
						<PracticePage />
					</Route>
					<Route path="/signup/">
						<SignUpPage />
					</Route>
					<Route path="/login/">
						<Login />
					</Route>
					<Route path="/">
						<WelcomePage />
					</Route>
				</Switch>
			</BrowserRouter>
		</AuthContext.Provider>
	);
};

export default App;

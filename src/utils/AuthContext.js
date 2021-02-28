import React, { useContext } from "react";


export const AuthContext = React.createContext({
	token: null,
	// eslint-disable-next-line no-unused-vars
	setToken: (data) => {},
});

export const useAuthContext = () => useContext(AuthContext);

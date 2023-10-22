import React from "react";

const Context = React.createContext({
	language: "en",
	user: "",
	email: "",
	currency: "usd",
	setCurrency: () => {},
	setLanguage: () => {},
	setUser: (param) => {},
	setEmail: (param) => {},
});

export default Context;

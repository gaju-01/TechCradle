import React from "react";

const Context = React.createContext({
	language: "en",
	user: "",
	setLanguage: () => {},
	setUser: (param) => {},
});

export default Context;

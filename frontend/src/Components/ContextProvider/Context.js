import React from "react";

const Context = React.createContext({
	language: "en",
	setLanguage: () => {},
});

export default Context;

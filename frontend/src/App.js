import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/WelcomePage/Welcome";
import Context from "./Components/ContextProvider/Context";
import HomePage from "./Components/HomePage/HomePage";
import NotFound from "./Components/Utilities/NotFound";

function App() {
	const [currency, setCurrency] = useState(
		sessionStorage.getItem("currency")
			? sessionStorage.getItem("currency")
			: "usd"
	);
	const [language, setLang] = useState(
		sessionStorage.getItem("language")
			? sessionStorage.getItem("language")
			: "en"
	);
	return (
		<Context.Provider value={{ serverURL: "http://localhost:8080", }} >
			<Routes>
				<Route path="/home/:id" element={ <HomePage currency={currency} language={language} setCurrency={setCurrency} setLang={setLang} /> }/>
				<Route path="/" element={<Welcome />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Context.Provider>
	);
}

export default App;

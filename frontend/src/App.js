import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/WelcomePage/Welcome";
import Context from "./Components/ContextProvider/Context";
import HomePage from "./Components/HomePage/HomePage";

function App() {
	const [language, setLanguage] = useState("en");

	return (
		<Context.Provider value={{ language: language, setLanguage: setLanguage }}>
			<Routes>
				<Route path="home" element={<HomePage />} />
				<Route
					path="/"
					element={<Welcome language={language} setLanguage={setLanguage} />}
				/>
			</Routes>
		</Context.Provider>
	);
}

export default App;

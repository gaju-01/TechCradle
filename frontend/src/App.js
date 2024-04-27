import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Components/WelcomePage/Welcome";
import Context from "./Components/ContextProvider/Context";
import HomePage from "./Components/HomePage/HomePage";

function App() {
	return (
		<Context.Provider
			value={{
				serverURL: "http://localhost:8080",
			}}
		>
			<Routes>
				<Route path="/home/:id" element={<HomePage />} />
				<Route path="/" element={<Welcome />} />
			</Routes>
		</Context.Provider>
	);
}

export default App;

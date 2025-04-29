import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import WelcomeStyle from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";
import Context from "../ContextProvider/Context";

const Welcome = () => {
	const navigate = useNavigate();
	const context = useContext(Context);
	const [otp, setOTP] = useState("");
	const [message, setMessage] = useState("");
	const [welcome, setWelcome] = useState("Welcome");
	const [user, setUser] = useState(sessionStorage.getItem("user"));
	const [email, setEmail] = useState(sessionStorage.getItem("email"));
	const [language, setLang] = useState(sessionStorage.getItem("language") ? sessionStorage.getItem("language") : "en");

	const inputChangeHandler = (event) => {
		sessionStorage.setItem("user", event.target.value);
		setUser(event.target.value);
	};

	const emailChangeHandler = (event) => {
		sessionStorage.setItem("email", event.target.value);
		setEmail(event.target.value);
	};

	const languageHandler = (event) => {
		sessionStorage.setItem("language", event.target.value);
		setLang(event.target.value);
	};

	const clickHandler = async () => {
			var userVerified = false
			await axios.post(`${context.serverURL}/cprestapi/users/createUser`, 
				{ userName: user, email: email },
				{ headers : {Authorization: "Basic "  + window.btoa("user:pass") }})
				.then((response) => { userVerified = true; 
														setMessage(response.data); })
				.catch((exception) => setMessage(exception.response.data));
			
			if(userVerified) {
				await axios.get(`${context.serverURL}/cprestapi/generateOTP`, 
					{ params: { userName: user, email: email }, headers: {Authorization: "Basic " + window.btoa("user:pass") }})
					.then((response) => setMessage(response.data));
			}
	};

	const verifyOTP = async () => {
		await axios.get(`${context.serverURL}/cprestapi/verifyOTP`, 
					{ params: { otp: otp, userName: user }, headers: { Authorization: "Basic " + window.btoa("user:pass") }})
					.then((response) => {  sessionStorage.setItem("jwt", response.data);
															navigate("/home/blog"); })
					.catch((exception) => { setMessage(exception.response.data) });
	};

	useEffect(() => {
		const getWelcomeTitle = async () => {
			await axios.get(`${context.serverURL}/cprestapi/intl/title/title.welcome`,  
				{ headers: { Authorization: "Basic " + window.btoa("user:pass"), "Accept-Language" : language}})
				.then((response) => { setMessage("");
														setWelcome(response.data); })
				.catch((_) => { setMessage("Error Fetching Data!")});
		}

		getWelcomeTitle();
	}, [language, context.serverURL]);

	return (
			<div className={`${WelcomeStyle["align-welcome-page"]} card`} style={{border:"none"}}>
				<div className={`${WelcomeStyle["decorate-welcome-div"]}`}>{welcome}</div>
				<div>
					<select className={`${WelcomeStyle["decorate-welcome-dropdown"]}`} value={language} onChange={languageHandler}>
						<option defaultValue value="en">English</option>
						<option value="fr">French</option>
						<option value="de">Dutch</option>	
					</select>
				</div>
				{message && <p className={`${WelcomeStyle["decorate-welcome-err-message"]}`}>{message}!</p>}
				<input placeholder="Enter your username" className={`${WelcomeStyle["decorate-welcome-input"]}`} type="text" name="user" id="user" value={user} onChange={inputChangeHandler}/>
				<input placeholder="Enter your Email" className={`${WelcomeStyle["decorate-welcome-input"]}`} type="email" name="email" id="email" value={email} onChange={emailChangeHandler}/>
				<input placeholder="Enter your OTP" className={`${WelcomeStyle["decorate-welcome-input"]}`} type="text" name="OTP" id="OTP" value={otp} onChange={(event) => setOTP(event.target.value)}/>
				<div style={{ marginTop: "1rem" }}>
					<button type="button" className={`${WelcomeStyle["decorate-welcome-button"]}`} onClick={clickHandler} >Generate OTP</button>
					<button type="button" className={`${WelcomeStyle["decorate-welcome-button"]}`} onClick={verifyOTP}> Verify OTP</button>
				</div>
			</div>
	);
};
export default Welcome;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import WelcomeStyle from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";
import Context from "../ContextProvider/Context";
const Welcome = () => {
	const navigate = useNavigate();
	const context = useContext(Context);
	const [message, setMessage] = useState("");
	const [welcome, setWelcome] = useState("Welcome");
	const [otp, setOTP] = useState("");
	const [currency, setCurrency] = useState(sessionStorage.getItem("currency") ? sessionStorage.getItem("currency"): "usd");
	const [language, setLang] = useState(sessionStorage.getItem("language") ? sessionStorage.getItem("language") : "en");
	const [email, setEmail] = useState(sessionStorage.getItem("email"));
	const [user, setUser] = useState(sessionStorage.getItem("user"));

	const languageHandler = (event) => {
		setLang(event.target.value);
		sessionStorage.setItem("language", event.target.value);
	};

	const currencyHandler = (event) => {
		setCurrency(event.target.value);
		sessionStorage.setItem("currency", event.target.value);
	};

	const clickHandler = () => {
		if (user !== "" && user !== null && email !== "" && email !== null) {
			let isPresent = "YES";
			let myMessage = "";
			axios({ method: "get", url: `${context.serverURL}/cprestapi/users/checkuser`,
				params: {
					user: user,
					email: email,
				},
				headers: {
					Authorization: "Basic " + window.btoa("user:pass"),
				},
			})
				.then((resp) => {
					isPresent = resp.data;
					if (isPresent === "NO") {
						setMessage("");
						axios({
							method: "post",
							url: `${context.serverURL}/cprestapi/users`,
							data: {
								userName: user,
								email: email,
							},
							headers: {
								Authorization: "Basic " + window.btoa("user:pass"),
							},
						})
							.then((resp) => {
								setMessage("");
								axios({
									method: "get",
									url: `${context.serverURL}/cprestapi/validate/gt`,
									params: {
										email: email,
										userName: user,
									},
									headers: {
										Authorization: "Basic " + window.btoa("user:pass"),
									},
								})
									.then((resp) => {
										setMessage("OTP sent your mail");
									})
									.catch((resp) => {
										setMessage("Error fetching data, try again");
									});
							})
							.catch((e) => {
								myMessage = e.response.data.errors[0].defaultMessage;
								setMessage(myMessage);
							});
						sessionStorage.setItem("user", user);
						sessionStorage.setItem("email", email);
						setEmail(email);
						setUser(user);
					} else if (isPresent === "OK") {
						setMessage("");
						axios({
							method: "get",
							url: `${context.serverURL}/cprestapi/validate/gt`,
							params: {
								email: email,
								userName: user,
							},
							headers: {
								Authorization: "Basic " + window.btoa("user:pass"),
							},
						})
							.then((resp) => {
								setMessage("OTP sent your mail");
							})
							.catch((resp) => {
								setMessage("Error fetching data, try again");
							});
						sessionStorage.setItem("user", user);
						sessionStorage.setItem("email", email);
						setUser(user);
						setEmail(email);
					} else {
						setMessage("Enter the valid user name and email");
					}
				})
				.catch((resp) => {
					setMessage("Error fetching data, try again");
				});
		}
	};

	const verifyOTP = () => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/verify/gt`,
			params: {
				otp: otp,
				userName: user,
			},
			headers: {
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		})
			.then((resp) => {
				sessionStorage.setItem("jwt", resp.data);
				navigate("/home/blog");
			})
			.catch((resp) => {
				setMessage(resp.response.data.message);
			});
	};

	const inputChangeHandler = (event) => {
		sessionStorage.setItem("user", event.target.value);
		setUser(event.target.value);
	};

	const emailChangeHandler = (event) => {
		sessionStorage.setItem("email", event.target.value);
		setEmail(event.target.value);
	};

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/intl/title/title.welcome`,
			headers: {
				"Accept-Language": language,
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		})
			.then((resp) => {
				setWelcome(resp.data);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
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
				<div>
					<select className={`${WelcomeStyle["decorate-welcome-dropdown"]}`} value={currency} onChange={currencyHandler}>
						<option defaultValue value="usd">USD</option>
						<option value="inr">INR</option>
					</select>
				</div>
				<input placeholder="Enter your username" className={`${WelcomeStyle["decorate-welcome-input"]}`} type="text" name="user" id="user" value={user} onChange={inputChangeHandler}/>
				<input placeholder="Enter your Email" className={`${WelcomeStyle["decorate-welcome-input"]}`} type="email" name="email" id="email" value={email} onChange={emailChangeHandler}/>
				<input placeholder="Enter your OTP" className={`${WelcomeStyle["decorate-welcome-input"]}`} type="text" name="OTP" id="OTP" value={otp} onChange={(event) => setOTP(event.target.value)}/>
				<div style={{ marginTop: "1rem" }}>
					<button type="button" className={`${WelcomeStyle["decorate-welcome-button"]}`} onClick={clickHandler} >Generate OTP</button>
					<button type="button" className={`${WelcomeStyle["decorate-welcome-button"]}`} onClick={verifyOTP}> Verify OTP</button>
				</div>
				{message && <p className={`${WelcomeStyle["decorate-welcome-err-message"]}`}>{message}!</p>}
			</div>
	);
};
export default Welcome;

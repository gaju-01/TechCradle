import axios from "axios";
import { useContext, useEffect, useState } from "react";
import WelcomeStyle from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";
import Context from "../ContextProvider/Context";
const Welcome = (props) => {
	const navigate = useNavigate();
	const context = useContext(Context);
	const [message, setMessage] = useState("");
	const [welcome, setWelcome] = useState("Message Cannot be Dispalyed");
	const [otp, setOTP] = useState("");

	const languageHandler = (event) => {
		sessionStorage.setItem("language", event.target.value);
		context.setLanguage(event.target.value);
	};

	const currencyHandler = (event) => {
		sessionStorage.setItem("currency", event.target.value);
		context.setCurrency(event.target.value);
	};

	const clickHandler = () => {
		if (
			context.user !== "" &&
			context.user !== null &&
			context.email !== "" &&
			context.email !== null
		) {
			let isPresent = "YES";
			let myMessage = "";
			axios({
				method: "get",
				url: `${context.serverURL}/cprestapi/users/checkuser`,
				params: {
					user: context.user,
					email: context.email,
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
								userName: context.user,
								email: context.email,
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
										email: context.email,
										userName: context.user,
									},
									headers: {
										Authorization: "Basic " + window.btoa("user:pass"),
									},
								})
									.then((resp) => {
										setMessage("OTP sent your mail!!");
									})
									.catch((resp) => {
										setMessage("Error fetching data, try again");
									});
							})
							.catch((e) => {
								myMessage = e.response.data.errors[0].defaultMessage;
								setMessage(myMessage);
							});
						sessionStorage.setItem("userName", context.user);
						sessionStorage.setItem("email", context.email);
					} else if (isPresent === "OK") {
						setMessage("");
						axios({
							method: "get",
							url: `${context.serverURL}/cprestapi/validate/gt`,
							params: {
								email: context.email,
								userName: context.user,
							},
							headers: {
								Authorization: "Basic " + window.btoa("user:pass"),
							},
						})
							.then((resp) => {
								setMessage("OTP sent your mail!!");
							})
							.catch((resp) => {
								setMessage("Error fetching data, try again");
							});
						sessionStorage.setItem("userName", context.user);
						sessionStorage.setItem("email", context.email);
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
				userName: context.user,
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
		context.setUser(event.target.value);
	};

	const emailChangeHandler = (event) => {
		context.setEmail(event.target.value);
	};

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/intl/title/title.welcome`,
			headers: {
				"Accept-Language": props.language,
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		})
			.then((resp) => {
				setWelcome(resp.data);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	}, [props.language, context.serverURL]);

	useEffect(() => {
		sessionStorage.removeItem("userName");
		sessionStorage.removeItem("email");
		sessionStorage.setItem("currency", "usd");
		sessionStorage.setItem("language", "en");
	}, []);

	return (
		<>
			<div
				className={`${WelcomeStyle["align-welcome-page"]} card text-bg-primary mb-3 align-welcome-page`}
				style={{ maxWidth: "40rem" }}
			>
				<div
					style={{ backgroundColor: "white", color: "black" }}
					className="card-header"
				>
					{welcome}
				</div>
				<div className="card-body">
					<p className="card-text">
						Every computer device you have ever used, from your school computers
						to your calculator, has been using algorithms to tell it how to do
						whatever it was doing. Algorithms are a very important topic in
						Computer Science because they help software developers create
						efficient and error free programs. The most important thing to
						remember about algorithms is that there can be many different
						algorithms for the same problem, but some are much better than
						others!
					</p>
				</div>
				<div>
					<select
						className="form-select"
						aria-label="Default select example"
						value={props.language}
						onChange={languageHandler}
					>
						<option defaultValue value="en">
							English
						</option>
						<option value="fr">French</option>
						<option value="de">Dutch</option>
					</select>
				</div>
				<div>
					<select
						className="form-select"
						value={props.currency}
						onChange={currencyHandler}
					>
						<option defaultValue value="usd">
							USD
						</option>
						<option value="inr">INR</option>
					</select>
				</div>
				<label htmlFor="user">User name</label>
				<input
					type="text"
					name="user"
					id="user"
					value={context.user}
					onChange={inputChangeHandler}
				/>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					value={context.email}
					onChange={emailChangeHandler}
				/>
				<label htmlFor="otp">Enter your OTP</label>
				<input
					name="OTP"
					id="OTP"
					value={otp}
					onChange={(event) => setOTP(event.target.value)}
				/>
				<div style={{ marginTop: "1rem" }}>
					<button
						type="button"
						className="btn btn-light"
						onClick={clickHandler}
					>
						Generate OTP
					</button>
					<button
						style={{ marginLeft: "10px" }}
						type="button"
						className="btn btn-light"
						onClick={verifyOTP}
					>
						Verify OTP
					</button>
				</div>
			</div>
			{message && <p style={{ marginLeft: "38%", color: "red" }}>{message}</p>}
		</>
	);
};
export default Welcome;

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import WelcomeStyle from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";
import Context from "../ContextProvider/Context";
const Welcome = (props) => {
	const navigate = useNavigate();
	const context = useContext(Context);
	const [welcome, setWelcome] = useState("Message Cannot be Dispalyed");

	const languageHandler = (event) => {
		context.setLanguage(event.target.value);
	};

	const currencyHandler = (event) => {
		context.setCurrency(event.target.value);
	};

	const clickHandler = () => {
		if (context.user !== "" && context.user !== null) {
			let isPresent = "YES";
			axios({
				method: "get",
				url: "http://localhost:8080/cprestapi/users/checkuser",
				params: {
					user: context.user,
				},
				headers: {
					Authorization: "Basic " + window.btoa("user:pass"),
				},
			}).then((resp) => {
				isPresent = resp.data;
				if (isPresent === "NO") {
					axios({
						method: "post",
						url: "http://localhost:8080/cprestapi/users",
						data: {
							userName: context.user,
							email: context.email,
						},
						headers: {
							Authorization: "Basic " + window.btoa("user:pass"),
						},
					});
				}
			});
			navigate("/home/blog");
		}
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
			url: "http://localhost:8080/cprestapi/intl/title/title.welcome",
			headers: {
				"Accept-Language": props.language,
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		}).then((resp) => {
			setWelcome(resp.data);
		});
	}, [props.language]);

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
				<div style={{ marginTop: "1rem" }}>
					<button
						type="button"
						className="btn btn-light"
						onClick={clickHandler}
					>
						Get Started
					</button>
				</div>
			</div>
		</>
	);
};
export default Welcome;

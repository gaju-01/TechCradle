import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../ContextProvider/Context";
const NavBar = () => {
	const context = useContext(Context);
	const nav = useNavigate();
	const [navTitles, setNavTitles] = useState([
		"Select Here",
		"Welcome",
		"Blogs",
		"Create Blogs",
		"Modify Blog",
		"Compiler",
		"Followers",
		"Following",
	]);
	const [message, setMessage] = useState("");
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
	const user = sessionStorage.getItem("user")
		? sessionStorage.getItem("user")
		: "";

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/intl/navbar`,
			headers: {
				"Accept-Language": language,
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		})
			.then((resp) => {
				setNavTitles(resp.data);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	}, [language, context.serverURL]);

	const languageHandler = (event) => {
		sessionStorage.setItem("language", event.target.value);
		setLang(event.target.value);
	};

	const currencyHandler = (event) => {
		sessionStorage.setItem("currency", event.target.value);
		setCurrency(event.target.value);
	};

	const profileHandler = () => {
		nav("/home/profile");
	};

	return (
		<>
			<nav className="navbar bg-body-tertiary">
				<div className="dropdown">
					<button
						className="btn btn-secondary dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						{navTitles[0]}
					</button>
					<ul className="dropdown-menu">
						<li>
							<Link className="dropdown-item" to="/">
								{navTitles[1]}
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/home/blog">
								{navTitles[2]}
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/home/createblog">
								{navTitles[3]}
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/home/modifyblog">
								{navTitles[4]}
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/home/followers">
								{navTitles[6]}
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/home/following">
								{navTitles[7]}
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<select
						aria-label="Default select example"
						value={language}
						onChange={languageHandler}
					>
						<option defaultValue value="en">
							English
						</option>
						<option value="fr">French</option>
						<option value="de">Dutch</option>
					</select>
					<select value={currency} onChange={currencyHandler}>
						<option defaultValue value="usd">
							USD
						</option>
						<option value="inr">INR</option>
					</select>
					<button
						style={{ marginLeft: "10px", borderRadius: "50%" }}
						type="button"
						className="btn btn-primary"
						onClick={profileHandler}
					>
						{user.slice(0, 1).toUpperCase()}
					</button>
				</div>
			</nav>
			<p style={{ color: "red" }}>{message}</p>
		</>
	);
};

export default NavBar;

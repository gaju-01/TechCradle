import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../ContextProvider/Context";
const NavBar = () => {
	const context = useContext(Context);
	const [navTitles, setNavTitles] = useState([
		"Select Here",
		"Blogs",
		"Create Blogs",
		"Modify Blog",
		"Compiler",
		"Followers",
		"Following",
	]);

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/intl/navbar`,
			headers: {
				"Accept-Language": context.language,
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		}).then((resp) => {
			setNavTitles(resp.data);
		});
	}, [context.language]);

	const languageHandler = (event) => {
		context.setLanguage(event.target.value);
	};

	const currencyHandler = (event) => {
		context.setCurrency(event.target.value);
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
							<Link className="dropdown-item" to="/home/compiler">
								{navTitles[5]}
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
						value={context.language}
						onChange={languageHandler}
					>
						<option defaultValue value="en">
							English
						</option>
						<option value="fr">French</option>
						<option value="de">Dutch</option>
					</select>
					<select value={context.currency} onChange={currencyHandler}>
						<option defaultValue value="usd">
							USD
						</option>
						<option value="inr">INR</option>
					</select>
				</div>
			</nav>
		</>
	);
};

export default NavBar;

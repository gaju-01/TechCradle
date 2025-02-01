import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../ContextProvider/Context";
import NavBarStyle from "./NavBar.module.css";
import WelcomeStyle from "../WelcomePage/Welcome.module.css";

const NavBar = (props) => {
	const context = useContext(Context);
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

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/intl/navbar`,
			headers: {
				"Accept-Language": props.language,
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		})
			.then((resp) => {
				setNavTitles(resp.data);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	}, [props.language, context.serverURL]);

	const languageHandler = (event) => {
		sessionStorage.setItem("language", event.target.value);
		props.setLang(event.target.value);
	};

	const currencyHandler = (event) => {
		sessionStorage.setItem("currency", event.target.value);
		props.setCurrency(event.target.value);
	};


	return (
		<>
			<ul className={`${NavBarStyle["decorate-navbar"]}`}>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/">{navTitles[1]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/blog">{navTitles[2]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/createblog">{navTitles[3]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/modifyblog">{navTitles[4]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/followers">{navTitles[6]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/following">{navTitles[7]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/profile">{navTitles[8]}</Link></li>
				<li style={{float:"right", marginTop: "1rem"}}>
					<select className={`${WelcomeStyle["decorate-welcome-dropdown"]}`} value={props.language} onChange={languageHandler}>
						<option defaultValue value="en"> English</option>
						<option value="fr">French</option>
						<option value="de">Dutch</option>
					</select>
				</li>
				<li style={{float:"right", marginTop: "1rem", marginRight:"10px"}}>
					<select className={`${WelcomeStyle["decorate-welcome-dropdown"]}`} value={props.currency} onChange={currencyHandler}>
						<option defaultValue value="usd">USD</option>
						<option value="inr">INR</option>
					</select>	
				</li>
			</ul>
			<p style={{ color: "red" }}>{message}</p>
		</>
	);
};

export default NavBar;

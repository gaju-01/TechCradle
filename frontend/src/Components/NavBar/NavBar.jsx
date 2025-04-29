import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../ContextProvider/Context";
import NavBarStyle from "./NavBar.module.css";
import WelcomeStyle from "../WelcomePage/Welcome.module.css";

const NavBar = (props) => {
	const context = useContext(Context);
	const [message, setMessage] = useState("");
	const [navTitles, setNavTitles] = useState(["Select Here", "Welcome", "Blogs", "Create Blogs", "Modify Blog", "Followers", "Following", "Profile"]);

	const languageHandler = (event) => {
		sessionStorage.setItem("language", event.target.value);
		props.setLang(event.target.value);
	};

	useEffect(() => {
		const fetchNavBarTitles = async () => {
			await axios.get(`${context.serverURL}/cprestapi/intl/navbar`,
				{ headers: { "Accept-Language": props.language, Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
				.then((response) => setNavTitles(response.data))
				.catch((_) => setMessage("Error fetching data"));
		}

		fetchNavBarTitles()
	}, [props.language, context.serverURL]);

	return (
		<>
			<ul className={`${NavBarStyle["decorate-navbar"]}`}>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/">{navTitles[1]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/blog">{navTitles[2]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/createblog">{navTitles[3]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/modifyblog">{navTitles[4]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/followers">{navTitles[5]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/following">{navTitles[6]}</Link></li>
				<li><Link className={`${NavBarStyle["decorate-navbar-items"]}`} to="/home/profile">{navTitles[7]}</Link></li>
				<li style={{float:"right", marginTop: "1rem"}}>
					<select className={`${WelcomeStyle["decorate-welcome-dropdown"]}`} value={props.language} onChange={languageHandler}>
						<option defaultValue value="en"> English</option>
						<option value="fr">French</option>
						<option value="de">Dutch</option>
					</select>
				</li>
			</ul>
			<p style={{ color: "red" }}>{message}</p>
		</>
	);
};

export default NavBar;

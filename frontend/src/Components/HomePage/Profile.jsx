import React, { useContext, useEffect, useState } from "react";
import Context from "../ContextProvider/Context";
import axios from "axios";
import ProfileStyle from "./Profile.module.css";

const Profile = () => {
	const context = useContext(Context);
	const [message, setMessage] = useState("");
	const [blogTitles, setBlogTitles] = useState([]);
	const user = sessionStorage.getItem("user") ? sessionStorage.getItem("user") : "";

	useEffect(() => {
		const fetchBlogsOfUser = async () => {
			if(user) {
				await axios.get(`${context.serverURL}/cprestapi/${user}/blogs/getblogtitles`, 
				{ headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
				.then((response) => setBlogTitles(response.data))
				.catch((_) => setMessage("Error fetching data"));
			} 
		}

		fetchBlogsOfUser();
	}, [user, context.serverURL]);

	return (
		<div className={`${ProfileStyle["decorate-profile-main-container"]}`}>
			<div className = {`${ProfileStyle["decorate-profile-personal"]}`}>
				<div>
					<button className={`${ProfileStyle["decorate-profile-container"]}`}>{user.slice(0, 1).toUpperCase()}</button>
					<p>{user}</p>
				</div>
				<p className={`${ProfileStyle["decorate-profile-message"]}`}>{message}</p>
			</div>
			<div>
					{blogTitles.length > 0 &&  
						<div className={`${ProfileStyle["decorate-profile-yc"]}`}>
							<h2>Your Contributions</h2>
							<ul> {blogTitles.map((data) => {return <li>{data}</li>})}</ul>
						</div>
					}
			</div>
		</div>
	);
};

export default Profile;

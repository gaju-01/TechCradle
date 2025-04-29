import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";
import ProfileStyle from "./Profile.module.css";

const Followers = () => {
	const context = useContext(Context);
	const [message, setMessage] = useState("");
	const [followers, setFollowers] = useState([]);
	const user = sessionStorage.getItem("user") ? sessionStorage.getItem("user") : "";

	useEffect(() => {
		const fetchFollowers = async () => {
			if(user) {
				await axios.get(`${context.serverURL}/cprestapi/followers/${user}`,
					{ headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
					.then((response) => setFollowers(response.data))
					.catch((_) => setMessage("Error fetching data"));
			}
		}

		fetchFollowers();
	}, [context.serverURL, user]);

	return (
		<>
			<p className={`${ProfileStyle["decorate-profile-message"]}`}>{message}</p>
			{ followers?.map(function (follower) { return <p key={follower}>{follower}</p> })}
		</>
	);
};

export default Followers;

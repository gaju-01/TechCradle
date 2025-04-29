import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";
import ProfileStyle from "./Profile.module.css";

const Following = () => {
	const [following, setFollowing] = useState([]);
	const context = useContext(Context);
	const [message, setMessage] = useState("");
	const user = sessionStorage.getItem("user") ? sessionStorage.getItem("user") : "";

	const fetchFollowing = async () => {
		await axios.get(`${context.serverURL}/cprestapi/following/${user}`,
			{ headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
			.then((response) => setFollowing(response.data))
			.catch((_) => setMessage("Error fetching data, try again"));
	}

	useEffect(() => {
		fetchFollowing();
	}, [context.serverURL, user]);

	const clickHandler = async (following) => {
		await axios.delete(`${context.serverURL}/cprestapi/removeFollowing`,
			{ params: { follower: user, following: following}, headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
			.catch((_) => setMessage("Error fetching data, try again"));
		
		await fetchFollowing();
	};

	return (
		<>
			<p className={`${ProfileStyle["decorate-profile-message"]}`}>{message}</p>
			{following?.map(function (data) {
				return (
					<div key={data}>
						<p>{data}</p>
						<button onClick={() => clickHandler(data)}>Unfollow</button>
					</div>
				);
			})}
		</>
	);
};

export default Following;

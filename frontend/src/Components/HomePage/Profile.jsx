import React, { useContext, useEffect, useState } from "react";
import Context from "../ContextProvider/Context";
import axios from "axios";
import ProfileStyle from "./Profile.module.css";

const Profile = () => {
	const context = useContext(Context);
	const [src, setSrc] = useState("");
	const [message, setMessage] = useState("");
	const [blogTitles, setBlogTitles] = useState([]);

	const email = sessionStorage.getItem("email")
		? sessionStorage.getItem("email")
		: "";
	const user = sessionStorage.getItem("user")
		? sessionStorage.getItem("user")
		: "";

	const ppHandler = (e) => {
		let profilePic = e.target.files[0];
		const formData = new FormData();
		formData.append("profilePic", profilePic);
		profilePic = formData.get("profilePic");
		axios
			.post(`${context.serverURL}/cprestapi/uploadPic`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
				},
				params: {
					userName: user,
				},
			})
			.then((resp) => {
				setSrc(URL.createObjectURL(profilePic));
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	};

	const deleteProfilePic = () => {
		axios
			.delete(`${context.serverURL}/cprestapi/deletePic`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
				},
				params: {
					userName: user,
				},
			})
			.then((resp) => {
				setSrc("");
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	};

	useEffect(() => {
		if (user) {
			axios
				.get(`${context.serverURL}/cprestapi/getPic`, {
					responseType: "arraybuffer",
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
					},
					params: {
						userName: user,
					},
				})
				.then((resp) => {
					if (resp.data.byteLength !== 0) {
						const blob = new Blob([resp.data]);
						const url = URL.createObjectURL(blob);
						setSrc(url);
					}
				})
				.catch((resp) => {
					setMessage("Error fetching data, try again");
				});
		}
	}, [user, context.serverURL]);

	useEffect(() => {
		if(user) {
			axios.get(`${context.serverURL}/cprestapi/${user}/blogs/getblogtitles`, 
			{ headers: {Authorization: `Bearer ${sessionStorage.getItem("jwt")}`} })
			.then((resp) => {setBlogTitles(resp.data); console.log(resp.data);});
		} 
	}, [user, context.serverURL]);

	return (
		<div className={`${ProfileStyle["decorate-profile-main-container"]}`}>
			<div className = {`${ProfileStyle["decorate-profile-personal"]}`}>
				{src && (
					<div>
						<img src={src} alt="error"/>
						<p>User: <b>{user}</b></p>
					</div>
				)}
				{!src && (
					<div>
						<button className={`${ProfileStyle["decorate-profile-container"]}`}>{user.slice(0, 1).toUpperCase()}</button>
						<p>{user}</p>
					</div>
				)}
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

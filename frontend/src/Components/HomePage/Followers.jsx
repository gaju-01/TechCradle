import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";

const Followers = () => {
	const [data, setData] = useState([]);
	const [title, setTitle] = useState("Followers");
	const context = useContext(Context);
	const [message, setMessage] = useState("");
	const language = sessionStorage.getItem("language")
		? sessionStorage.getItem("language")
		: "en";
	const user = sessionStorage.getItem("user")
		? sessionStorage.getItem("user")
		: "";

	useEffect(() => {
		if (user) {
			axios({
				method: "get",
				url: `${context.serverURL}/cprestapi/followers/${user}`,
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
				},
			})
				.then((resp) => {
					setData(resp.data);
				})
				.catch((resp) => {
					setMessage("Error fetching data, try again");
				});
		}
	}, [context.serverURL, user]);

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/intl/title/title.followers`,
			headers: {
				"Accept-Language": language,
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		})
			.then((response) => {
				setTitle(response.data);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	}, [language, context.serverURL]);

	return (
		<>
			<h2>{title}</h2>
			<p style={{ color: "red" }}>{message}</p>
			{data.map(function (info) {
				return <p key={info.userName}>{info.userName}</p>;
			})}
		</>
	);
};

export default Followers;

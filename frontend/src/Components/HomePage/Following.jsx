import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";

const Following = () => {
	const [list, setList] = useState([]);
	const [title, setTitle] = useState("Following");
	const context = useContext(Context);
	const [message, setMessage] = useState("");
	const language = sessionStorage.getItem("language")
		? sessionStorage.getItem("language")
		: "en";
	const user = sessionStorage.getItem("user")
		? sessionStorage.getItem("user")
		: "";

	useEffect(() => {
		axios({
			url: `${context.serverURL}/cprestapi/following`,
			params: {
				parent: user,
			},
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		})
			.then((resp) => {
				setList(resp.data);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	}, [context.serverURL, user]);

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/intl/title/title.following`,
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

	const clickHandler = (data) => {
		axios({
			method: "delete",
			url: `${context.serverURL}/cprestapi/removeUser`,
			params: {
				child: user,
				parent: data,
			},
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		})
			.then((resp) => {
				axios({
					url: `${context.serverURL}/cprestapi/following`,
					params: {
						parent: user,
					},
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
					},
				})
					.then((resp) => {
						setList(resp.data);
					})
					.catch((resp) => {
						setMessage("Error fetching data, try again");
					});
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	};

	return (
		<>
			<h2>{title}</h2>
			<p style={{ color: "red" }}>{message}</p>
			{list.map(function (data) {
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

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";
import ProfileStyle from "./Profile.module.css";

const Following = () => {
	const [list, setList] = useState([]);
	const context = useContext(Context);
	const [message, setMessage] = useState("");
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
			<p className={`${ProfileStyle["decorate-profile-message"]}`}>{message}</p>
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

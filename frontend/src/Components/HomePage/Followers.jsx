import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";
import ProfileStyle from "./Profile.module.css";

const Followers = () => {
	const [data, setData] = useState([]);
	const context = useContext(Context);
	const [message, setMessage] = useState("");
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

	return (
		<>
			<p className={`${ProfileStyle["decorate-profile-message"]}`}>{message}</p>
			{data.map(function (info) {
				return <p key={info.userName}>{info.userName}</p>;
			})}
		</>
	);
};

export default Followers;

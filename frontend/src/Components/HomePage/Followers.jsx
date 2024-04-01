import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";

const Followers = () => {
	const [data, setData] = useState([]);
	const [title, setTitle] = useState("Followers");
	const context = useContext(Context);

	useEffect(() => {
		if (context.user) {
			axios({
				method: "get",
				url: `${context.serverURL}/cprestapi/followers/${context.user}`,
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
				},
			}).then((resp) => {
				setData(resp.data);
			});
		}
	}, []);

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/intl/title/title.followers`,
			headers: {
				"Accept-Language": context.language,
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		}).then((response) => {
			setTitle(response.data);
		});
	}, [context.language, context.serverURL]);

	return (
		<>
			<h2>{title}</h2>
			{data.map(function (info) {
				return <p key={info.userName}>{info.userName}</p>;
			})}
		</>
	);
};

export default Followers;

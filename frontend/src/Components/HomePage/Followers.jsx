import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";

const Followers = () => {
	const [data, setData] = useState([]);
	const context = useContext(Context);

	useEffect(() => {
		if (context.user) {
			axios({
				method: "get",
				url: `http://localhost:8080/cprestapi/followers/${context.user}`,
				headers: {
					Authorization: "Basic " + window.btoa("user:pass"),
				},
			}).then((resp) => {
				setData(resp.data);
			});
		}
	}, []);

	return (
		<>
			<h2>Followers</h2>
			{data.map(function (info) {
				return <p key={info.userName}>{info.userName}</p>;
			})}
		</>
	);
};

export default Followers;

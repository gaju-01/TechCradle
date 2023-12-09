import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";

const Following = () => {
	const [list, setList] = useState([]);
	const context = useContext(Context);

	useEffect(() => {
		axios({
			url: `${context.serverURL}/cprestapi/following`,
			params: {
				parent: context.user,
			},
			headers: {
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		}).then((resp) => {
			setList(resp.data);
		});
	}, []);

	return (
		<>
			<h2>Following</h2>
			{list.map(function (data) {
				return <p key={data}>{data}</p>;
			})}
		</>
	);
};

export default Following;

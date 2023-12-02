import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Context from "../ContextProvider/Context";
const SepBlog = () => {
	const context = useContext(Context);
	const [data, setData] = useState({});
	const [message, setMessage] = useState("");
	const params = useParams();
	const [currencyRelated, setCurrencyRelated] = useState({});

	useEffect(() => {
		axios({
			method: "get",
			url: `http://localhost:8080/cprestapi/getblog/`,
			data: {
				id: params.loc,
			},
		}).then((response) => {
			console.log(response);
		});
	}, []);

	useEffect(() => {
		axios
			.get(
				`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`
			)
			.then((res) => {
				setCurrencyRelated(res.data["usd"]);
			});
	}, [context.currency]);

	const followHandler = (user) => {
		if (user === context.user) {
			setMessage("You cannot follow yourself");
		} else {
			axios({
				method: "get",
				url: "http://localhost:8080/cprestapi/followers/check",
				params: {
					parent: user,
					child: context.user,
				},
				headers: {
					Authorization: "Basic " + window.btoa("user:pass"),
				},
			}).then((resp) => {
				if (resp.data === "NO") {
					axios({
						method: "post",
						url: `http://localhost:8080/cprestapi/followers`,
						data: {
							userName: context.user,
						},
						params: {
							user: user,
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: "Basic " + window.btoa("user:pass"),
						},
					});
				}
			});
			setMessage(`You are now following ${user}`);
		}
	};

	return (
		<>
			{message !== "" && (
				<div className="alert alert-success" role="alert">
					{message}
				</div>
			)}
			<div key={data.title}>
				<p className="fs-2">{data.title}</p>
				<p>
					<b>Author:</b> {data.userName}
				</p>
				<button
					type="submit"
					onClick={() => {
						followHandler(data.userName);
					}}
				>
					Follow
				</button>
				<p>
					<b>Short Description:</b> {data.sDesc}
				</p>
				<p>
					<b>LastModified:</b> {data.lastModified}
				</p>
				<p>
					<b>Price:</b> {currencyRelated[context.currency] * data.price}{" "}
					{context.currency}
				</p>
				{data.price === 0 && (
					<p>
						<b>Content: </b>
						{data.description}
					</p>
				)}
				{data.price !== 0 && <button type="submit">Buy</button>}
				<hr></hr>
			</div>
		</>
	);
};

export default SepBlog;

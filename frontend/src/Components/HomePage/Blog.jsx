import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";

const Blog = () => {
	const context = useContext(Context);
	const [blogs, setBlogs] = useState([]);
	const [title, setTitle] = useState("Blogs");
	const [message, setMessage] = useState("");
	const [currencyRelated, setCurrencyRelated] = useState({});

	useEffect(() => {
		axios
			.get(
				`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json`
			)
			.then((res) => {
				setCurrencyRelated(res.data["usd"]);
			});
	}, [context.currency]);

	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:8080/cprestapi/intl/title/title.blog",
			headers: {
				"Accept-Language": context.language,
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		}).then((response) => {
			setTitle(response.data);
		});
	}, [context.language]);

	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:8080/cprestapi/blogs",
			headers: {
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		}).then((response) => {
			setBlogs(response.data);
		});
	}, []);

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
		<div>
			{message !== "" && (
				<div className="alert alert-success" role="alert">
					{message}
				</div>
			)}
			<div>
				<p className="fs-1">{title}</p>
			</div>
			<div>
				{blogs.map(function (data) {
					return (
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
					);
				})}
			</div>
		</div>
	);
};
export default Blog;

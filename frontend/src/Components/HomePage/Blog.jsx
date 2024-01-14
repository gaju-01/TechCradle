import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";

const Blog = () => {
	const context = useContext(Context);
	const [blogs, setBlogs] = useState([]);
	const [title, setTitle] = useState("Blogs");
	const [messages, setMessages] = useState([]);
	const [currencyRelated, setCurrencyRelated] = useState({});
	const [searchTitle, setSearchTitle] = useState("");
	const [filteredBlogs, setFilteredBlogs] = useState([]);
	const [following, setFollowing] = useState(new Set());

	const resetFollowing = (user) => {
		axios({
			url: `${context.serverURL}/cprestapi/following`,
			params: {
				parent: context.user,
			},
			headers: {
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		}).then((resp) => {
			const set = new Set();
			const data = resp.data;
			data.forEach((element) => {
				set.add(element);
			});
			setFollowing(set);
		});
	};

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
			const set = new Set();
			const data = resp.data;
			data?.forEach((element) => {
				set.add(element);
			});
			setFollowing(set);
		});
	}, [context.serverURL, context.user]);

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
		console.log("serverURL", context.serverURL);
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/intl/title/title.blog`,
			headers: {
				"Accept-Language": context.language,
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		}).then((response) => {
			setTitle(response.data);
		});
	}, [context.language, context.serverURL]);

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/blogs`,
			headers: {
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		}).then((response) => {
			setBlogs(response.data);
			setFilteredBlogs(response.data);
		});
	}, [context.serverURL]);

	const followHandler = (user) => {
		if (user === context.user) {
			setMessages((prev) => [
				...prev,
				{ length: prev.length, value: "You cannot follow yourself" },
			]);
		} else {
			if (!following.has(user)) {
				axios({
					method: "get",
					url: `${context.serverURL}/cprestapi/followers/check`,
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
							url: `${context.serverURL}/cprestapi/followers`,
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
						}).then((resp) => {
							resetFollowing(user);
						});
					}
				});
				setMessages((prev) => [
					...prev,
					{ length: prev.length, value: `You are now following ${user}` },
				]);
			} else {
				axios({
					method: "delete",
					url: `${context.serverURL}/cprestapi/removeUser`,
					params: {
						child: context.user,
						parent: user,
					},
					headers: {
						Authorization: "Basic " + window.btoa("user:pass"),
					},
				}).then((resp) => {
					resetFollowing();
					setMessages((prev) => [
						...prev,
						{ length: prev.length, value: `You have unfollowed ${user}` },
					]);
				});
			}
		}
	};

	const titleChangeHandler = (event) => {
		setSearchTitle(event.target.value);
	};

	const submitSearchTitleHandler = (event) => {
		if (searchTitle === "" || !searchTitle) {
			setFilteredBlogs(blogs);
		} else {
			const temp = blogs.filter((ele) =>
				ele.title.toLowerCase().includes(searchTitle.toLowerCase())
			);
			setFilteredBlogs(temp);
		}
	};

	const messagesHandler = (index) => {
		var temp = messages;
		const arr1 = temp.slice(0, index);
		for (var i = index + 1; i < temp.length; i++) {
			temp[i].length = temp[i].length - 1;
		}
		const arr2 = temp.slice(index + 1, temp.length);
		const arr3 = [...arr1, ...arr2];
		setMessages(arr3);
	};

	return (
		<div>
			{messages.length > 0 && (
				<div>
					{messages.map(function (data) {
						return (
							<div
								className="alert alert-success"
								role="alert"
								key={data.length.toString()}
							>
								<p key={data.length.toString()}>{data.value}</p>
								<button
									type="button"
									class="btn-close"
									aria-label="Close"
									key={data.length.toString()}
									onClick={() => messagesHandler(data.length)}
								></button>
							</div>
						);
					})}
				</div>
			)}
			<div>
				<input type="text" onChange={titleChangeHandler} value={searchTitle} />
				<button onClick={submitSearchTitleHandler}>Search</button>
			</div>
			<div>
				<p className="fs-1">{title}</p>
			</div>
			<div>
				{filteredBlogs.map(function (data) {
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
								{following.has(data.userName) ? "Unfollow" : "Follow"}
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

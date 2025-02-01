import React, {useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";
import BlogStyles from "./Blog.module.css";

const Blog = (props) => {
	const context = useContext(Context);
	const [blogs, setBlogs] = useState([]);
	const [messages, setMessages] = useState([]);
	const [currencyRelated, setCurrencyRelated] = useState({});
	const [searchTitle, setSearchTitle] = useState("");
	const [filteredBlogs, setFilteredBlogs] = useState([]);
	const [following, setFollowing] = useState(new Set());
	const [message, setMessage] = useState("");
	const currency = sessionStorage.getItem("currency")
		? sessionStorage.getItem("currency")
		: "usd";
	const user = sessionStorage.getItem("user")
		? sessionStorage.getItem("user")
		: "";

	const resetFollowing = (user) => {
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
				const set = new Set();
				const data = resp.data;
				data.forEach((element) => {
					set.add(element);
				});
				setFollowing(set);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	};

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
				const set = new Set();
				const data = resp.data;
				data?.forEach((element) => {
					set.add(element);
				});
				setFollowing(set);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	}, [context.serverURL, user]);

	useEffect(() => {
		axios
			.get(
				`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies/usd.json`
			)
			.then((res) => {
				console.log(res.data["usd"]);
				setCurrencyRelated(res.data["usd"]);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	}, [currency]);

	useEffect(() => {
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/blogs`,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		})
			.then((response) => {
				setBlogs(response.data);
				const temp = response.data.filter(
					(ele) =>
						ele.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
						(props.author === null ||
							props.author === undefined ||
							props.author === ele.userName)
				);
				setFilteredBlogs(temp);
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	}, [context.serverURL, props.author, searchTitle]);

	const followHandler = (user) => {
		if (
			user ===
			(sessionStorage.getItem("user") ? sessionStorage.getItem("user") : "")
		) {
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
						child: sessionStorage.getItem("user")
							? sessionStorage.getItem("user")
							: "",
					},
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
					},
				})
					.then((resp) => {
						if (resp.data === "NO") {
							axios({
								method: "post",
								url: `${context.serverURL}/cprestapi/followers`,
								data: {
									userName: sessionStorage.getItem("user")
										? sessionStorage.getItem("user")
										: "",
								},
								params: {
									user: user,
								},
								headers: {
									"Content-Type": "application/json",
									Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
								},
							})
								.then((resp) => {
									resetFollowing(user);
								})
								.catch((resp) => {
									setMessage("Error fetching data, try again");
								});
						}
					})
					.catch((resp) => {
						setMessage("Error fetching data, try again");
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
						child: sessionStorage.getItem("user")
							? sessionStorage.getItem("user")
							: "",
						parent: user,
					},
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
					},
				})
					.then((resp) => {
						resetFollowing();
						setMessages((prev) => [
							...prev,
							{ length: prev.length, value: `You have unfollowed ${user}` },
						]);
					})
					.catch((resp) => {
						setMessage("Error fetching data, try again");
					});
			}
		}
	};

	const titleChangeHandler = (event) => {
		setSearchTitle(event.target.value);
		submitSearchTitleHandler(event.target.value);
	};

	const submitSearchTitleHandler = (event) => {
		if (searchTitle === "" || !searchTitle) {
			const temp = blogs.filter(
				(ele) =>
					props.author === null ||
					props.author === undefined ||
					props.author === ele.userName
			);
			setFilteredBlogs(temp);
		} else {
			const temp = blogs.filter(
				(ele) =>
					ele.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
					(props.author === null ||
						props.author === undefined ||
						props.author === ele.userName)
			);
			setFilteredBlogs(temp);
		}
	};

	const messagesHandler = (index) => {
		var temp = messages;
		const arr1 = temp?.slice(0, index);
		for (var i = index + 1; i < temp.length; i++) {
			temp[i].length = temp[i].length - 1;
		}
		const arr2 = temp?.slice(index + 1, temp.length);
		const arr3 = [...arr1, ...arr2];
		setMessages(arr3);
	};

	return (
		<div>
			{messages.length > 0 && (
				<div>
					{messages.map(function (data, cnt) {
						return (
							<div className="alert alert-success" role="alert" key={cnt.toString()}>
								<p>{data.value}</p>
								<button type="button" className="btn-close" aria-label="Close" key={data.length.toString()} onClick={() => messagesHandler(data.length)}></button>
							</div>
						);
					})}
				</div>
			)}
			<div>
				<input placeholder="Enter the title of the blog to begin your browsing" className={`${BlogStyles["decorate-blogs-searchbar"]}`} type="text" onChange={titleChangeHandler} value={searchTitle} />
			</div>
			<p style={{ color: "red" }}>{message}</p>
			<div>
				{filteredBlogs.map(function (data) {
					return (
						<div key={data.title}>
							<h1>{data.title}</h1>
							<div className={`${BlogStyles["decorate-blogs-author-div"]}`}>
								<p><b>Written By</b> {data.userName}</p>
								<button type="submit" onClick={() => { followHandler(data.userName);}}>{following.has(data.userName) ? "Unfollow" : "Follow"}</button>
							</div>
							<p>{data.sDesc}</p>
							{data.price === 0 && <div dangerouslySetInnerHTML={{__html: data.description}}/>}
							{data.price !== 0 &&
								<div className={`${BlogStyles["decorate-blogs-buy"]}`}>
									<p>Please pay &nbsp;</p>	
									<button>{(data.price * (currency === "usd" ? 1 : currencyRelated[currency])).toFixed(2)}</button>
									<p>&nbsp; {currency.toUpperCase()} to buy the blog</p>
								</div>
							}
							<hr></hr>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Blog;

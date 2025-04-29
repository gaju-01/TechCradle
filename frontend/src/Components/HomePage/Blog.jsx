import React, {useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";
import BlogStyles from "./Blog.module.css";
import parse from "html-react-parser";

const Blog = (props) => {
	const context = useContext(Context);
	const [blogs, setBlogs] = useState([]);
	const [message, setMessage] = useState("");
	const [searchTitle, setSearchTitle] = useState("");
	const [filteredBlogs, setFilteredBlogs] = useState([]);
	const [following, setFollowing] = useState(new Set());
	const [followingNotifications, setFollowingNotifications] = useState([]);
	const user = sessionStorage.getItem("user") ? sessionStorage.getItem("user") : "";

	const titleChangeHandler = (event) => {
		setSearchTitle(event.target.value);
		if(!searchTitle) setFilteredBlogs([...blogs]);
		else setFilteredBlogs([blogs.filter((blog) => blog.title.toLowerCase().includes(searchTitle.toLowerCase()))])
	};

	const followingNotificationHandler = (deleteIndex) => {
		const prefixNotifications = followingNotifications.slice(0, deleteIndex);
		const suffixNotifications = followingNotifications.slice(deleteIndex + 1, followingNotifications.length);
		for (var i = 0; i < suffixNotifications.length; i++) { suffixNotifications[i].index = suffixNotifications[i].index - 1 }
		setFollowingNotifications([...prefixNotifications, ...suffixNotifications]);
	};
	
	const resetFollowing = async () => {
		await axios.get(`${context.serverURL}/cprestapi/following/${user}`,
			{ headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
			.then((response) => {
				const setOfFollowing = new Set();
				const listOfFollowing = response.data;
				listOfFollowing?.forEach((followingName) => { setOfFollowing.add(followingName) });
				setFollowing(setOfFollowing) })
			.catch((_) =>  setMessage("Error fetching data, try again"));
	};
	
	const followHandler = async (author) => {
		var followingNotificationMessage
		const params = { following: author, follower: user }
		if (author === user) followingNotificationMessage = "You cannot follow yourself";
		else {
			var isFollowingAuthor
			await axios.get(`${context.serverURL}/cprestapi/followers/check`,
				{ params: params, headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}`} })
				.then((response) => { isFollowingAuthor = response.data })
				.catch((_) => setMessage("Error fetching data"));
			
			if(isFollowingAuthor) {
				await axios.delete(`${context.serverURL}/cprestapi/removeFollowing`,
					{ params: params, headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}`} })
					.then((response) => followingNotificationMessage = response.data)
					.catch((_) => setMessage("Error performing operation"));
			} else {
				await axios.post(`${context.serverURL}/cprestapi/follow`, {}, 
					{ params: params, headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}`} })
					.then((response) => followingNotificationMessage = response.data)
					.catch((_) => setMessage("Error performing operation")); 
			}
			
			await resetFollowing();	
		}
		if(followingNotificationMessage)
			setFollowingNotifications((previousNotifications) => [...previousNotifications, {value: followingNotificationMessage, index: previousNotifications.length}]);	
	};

	useEffect(() => {
		axios.get(`${context.serverURL}/cprestapi/blogs`,
			{ headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
			.then((response) => { setBlogs(response.data);
													setFilteredBlogs([...response.data]); })
			.catch((_) => setMessage("Error fetching data"));
	}, [context.serverURL, props.author, searchTitle]);

	useEffect(() => {
		resetFollowing();
	}, [context.serverURL, user]);
	
	return (
		<div>
			{followingNotifications.length > 0 && (
				<div>
					{followingNotifications.map(function (data, cnt) {
						return (
							<div className="alert alert-success" role="alert" key={cnt.toString()}>
								<p>{data.value}</p>
								<button type="button" className="btn-close" aria-label="Close" key={data.index.toString()} onClick={() => followingNotificationHandler(data.index)}></button>
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
								<p>Written By {data.userName}</p>
								<button type="submit" onClick={() => { followHandler(data.userName) }}>{following.has(data.userName) ? "Unfollow" : "Follow"}</button>
							</div>
							<p>{data.shortDescription}</p>
							<div>{parse(data.description)}</div>
							<hr></hr>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Blog;

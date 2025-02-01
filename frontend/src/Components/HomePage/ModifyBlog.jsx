import axios from "axios";
import React, { useContext, useState } from "react";
import Context from "../ContextProvider/Context";
import CreateBlogStyles from  "./CreateBlog.module.css";
import TextEditor from "../Utilities/TextEditor";

const ModifyBlog = () => {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [mess, setMess] = useState("Blog with this title does not exsist");
	const [price, setPrice] = useState(0);
	const [sDesc, setSDesc] = useState("");
	const context = useContext(Context);

	const user = sessionStorage.getItem("user")
		? sessionStorage.getItem("user")
		: "";

	const handlePrice = (event) => {
		setPrice(event.target.value);
	};
	const handleSDesc = (event) => {
		setSDesc(event.target.value);
	};

	const inputChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	const deleteHandler = (event) => {
		event.preventDefault();
		let mess = "";
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/blogs/findblog`,
			params: {
				title: title,
			},
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		})
			.then((resp) => {
				mess = resp.data;
				if (mess === "The title is not available") {
					axios({
						method: "delete",
						url: `${context.serverURL}/cprestapi/${user}/blogs/deleteblog`,
						params: {
							title: title,
						},
						headers: {
							Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
						},
					})
						.then((resp) => {
							setMess("Blog is successfully deleted!!");
						})
						.catch((error) => {
							setMess(
								"Enter the valid title or you are not the author this blog!!"
							);
						});
				} else {
					setMess("The blog with this title does not exsist");
				}
			})
			.catch((error) => {
				setMess("Enter the valid title or you are not the author this blog!!");
			});
	};

	const submitHandler = (event) => {
		event.preventDefault();

		let mess = "";
		axios({
			method: "get",
			url: `${context.serverURL}/cprestapi/blogs/findblog`,
			params: {
				title: title,
			},
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		})
			.then((resp) => {
				mess = resp.data;
				if (mess === "The title is not available") {
					axios({
						method: "patch",
						url: `${context.serverURL}/cprestapi/${user}/blogs/updateblog`,
						data: {
							title: title,
							description: text,
							price: price,
							sDesc: sDesc,
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
						},
					})
						.then((resp) => {
							setMess("Your blog was successfully updated!!");
						})
						.catch((error) => {
							setMess(
								"Enter the valid details or you are not the author this blog!!"
							);
						});
				} else {
					setMess("Blog with this title does not exsist");
				}
			})
			.catch((error) => {
				setMess(
					"Enter the valid details or you are not the author this blog!!"
				);
			});
	};

	return (
		<div className={`${CreateBlogStyles["decorate-cb-div"]}`}>
			<div>
				<p style={{ color: "red" }}>{mess}</p>
			</div>
			<div>
				<label htmlFor="exampleFormControlInput1">Title</label>
			</div>
			<div>
				<input type="text" id="exampleFormControlInput1" placeholder="Enter the title of the blog (eg: Interfaces in Java)" onChange={inputChangeHandler} value={title}/>
			</div>
			<div>
				<label htmlFor="exampleFormControlTextarea1">Description</label>
			</div>
			<div>
				<TextEditor value={text} onChange={setText} placeholder="Enter your description" />
			</div>
			<div>
				<label htmlFor="price">Price(in USD)</label>
			</div>
			<div>
				<input id="price" value={price} onChange={handlePrice} type="number" placeholder="Enter the price"/>
			</div>
			<div>
				<label htmlFor="number">Short Description</label>
			</div>
			<div>
				<input id="sd" value={sDesc} onChange={handleSDesc} placeholder="Enter the short description"/>
			</div>
			<div style={{display: "flex", marginLeft: "49%"}}>
				<button style={{marginLeft: "0px"}} type="submit" onClick={submitHandler}>Submit</button>
				<button style={{marginLeft: "1%"}} type="submit" onClick={deleteHandler}>Delete</button>
			</div>
		</div> 
	);
};
export default ModifyBlog;

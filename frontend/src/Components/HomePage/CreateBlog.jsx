import React, { useContext, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";
import CreateBlogStyles from "./CreateBlog.module.css";
import 'react-quill/dist/quill.snow.css';
import TextEditor from "../Utilities/TextEditor";

const CreateBlog = () => {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [mess, setMess] = useState("The title is available");
	const [sDesc, setSDesc] = useState("");
	const context = useContext(Context);
	const user = sessionStorage.getItem("user") ? sessionStorage.getItem("user"): "";

	const handleSDesc = (event) => {
		setSDesc(event.target.value);
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
				if (mess === "The title is available") {
					axios({
						method: "post",
						url: `${context.serverURL}/cprestapi/users/${user}/blogs`,
						data: {
							title: title,
							description: text,
							sDesc: sDesc,
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
						},
					}).catch((error) => {
						setMess("Enter the proper description and price (<=1000 USD)!!");
					});
				}
				setMess(mess);
			})
			.catch((error) => {
				setMess("The title should me minimum of 2 characters!!");
			});

		setTitle("");
		setText("");
		setSDesc("");
	};

	const inputChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	return (
		<div className={`${CreateBlogStyles["decorate-cb-div"]}`}>
			<div>
				<p style={{ color: "red" }}>{mess}</p>
			</div>
			<div>
				<label>Title</label>
			</div>
			<div>
				<input type="text" id="exampleFormControlInput1" placeholder="Enter the title of the blog (eg: Interfaces in Java)" onChange={inputChangeHandler} value={title}/>
			</div>
			<div>
				<label>Short Description</label>
			</div>
			<div>
				<input id="sd" placeholder="Enter the short description" value={sDesc} onChange={handleSDesc} type="text"/>
			</div>
			<div>
				<label>Description</label>
			</div>
			<div>
				<TextEditor value={text} onChange={setText} />
			</div>
			<div>
				<button type="submit" onClick={submitHandler}>Submit</button>
			</div>
		</div>
	);
};
export default CreateBlog;

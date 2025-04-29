import React, { useContext, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";
import CreateBlogStyles from "./CreateBlog.module.css";
import 'react-quill/dist/quill.snow.css';
import TextEditor from "../Utilities/TextEditor";
import PopUp from "../Utilities/PopUp";

const CreateBlog = () => {
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [mess, setMess] = useState();
	const context = useContext(Context);
	const [sDesc, setSDesc] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const user = sessionStorage.getItem("user") ? sessionStorage.getItem("user"): "";

	const handleSDesc = (event) => {
		setSDesc(event.target.value);
	};

	const popUpHandler = () => {
		setIsOpen((prevState) => !prevState);
	}

	const inputChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		var isBlogPresent = true;
		await axios.get(`${context.serverURL}/cprestapi/blogs/findblog`,
			{ params: { title:title}, headers: {Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
			.then((_) => isBlogPresent = false)
			.catch((exception) => setMess(exception.response.data));
		
		if(!isBlogPresent) {
			await axios.post(`${context.serverURL}/cprestapi/users/${user}/blogs`,
				{title: title, description: text, shortDescription: sDesc},
				{headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
				.then((_) => setMess("Blog created"))
				.catch((exception) => setMess(exception.response.data));
		}
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
				{isOpen && <PopUp setText={setText}/>}
				<button type="submit" onClick={popUpHandler}>Use Gemini</button>
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

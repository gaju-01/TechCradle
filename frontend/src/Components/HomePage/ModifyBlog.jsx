import axios from "axios";
import React, { useContext, useState } from "react";
import Context from "../ContextProvider/Context";
import CreateBlogStyles from  "./CreateBlog.module.css";
import TextEditor from "../Utilities/TextEditor";
import PopUp from "../Utilities/PopUp";

const ModifyBlog = () => {
	const context = useContext(Context);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [mess, setMess] = useState("");
	const [sDesc, setSDesc] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const user = sessionStorage.getItem("user") ? sessionStorage.getItem("user") : "";

	const handleSDesc = (event) => {
		setSDesc(event.target.value);
	};

	const popUpHandler = () => {
		setIsOpen((prevState) => !prevState);
	}
	
	const inputChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	const checkIfBlogIsPresent = async () => {
		var isBlogPresent = null;
		await axios.get(`${context.serverURL}/cprestapi/blogs/findblog`,
			{ params: { title: title }, headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
			.then((_) => isBlogPresent = false)
			.catch((exception) => {
				setMess(exception.response.data);
				if(exception.response.data === "The title is not available") isBlogPresent = true;
			})
		
		return isBlogPresent;
	}

	const deleteHandler = async (event) => {
		event.preventDefault();
		const isBlogPresent = await checkIfBlogIsPresent();
		if(isBlogPresent) {
			await axios.delete(`${context.serverURL}/cprestapi/${user}/blogs/deleteblog`,
				{ params: { title: title }, headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
				.then((response) => setMess(response.data))
				.catch((exception) => setMess(exception.response.data));
		} else {
			setMess("Blog with this title does not exist");
		}
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		const isBlogPresent = await checkIfBlogIsPresent();
		if(isBlogPresent) {
			await axios.patch(`${context.serverURL}/cprestapi/${user}/blogs/updateblog`,
				{title: title, description: text, shortDescription: sDesc},
				{ headers: { Authorization: `Bearer ${sessionStorage.getItem("jwt")}` }})
				.then((_) => setMess("Updated the blog"))
				.catch((exception) => setMess(exception.response.data));
		} else {
			setMess("Blog with this title does not exist");
		}
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
				<label htmlFor="number">Short Description</label>
			</div>
			<div>
				<input id="sd" value={sDesc} onChange={handleSDesc} placeholder="Enter the short description"/>
			</div>
			<div>
				<label htmlFor="exampleFormControlTextarea1">Description</label>
				{isOpen && <PopUp setText={setText}/>}
				<button type="submit" onClick={popUpHandler}>Use Gemini</button>
			</div>
			<div>
				<TextEditor value={text} onChange={setText} placeholder="Enter your description" />
			</div>
			<div style={{display: "flex", marginLeft: "49%"}}>
				<button style={{marginLeft: "0px"}} type="submit" onClick={submitHandler}>Submit</button>
				<button style={{marginLeft: "1%"}} type="submit" onClick={deleteHandler}>Delete</button>
			</div>
		</div> 
	);
};
export default ModifyBlog;

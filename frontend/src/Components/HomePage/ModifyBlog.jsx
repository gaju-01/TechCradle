import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Context from "../ContextProvider/Context";

const ModifyBlog = () => {
	const [head, setHead] = useState("Create blogs");
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [mess, setMess] = useState("Blog with this title does not exsist");
	const context = useContext(Context);

	const inputChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	const descChangeHandler = (event) => {
		setText(event.target.value);
	};

	const deleteHandler = (event) => {
		event.preventDefault();
		let mess = "";
		axios({
			method: "get",
			url: `http://localhost:8080/cprestapi/blogs/findblog`,
			params: {
				title: title,
			},
			headers: {
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		})
			.then((resp) => {
				mess = resp.data;
				if (mess === "The title is not available") {
					axios({
						method: "delete",
						url: `http://localhost:8080/cprestapi/${context.user}/blogs/deleteblog`,
						params: {
							title: title,
						},
						headers: {
							Authorization: "Basic " + window.btoa("user:pass"),
						},
					})
						.then((resp) => {
							setMess("Blog is successfully deleted!!");
						})
						.catch((error) => {
							setMess(
								"Enter the valid title or oyu are not the author this blog!!"
							);
						});
				} else {
					setMess("The blog with this title does not exsist");
				}
			})
			.catch((error) => {
				setMess("Enter the valid title or oyu are not the author this blog!!");
			});
	};

	const submitHandler = (event) => {
		event.preventDefault();

		let mess = "";
		axios({
			method: "get",
			url: `http://localhost:8080/cprestapi/blogs/findblog`,
			params: {
				title: title,
			},
			headers: {
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		})
			.then((resp) => {
				mess = resp.data;
				if (mess === "The title is not available") {
					axios({
						method: "patch",
						url: `http://localhost:8080/cprestapi/${context.user}/blogs/updateblog`,
						data: {
							title: title,
							description: text,
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: "Basic " + window.btoa("user:pass"),
						},
					})
						.then((resp) => {
							setMess("Your blog was successfully updated!!");
						})
						.catch((error) => {
							setMess(
								"Enter the valid title/description or you are not the author this blog!!"
							);
						});
				} else {
					setMess("Blog with this title does not exsist");
				}
			})
			.catch((error) => {
				setMess(
					"Enter the valid title/description or you are not the author this blog!!"
				);
			});
	};

	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:8080/cprestapi/intl/title/title.modify.blog",
			headers: {
				"Accept-Language": context.language,
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		}).then((resp) => {
			setHead(resp.data);
		});
	}, [context.language]);

	return (
		<div>
			<div>
				<p className="fs-1">{head}</p>
			</div>
			<form onSubmit={submitHandler}>
				<div className="mb-3">
					<label htmlFor="exampleFormControlInput1" className="form-label">
						Title of your blog
					</label>
					<input
						type="text"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder="eg: Interfaces in Java"
						onChange={inputChangeHandler}
						value={title}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">
						Enter your description
					</label>
					<textarea
						className="form-control"
						id="exampleFormControlTextarea1"
						rows="3"
						value={text}
						onChange={descChangeHandler}
					></textarea>
				</div>
				<div className="mb-3">
					<button type="submit" className="btn btn-success">
						Submit
					</button>
				</div>
			</form>
			<button onClick={deleteHandler} type="submit" className="btn btn-success">
				Delete
			</button>
			<p>{mess}</p>
		</div>
	);
};
export default ModifyBlog;

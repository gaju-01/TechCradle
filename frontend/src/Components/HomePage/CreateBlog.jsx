import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";

const CreateBlog = () => {
	const [head, setHead] = useState("Create blogs");
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [mess, setMess] = useState("The title is available");
	const context = useContext(Context);

	const submitHandler = (event) => {
		event.preventDefault();
		let mess = "";

		axios({
			method: "get",
			url: `http://localhost:8080/cprestapi/blogs/findblog`,
			params: {
				title: title,
			},
		})
			.then((resp) => {
				mess = resp.data;
				if (mess === "The title is available") {
					axios({
						method: "post",
						url: `http://localhost:8080/cprestapi/users/${context.user}/blogs`,
						data: {
							title: title,
							description: text,
						},
						headers: {
							"Content-Type": "application/json",
						},
					}).catch((error) => {
						setMess(error.response.data.errors[0].defaultMessage);
					});
				}
				setMess(mess);
			})
			.catch((error) => {
				setMess(error.response.data.message);
			});
		setTitle("");
		setText("");
	};

	const inputChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	const descChangeHandler = (event) => {
		setText(event.target.value);
	};

	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:8080/cprestapi/intl/title/title.create.blog",
			headers: {
				"Accept-Language": context.language,
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
			<p>{mess}</p>
		</div>
	);
};
export default CreateBlog;

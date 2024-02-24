import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Context from "../ContextProvider/Context";

const ModifyBlog = () => {
	const [head, setHead] = useState("Create blogs");
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [mess, setMess] = useState("Blog with this title does not exsist");
	const [price, setPrice] = useState(0);
	const [sDesc, setSDesc] = useState("");
	const context = useContext(Context);

	const handlePrice = (event) => {
		setPrice(event.target.value);
	};
	const handleSDesc = (event) => {
		setSDesc(event.target.value);
	};

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
			url: `${context.serverURL}/cprestapi/blogs/findblog`,
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
						url: `${context.serverURL}/cprestapi/${context.user}/blogs/deleteblog`,
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
				Authorization: "Basic " + window.btoa("user:pass"),
			},
		})
			.then((resp) => {
				mess = resp.data;
				if (mess === "The title is not available") {
					axios({
						method: "patch",
						url: `${context.serverURL}/cprestapi/${context.user}/blogs/updateblog`,
						data: {
							title: title,
							description: text,
							price: price,
							sDesc: sDesc,
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
			url: `${context.serverURL}/cprestapi/intl/title/title.modify.blog`,
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
					<label htmlFor="price" className="form-label">
						Enter the Price(in USD)
					</label>
					<input
						id="price"
						value={price}
						onChange={handlePrice}
						className="form-control"
						type="number"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="number" className="form-label">
						Enter the Short Description
					</label>
					<input
						className="form-control"
						id="sd"
						value={sDesc}
						onChange={handleSDesc}
					/>
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
			<p style={{ color: "red" }}>{mess}</p>
		</div>
	);
};
export default ModifyBlog;

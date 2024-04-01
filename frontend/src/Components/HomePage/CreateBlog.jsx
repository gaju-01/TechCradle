import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";

const CreateBlog = () => {
	const [head, setHead] = useState("Create blogs");
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [mess, setMess] = useState("The title is available");
	const [price, setPrice] = useState(0);
	const [sDesc, setSDesc] = useState("");
	const context = useContext(Context);

	const handlePrice = (event) => {
		setPrice(event.target.value);
	};

	const handleSDesc = (event) => {
		setSDesc(event.target.value);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		let mess = "";
		if (price < 0) {
			setMess("Enter the valid price");
			return;
		}
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
						url: `${context.serverURL}/cprestapi/users/${context.user}/blogs`,
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
					}).catch((error) => {
						setMess("Description should be minimum of 10 characters!!");
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
		setPrice(0);
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
			url: `${context.serverURL}/cprestapi/intl/title/title.create.blog`,
			headers: {
				"Accept-Language": context.language,
				Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
			},
		}).then((resp) => {
			setHead(resp.data);
		});
	}, [context.language, context.serverURL]);

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
			<p style={{ color: "red" }}>{mess}</p>
		</div>
	);
};
export default CreateBlog;

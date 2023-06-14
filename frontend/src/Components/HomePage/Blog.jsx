import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Context from "../ContextProvider/Context";
const Blog = () => {
	const context = useContext(Context);
	const [blogs, setBlogs] = useState([]);
	const [title, setTitle] = useState("Blogs");

	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:8080/cprestapi/intl/title/title.blog",
			headers: { "Accept-Language": context.language },
		}).then((response) => {
			setTitle(response.data);
		});
	}, [context.language]);

	useEffect(() => {
		axios({
			method: "get",
			url: "http://localhost:8080/cprestapi/blogs",
		}).then((response) => {
			setBlogs(response.data);
		});
	}, []);

	return (
		<div>
			<div>
				<p className="fs-1">{title}</p>
			</div>
			<div>
				{blogs.map(function (data) {
					return (
						<div key={data.id}>
							<p className="fs-2">{data.title}</p>
							<p>Author: {data.userName}</p>
							<p>lastModified:{data.lastModified}</p>
							<p>{data.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Blog;

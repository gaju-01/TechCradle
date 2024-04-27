import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import ModifyBlog from "./ModifyBlog";
import Followers from "./Followers";
import Following from "./Following";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import Welcome from "../WelcomePage/Welcome";
const HomePage = (props) => {
	const params = useParams();
	const [Component, setComponent] = useState(<Welcome />);
	const navigate = useNavigate();
	const user = sessionStorage.getItem("user")
		? sessionStorage.getItem("user")
		: "";

	useEffect(() => {
		if (user !== "") {
			if (params.id === "createblog") {
				setComponent(<CreateBlog />);
			} else if (params.id === "blog") {
				setComponent(<Blog />);
			} else if (params.id === "modifyblog") {
				setComponent(<ModifyBlog />);
			} else if (params.id === "followers") {
				setComponent(<Followers />);
			} else if (params.id === "following") {
				setComponent(<Following />);
			} else if (params.id === "profile") {
				setComponent(<Profile />);
			}
		} else {
			navigate("/");
		}
	}, [user, params.id]);

	return (
		<>
			<NavBar
				currency={props.currency}
				language={props.language}
				setCurrency={props.setCurrency}
				setLang={props.setLang}
			/>
			{Component}
		</>
	);
};
export default HomePage;

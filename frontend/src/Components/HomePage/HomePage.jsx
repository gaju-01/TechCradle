import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import ModifyBlog from "./ModifyBlog";
import Followers from "./Followers";
import Following from "./Following";
import Profile from "./Profile";
import React, { useEffect, useState } from "react";
import Welcome from "../WelcomePage/Welcome";
import NotFound from "../Utilities/NotFound";

const HomePage = (props) => {
	const params = useParams();
	const navigate = useNavigate(); 
	const [isNotFound, setIsNotFound] = useState(false);
	const [Component, setComponent] = useState(<Welcome />);
	const user = sessionStorage.getItem("user") ? sessionStorage.getItem("user") : "";

	useEffect(() => {
		if (user) {
			if (params.id === "createblog") {
				setIsNotFound(false);
				setComponent(<CreateBlog />);
			} else if (params.id === "blog") {
				setIsNotFound(false);
				setComponent(<Blog />);
			} else if (params.id === "modifyblog") {
				setIsNotFound(false);
				setComponent(<ModifyBlog />);
			} else if (params.id === "followers") {
				setIsNotFound(false);
				setComponent(<Followers />);
			} else if (params.id === "following") {
				setIsNotFound(false);
				setComponent(<Following />);
			} else if (params.id === "profile") {
				setIsNotFound(false);
				setComponent(<Profile />);
			} else {
				setIsNotFound(true);
				setComponent(<NotFound />);
			}
		} else {
			setIsNotFound(false);
			navigate("/");
		}
	}, [user, params.id]);

	return (
		<>
			{!isNotFound && <NavBar currency={props.currency} language={props.language} setCurrency={props.setCurrency} setLang={props.setLang} />}
			{Component}
		</>
	);
};
export default HomePage;

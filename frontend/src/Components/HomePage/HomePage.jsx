import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Compiler from "./Compiler";
import ModifyBlog from "./ModifyBlog";

const HomePage = () => {
	const params = useParams();

	let Component = "Page Not Found";
	if (params.id === "createblog") {
		Component = <CreateBlog />;
	} else if (params.id === "compiler") {
		Component = <Compiler />;
	} else if (params.id === "blog") {
		Component = <Blog />;
	} else if (params.id === "modifyblog") {
		Component = <ModifyBlog />;
	}

	return (
		<>
			<NavBar />
			{Component}
		</>
	);
};
export default HomePage;

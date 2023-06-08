import { Routes, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Compiler from "./Compiler";

const HomePage = () => {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/blog" element={<Blog />} />
				<Route path="/createblog" element={<CreateBlog />} />
				<Route path="/compiler" element={<Compiler />} />
			</Routes>
		</>
	);
};
export default HomePage;

import { Link } from "react-router-dom";
const NavBar = () => {
	return (
		<>
			<nav className="navbar bg-body-tertiary">
				<div className="dropdown">
					<button
						className="btn btn-secondary dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Select Here
					</button>
					<ul className="dropdown-menu">
						<li>
							<Link className="dropdown-item" to="blog">
								Blogs
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="createblog">
								Create Blogs
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="compiler">
								Compiler
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default NavBar;

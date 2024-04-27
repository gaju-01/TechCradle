import { useContext, useEffect, useState } from "react";
import Context from "../ContextProvider/Context";
import Blog from "./Blog";
import axios from "axios";

const Profile = () => {
	const context = useContext(Context);
	const [src, setSrc] = useState("");
	const [message, setMessage] = useState("");
	const email = sessionStorage.getItem("email")
		? sessionStorage.getItem("email")
		: "";
	const user = sessionStorage.getItem("user")
		? sessionStorage.getItem("user")
		: "";

	const ppHandler = (e) => {
		let profilePic = e.target.files[0];
		const formData = new FormData();
		formData.append("profilePic", profilePic);
		profilePic = formData.get("profilePic");
		axios
			.post(`${context.serverURL}/cprestapi/uploadPic`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
				},
				params: {
					userName: user,
				},
			})
			.then((resp) => {
				setSrc(URL.createObjectURL(profilePic));
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	};

	const deleteProfilePic = () => {
		axios
			.delete(`${context.serverURL}/cprestapi/deletePic`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
				},
				params: {
					userName: user,
				},
			})
			.then((resp) => {
				setSrc("");
			})
			.catch((resp) => {
				setMessage("Error fetching data, try again");
			});
	};

	useEffect(() => {
		if (user) {
			axios
				.get(`${context.serverURL}/cprestapi/getPic`, {
					responseType: "arraybuffer",
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
					},
					params: {
						userName: user,
					},
				})
				.then((resp) => {
					if (resp.data.byteLength !== 0) {
						const blob = new Blob([resp.data]);
						const url = URL.createObjectURL(blob);
						setSrc(url);
					}
				})
				.catch((resp) => {
					setMessage("Error fetching data, try again");
				});
		}
	}, [user, context.serverURL]);

	return (
		<div>
			<div>
				{src && (
					<div>
						<img
							src={src}
							style={{ borderRadius: "50%", width: "5rem", height: "5rem" }}
							alt="error"
						/>
						<button
							type="submit"
							className="btn btn-danger"
							onClick={deleteProfilePic}
						>
							delete
						</button>
						<input type="file" onChange={ppHandler} />
					</div>
				)}
				{!src && (
					<div>
						<button
							style={{
								borderRadius: "50%",
								backgroundColor: "skyblue",
								width: "6rem",
								height: "6rem",
								color: "white",
								fontSize: "60px",
							}}
						>
							{user.slice(0, 1).toUpperCase()}
						</button>
						<button
							type="submit"
							className="btn btn-danger"
							onClick={deleteProfilePic}
						>
							delete
						</button>
						<input type="file" onChange={ppHandler} />
					</div>
				)}
				<p style={{ color: "red" }}>{message}</p>
				<div>
					<p>user: {user}</p>
					<p>email: {email}</p>
				</div>
			</div>
			<hr></hr>
			<Blog author={user} />
		</div>
	);
};

export default Profile;

import { useContext, useEffect, useState } from "react";
import Context from "../ContextProvider/Context";
import Blog from "./Blog";
import axios from "axios";

const Profile = () => {
	const context = useContext(Context);
	const [src, setSrc] = useState("");

	const ppHandler = (e) => {
		let profilePic = e.target.files[0];
		const formData = new FormData();
		formData.append("profilePic", profilePic);
		profilePic = formData.get("profilePic");
		axios
			.post(`${context.serverURL}/cprestapi/uploadPic`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: "Basic " + window.btoa("user:pass"),
				},
				params: {
					userName: context.user,
				},
			})
			.then((resp) => {
				setSrc(URL.createObjectURL(profilePic));
			})
			.catch((e) => {});
	};

	const deleteProfilePic = () => {
		axios
			.delete(`${context.serverURL}/cprestapi/deletePic`, {
				headers: {
					Authorization: "Basic " + window.btoa("user:pass"),
				},
				params: {
					userName: context.user,
				},
			})
			.then((resp) => {
				setSrc("");
			})
			.catch((e) => {});
	};
	useEffect(() => {
		const userName = sessionStorage.getItem("userName");
		const email = sessionStorage.getItem("email");
		const currency = sessionStorage.getItem("currency");
		const language = sessionStorage.getItem("language");
		context.setUser(userName);
		context.setEmail(email);
		context.setCurrency(currency);
		context.setLanguage(language);
	}, []);

	useEffect(() => {
		if (context.user) {
			axios
				.get(`${context.serverURL}/cprestapi/getPic`, {
					responseType: "arraybuffer",
					headers: {
						Authorization: "Basic " + window.btoa("user:pass"),
					},
					params: {
						userName: context.user,
					},
				})
				.then((resp) => {
					if (resp.data.byteLength !== 0) {
						const blob = new Blob([resp.data]);
						const url = URL.createObjectURL(blob);
						setSrc(url);
					}
				})
				.catch((e) => {});
		}
	}, [context.user, context.serverURL]);

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
							{context.user.slice(0, 1).toUpperCase()}
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
				<div>
					<p>user: {context.user}</p>
					<p>email: {context.email}</p>
				</div>
			</div>
			<hr></hr>
			<Blog author={context.user} />
		</div>
	);
};

export default Profile;

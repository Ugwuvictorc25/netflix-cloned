import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { logIn, error } = UserAuth();
	const navigate = useNavigate();
	// const [error, setError] = useState("");

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	setError("");

	// 	try {
	// 		 await logIn(email, password);
	// 		navigate("/");
	// 	} catch (e) {
	// 		setError(e.message);
	// 	}
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		await logIn(email, password);
		navigate("/");
	};

	return (
		<div>
			<div className="w-full h-screen">
				<img className="hidden sm:block absolute h-full w-full  object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/c588689b-4e92-4c3e-9449-d29f8e1fa75a/NG-en-20240610-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="/" />
				<div className="fixed bg-black/60 left-0 top-0 w-full h-screen"></div>
				<div className="fixed w-full px-4 py-24 z-50">
					<div className="max-w-[430px] h-[500px] mx-auto bg-black/75 text-white">
						<div className="max-w-[320px] mx-auto py-16">
							<h1 className="text-3xl font-bold">Sign In </h1>
							{error ? <p className="text-sm bg-red-400 my-2 p-2">{error}</p> : null}
							<form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
								<input onChange={(e) => setEmail(e.target.value)} className="p-3 my-2 bg-gray-700 rounded" type="email" placeholder="Email" autoComplete="email " />
								<input onChange={(e) => setPassword(e.target.value)} className="p-3 my-2 bg-gray-700 rounded" type="text" placeholder="Password" autoComplete="current-password" />
								<button className="bg-red-600 py-3 my-6  rounded font-bold">Sign In</button>
								<div className="flex justify-between text-gray-500 text-sm items-center">
									<p>
										<input type="checkbox" className="mr-2" />
										Remember me
									</p>
									<p>Need Help?</p>
								</div>
								<p className="py-4 text-gray-500">
									New to Netflix{" "}
									<span className="text-white">
										<Link to="/signup">Sign Up</Link>
									</span>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

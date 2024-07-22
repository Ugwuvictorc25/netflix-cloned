import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { signUp } = UserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		alert(error);
		setError("");

		try {
			await signUp(email, password);
			navigate("/");
		} catch (e) {
			setError(e.message);
			console.log(e);
			console.log(e.message);
		}
	};

	return (
		<>
			<div className="w-full h-screen">
				<img className="hidden sm:block absolute h-full w-full  object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/c588689b-4e92-4c3e-9449-d29f8e1fa75a/NG-en-20240610-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="/" />
				<div className="fixed bg-black/60 left-0 top-0 w-full h-screen"></div>
				<div className="fixed w-full px-4 py-24 z-50">
					<div className="max-w-[430px] h-[500px] mx-auto bg-black/75 text-white">
						<div className="max-w-[320px] mx-auto py-16">
							<h1 className="text-3xl font-bold">Sign Up</h1>
							{error ? <p className="text-sm bg-red-400 my-2 p-2">{error}</p> : null}

							<form className="w-full flex flex-col py-4" onSubmit={handleSubmit}>
								<input className="p-3 my-2 bg-gray-700 rounded" type="email" placeholder="Email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
								<input className="p-3 my-2 bg-gray-700 rounded" type="text" placeholder="Password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
								<button className="bg-red-600 py-3 my-6  rounded font-bold" type="submit">
									Sign Up
								</button>
								<div className="flex justify-between text-gray-500 text-sm items-center">
									<p>
										<input type="checkbox" className="mr-2" />
										Remember me
									</p>
									<p>Need Help?</p>
								</div>
								<p className="py-4 text-gray-500">
									Already subscribed to Netflix
									<span className="text-white">
										<Link to="/login">Sign In</Link>
									</span>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;

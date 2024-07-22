import React from "react";
import SavedShows from "../components/SavedShows";

const Account = () => {
	return (
		<>
			<div className="w-full  text-white">
				<img className=" h-[400px] w-full  object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/c588689b-4e92-4c3e-9449-d29f8e1fa75a/NG-en-20240610-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="/" />
				<div className="bg-black/60 fixed top-0 h-[550px] w-full  left-0"></div>
				<div className="absolute  top-[20%] w-full p-4 md:p-8">
					<h1 className="text-3xl md:text-5xl fonnt-bold">My Show</h1>
				</div>
			</div>
			<SavedShows />
		</>
	);
};

export default Account;

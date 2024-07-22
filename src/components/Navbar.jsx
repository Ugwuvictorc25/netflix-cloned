import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();

	const logoutHandler = async () => {
		try {
			logOut();
			navigate("/");
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<div className="flex item-center justify-between z-[100] absolute p-3 w-full">
			<Link to="/">
				<h1 className="text-red-600 text-4xl font-bold cursor-pointer">NETFLIX</h1>
			</Link>
			{user?.uid ? (
				<div>
					<Link to="/account">
						<button className="text-white pr-4">Account</button>
					</Link>

					<button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white" onClick={logoutHandler}>
						Logout
					</button>
				</div>
			) : (
				<div>
					<Link to="/login">
						<button className="text-white pr-4">Sign In</button>
					</Link>

					<Link to="/signup">
						<button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">Sign Up</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;

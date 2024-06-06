import logo from "../img/images.png";

const LoginHeader = () => {
	return (
		<nav className="login-nav">
			<div className="nav-head">
				<h2>e-practice</h2>
				<h1>
					<span className="welcom_to">Welcome to</span> Mock e-testing
				</h1>
				<div className="sac-div"></div>
			</div>
			<div className="logo-cont">
				<img src={logo} alt="logo" className="logo-img" />
			</div>
		</nav>
	);
};

export default LoginHeader;

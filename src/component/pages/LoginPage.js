import { Link } from "react-router-dom";
import unknownpix from "../../img/unknown.jpg";
import Footer from "../Footer";
import LoginHeader from "../LoginHeader";
import Instruction from "../Instruction";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [showInstruction, setShowInstruction] = useState(false);
	const [timeYaer, setTimeYear] = useState({ time: "", year: "" });
	const [showTimeYaer, setShowTimeYear] = useState({ time: false, year: false });

	const {
		user: { name, email, reg },
		questionChioce: { category },
		setMoment,
	} = useGlobalContext();

	const navigate = useNavigate();

	const { time, year } = timeYaer;
	const { time: showTime, year: showYear } = showTimeYaer;

	const timeYearHandler = (e) => {
		setTimeYear((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const resetLoginTimeYear = () => {
		setShowInstruction(false);

		setTimeYear({ time: "", year: "" });
	};

	useEffect(() => {
		if (timeYaer.time !== "" && timeYaer.year !== "") {
			setShowInstruction(true);
			setMoment(timeYaer);
		}
	}, [timeYaer, setMoment]);

	const showTimeHandler = () => {
		setShowTimeYear((prev) => {
			return { ...prev, time: true };
		});
	};

	useEffect(() => {
		if (time !== "") {
			setShowTimeYear((prev) => {
				return { ...prev, year: true };
			});
		}
	}, [time]);

	const logoutHandler = () => {
		navigate("/");
	};

	return (
		<div className="login-container">
			<LoginHeader />

			{!showInstruction && (
				<main className="main">
					<div className="main-links">
						<Link to="/">Home</Link>
						<Link to="/login">Examination</Link>
					</div>

					<div className="main-content">
						<div className="exam-info-content">
							<div className="reg-cont">
								<img src={unknownpix} alt="unknownpix" />
								<span>Registration No</span>
								<span>{reg}</span>
								<button onClick={logoutHandler}>Log Out</button>
							</div>
							<h2>Available Exam</h2>
							<div className="exam-datail-content">
								<div className="head">
									<span>#</span>
									<span>Exam Code</span>
									<span>Subject</span>
								</div>
								<div className="mid">
									<span>1</span>
									<span>FTCD</span>
									<span>{category}</span>
								</div>
								<div className="foot">
									<button onClick={showTimeHandler}>Start Exam</button>
									{showTime && (
										<select onChange={timeYearHandler} name="time" value={time}>
											<option value="">Set Time</option>
											<option value="5">5 min</option>
											<option value="15">15 min</option>
											<option value="30">30 min</option>
										</select>
									)}

									{showYear && (
										<select onChange={timeYearHandler} name="year" value={year}>
											<option value="">Select Year</option>
											<option value="2021">2021</option>
											<option value="2022">2022</option>
											<option value="2023">2023</option>
										</select>
									)}
								</div>
							</div>
						</div>

						<div className="aside-info-content">
							<img src={unknownpix} alt="unknown-pix" />
							<h3>{name}</h3>
							<h3>{reg}</h3>
							<h3>{email}</h3>
							<button onClick={logoutHandler}>Log Out</button>
						</div>
					</div>
				</main>
			)}
			{showInstruction && <Instruction resetLoginTimeYear={resetLoginTimeYear} />}

			<Footer />
		</div>
	);
};

export default LoginPage;

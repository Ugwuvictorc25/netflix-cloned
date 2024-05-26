import LoginHeader from "../LoginHeader";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import unknownpix from "../../img/unknown.jpg";
import { useGlobalContext } from "../Context";

const ReviewPage = () => {
	const navigate = useNavigate();
	const [showNotification, setShowNoticeAlert] = useState(false);
	const {
		data,
		score,
		scoreSummation,
		user: { name, email, reg },
		questionChioce: { category },
	} = useGlobalContext();

	const month = new Date().getMonth();
	const year = new Date().getFullYear();
	const date = new Date().getDate();

	useEffect(() => {
		scoreSummation();
	}, []);

	const handlePrint = () => {
		window.print();
	};

	const logoutHandler = () => {
		navigate("/");
		window.location.reload();
	};

	return (
		<div className="review-page-cont login-container">
			<LoginHeader />
			{showNotification && (
				<div className="modal">
					<div className="alert-first">
						<h4>Notice</h4>
						<div className="message">
							<span>i</span>
							<h3>Review is not available at the moment</h3>
						</div>
						<div className="alert-btns">
							<button onClick={() => setShowNoticeAlert(false)}>Ok</button>
						</div>
					</div>
				</div>
			)}
			<div className="review-main">
				<div className="review-main-head">
					<div className="main-links">
						<Link to="/">Home</Link>
						<Link to="/exam">Result</Link>
					</div>
					<h2>Result Slip</h2>
					<h4>
						Date printed: {date < 10 ? "0" + date : date}/{month < 10 ? "0" + month : month}/{year}
					</h4>
				</div>
				<div className="candidate-info-cont">
					<div className="candidate-info">
						<h2>Candidate Details</h2>
						<div className="info">
							<span className="title">Canditate</span>
							<span className="value">{name}</span>
						</div>
						<div className="info">
							<span className="title">E-mail</span>
							<span className="value">{email}</span>
						</div>
						<div className="info">
							<span className="title">Registration No</span>
							<span className="value">{reg}</span>
						</div>
					</div>
					<div className="img-div">
						<img src={unknownpix} alt="unknownpix" />
						<p>{score < data.length / 2 ? "You Failed" : "You Passed"}</p>
					</div>
				</div>

				<div className="subject-info-cont">
					<div className="subject-head">
						<h3>Subject</h3>
						<h3>Score</h3>
						<h3>Aggregate</h3>
					</div>

					<div className="subject-info">
						<p>{category}</p>
						<p>
							{score} out of {data.length}
						</p>
						<p>{Math.round((score / data.length) * 100)}%</p>
					</div>
				</div>

				<div className="review-main-foot">
					<div className="btn-cont">
						<button className="print-slip" onClick={handlePrint}>
							Print Result
						</button>
						<button className="review" onClick={() => setShowNoticeAlert(true)}>
							REVIEW
						</button>
						<button className="log-out" onClick={logoutHandler}>
							Log Out
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ReviewPage;

import { useEffect, useRef, useState } from "react";
import img from "../../img/images.png";
import unknownpix from "../../img/unknown.jpg";
import { useNavigate } from "react-router-dom";
import SecondAlert from "../SecondAlert";
import { useGlobalContext } from "../Context";

const StartPage = () => {
	const [showStart, setShowStart] = useState(true);
	const [showNoticeAlert, setShowNoticeAlert] = useState(false);
	const [showFormAlert, setShowFormAlert] = useState(false);
	const [showForms, setShowform] = useState(false);
	const userRegRef = useRef("");
	const [notFound, setNotFound] = useState(false);
	const [errorText, setErrorText] = useState(false);

	const {
		user: { reg },
	} = useGlobalContext();
	const navigate = useNavigate();

	const startHandler = () => {
		setShowStart(false);
	};

	useEffect(() => {
		if (notFound) {
			setTimeout(() => {
				setNotFound(false);
				setErrorText(true);
			}, 2000);
		}
	}, [notFound]);

	const showSecondAlertHandle = () => {
		setShowNoticeAlert(false);
		setShowFormAlert(true);
	};

	useEffect(() => {
		if (showStart === false) {
			setTimeout(() => {
				setShowNoticeAlert(true);
			}, 500);
		}
	}, [showStart]);

	const loginHandle = () => {
		if (!reg) {
			setNotFound(true);
		}

		if (userRegRef.current.value === reg) {
			navigate("/login");
		} else {
			setNotFound(true);
		}
	};

	return (
		<div className="start-page-cont">
			{showStart && (
				<div className="start-cont">
					<div className="start">
						<img src={img} alt="exam-pix" />
						<button onClick={startHandler} type="button">
							Start
						</button>
					</div>
				</div>
			)}

			{!showStart && (
				<div className="login">
					<div className="login-head">
						<h2>e-practice</h2>
						<h1>
							<span className="welcom_to">Welcome to</span> Mock e-testing
						</h1>
					</div>
					<main className="login-main">
						<img src={img} alt="exam-pix" />
						<div className="login-form">
							<div className="img-cont">
								<img src={unknownpix} alt="unknown-pix" onClick={() => setShowNoticeAlert(true)} />
								{errorText && <p className="p-error-text">You can click this icon to register as New User</p>}
							</div>
							<div className="input-form">
								<label>Enter your Registration No here</label>
								<input ref={userRegRef} />
								{notFound && <p className="p-error-record">No record Found</p>}
							</div>
							<button onClick={loginHandle}>Login</button>
						</div>
					</main>
					{showNoticeAlert && (
						<div className="modal">
							<div className="alert-first">
								<h4>Notice</h4>
								<div className="message">
									<span>i</span>
									<h3>Have you registered your subject before</h3>
								</div>
								<div className="alert-btns">
									<button onClick={() => setShowNoticeAlert(false)}>Yes</button>
									<button onClick={showSecondAlertHandle}>No</button>
								</div>
							</div>
						</div>
					)}
					{showFormAlert && <SecondAlert showForms={showForms} setShowFormAlert={setShowFormAlert} setShowform={setShowform} />}
				</div>
			)}
		</div>
	);
};

export default StartPage;

import unknownpix from "../img/unknown.jpg";
import useInput from "./use-input";
import { useGlobalContext } from "./Context";
// import useHttp from "./use-https";
import Loading from "./Loading";

import useHttp from "./use-https";

const SecondAlert = ({ showForms, setShowFormAlert, setShowform }) => {
	const { addUser, addExamInfo, questionChioce } = useGlobalContext();

	const { value: enteredName, hasError: nameError, valueChangeHandler: nameChangeHandler, inputBlurHandler: nameBlurHandler, isValid: nameIsvalid, reset: nameReset } = useInput((value) => value.trim() !== "");
	const { value: emailValue, hasError: emailError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlureHandler, reset: emailReset, isValid: emailIsValid } = useInput((value) => value.trim().includes("@"));
	const { value: regValue, hasError: regError, valueChangeHandler: regChangeHandler, inputBlurHandler: regBlurHandler, isValid: regIsValid, reset: regReset } = useInput((value) => value.trim().length === 5);
	const formOneIsValid = nameIsvalid && emailIsValid && regIsValid;

	const { value: numberValue, hasError: numberError, valueChangeHandler: numberChangeHandler, inputBlurHandler: numberBlurHandler, isValid: numberIsValid } = useInput((value) => +value > 0);
	const { value: categoryValue, valueChangeHandler: categoryChangeHandler, inputBlurHandler: categoryBlurHandler, isValid: categoryIsValid } = useInput((value) => value.trim() !== "");
	const { value: deficultyValue, valueChangeHandler: deficultyChangeHandler, inputBlurHandler: deficultyBlurHandler, isValid: deficultyIsvalid } = useInput((value) => value.trim() !== "");
	const formSecondIsValid = numberIsValid && categoryIsValid && deficultyIsvalid;
	const table = {
		sports: 21,
		history: 23,
		politics: 24,
	};
	const url = `https://opentdb.com/api.php?amount=${numberValue}&category=${table[categoryValue]}&difficulty=${deficultyValue}`;
	// const url = "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
	const {
		fetchHttps,
		loading,
		waiting,
		error: { value, message },
	} = useHttp(url);

	const cancelShowAlertHandle = () => {
		setShowFormAlert(false);
		setShowform(false);
		addUser({});
	};

	const firstFormHandler = (e) => {
		e.preventDefault();

		if (formOneIsValid) {
			setShowform(true);
			addUser({ name: enteredName, reg: regValue, email: emailValue });
		}
	};

	const lastForrmHandler = (e) => {
		e.preventDefault();

		if (formSecondIsValid) {
			// setShowFormAlert(true);
			addExamInfo({ category: categoryValue, deficulty: deficultyValue, number: numberValue });
			setShowform(true);

			fetchHttps();
		}
	};

	if (waiting === false) {
		setShowFormAlert(false);
	}

	return (
		<div className="modal">
			{loading && <Loading />}
			<div className="alert-second">
				<header className="head">
					<h4>justclick CBT</h4>
					<button onClick={cancelShowAlertHandle}>X</button>
				</header>
				<div className="title">
					<h2>Session manager</h2>
					<img src={unknownpix} alt="unknown" />
				</div>

				<div className="forms-container">
					{!showForms && (
						<div className="test">
							<form className="info-form" onSubmit={(e) => firstFormHandler(e)}>
								<fieldset>
									<h3>Use any 5 degit for Registration No</h3>
									<legend>Personal Information</legend>
									<div className="form-control">
										<label htmlFor="name">Enter Full Name</label>
										<input onChange={nameChangeHandler} value={enteredName} onBlur={nameBlurHandler} id="name" type="text" autoComplete="off" required className={`${nameError && "error"}`} />
										{nameError && <p className="p-error">Please Enter a valid Name</p>}
									</div>

									<div className="form-control">
										<label htmlFor="reg">Enter Registration No</label>
										<input id="reg" type="text" autoComplete="off" onChange={regChangeHandler} value={regValue} onBlur={regBlurHandler} required />
										{regError && <p className="p-error">Please Enter a valid Name</p>}
									</div>

									<div className="form-control">
										<label htmlFor="email">Enter Email</label>
										<input id="email" onBlur={emailBlureHandler} type="text" onChange={emailChangeHandler} value={emailValue} autoComplete="off" required className={`${emailError && "error"}`} />
										{emailError && <p className="p-error">Please enter a valid E-mail</p>}
									</div>

									<button className="submit-info-btn" type="submit" disabled={!formOneIsValid}>
										Next
									</button>
								</fieldset>
							</form>
						</div>
					)}
					{showForms && (
						<div className="info">
							<form onSubmit={lastForrmHandler}>
								<fieldset>
									<legend>Exam setup</legend>
									<div className="form-control">
										<label htmlFor="name">Number of questions</label>
										<input id="name" type="number" min={10} max={50} onChange={numberChangeHandler} value={numberValue} onBlur={numberBlurHandler} autoComplete="off" required />
										{numberError && <p className="p-error">Please enter number</p>}
									</div>

									<div className="form-control">
										<label htmlFor="reg">Category</label>
										<select htmlFor="category" onBlur={categoryBlurHandler} onChange={categoryChangeHandler} value={categoryValue}>
											<option></option>
											<option value="sports">sports</option>
											<option value="politics">politics</option>
											<option value="history">history</option>
										</select>
									</div>

									<div className="form-control">
										<label htmlFor="reg">Deficulty</label>
										<select htmlFor="category" placeholder="select" onChange={deficultyChangeHandler} onBlur={deficultyBlurHandler} value={deficultyValue}>
											<option></option>
											<option value="easy">easy</option>
											<option value="medium">medium</option>
											<option value="hard">hard</option>
										</select>
									</div>
									{value && <p className="cant-gen">{message}</p>}

									<button className="submit-info-btn" type="submit" disabled={!formSecondIsValid}>
										Submit
									</button>
								</fieldset>
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SecondAlert;

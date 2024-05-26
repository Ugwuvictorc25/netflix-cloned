import Timer from "../Timer";
import React, { useEffect, useState } from "react";
import LoginHeader from "../LoginHeader";
import unknownPix from "../../img/unknown.jpg";
import { useGlobalContext } from "../Context";
import Button from "../Button.js";
import { useNavigate } from "react-router-dom";

const ExamPage = () => {
	const [alph, setAlph] = useState("");
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);

	const {
		data,
		index,
		user: { name, email },
		incdecIndex,
		shadeOption,
	} = useGlobalContext();

	const { question, option_pair, id, selected } = data[index];

	useEffect(() => {
		Object.entries(option_pair).forEach((item) => {
			if (alph === item[0]) {
				shadeOption(id, item[1]);
			}
		});
	}, [alph]);

	useEffect(() => {
		document.addEventListener("keypress", (e) => {
			e.preventDefault();
			setAlph(e.key);
		});
	}, [alph]);

	useEffect(() => {
		setAlph("");
	}, [index]);

	if (data.length === 0) {
		return;
	}

	const shadeOptionHandler = (id, option) => {
		shadeOption(id, option);
	};

	const submitExamHandler = () => {
		navigate("/review");
	};

	return (
		<div className="exam-page-cont login-container">
			<LoginHeader />
			{modal && (
				<div className="modal">
					<div className="modal-cont">
						<header>
							<span>Justclick e-practice</span>
							<span className="cancel" onClick={() => setModal(false)}>
								X
							</span>
						</header>
						<h2>NOTICE !</h2>
						<div className="exam-instruction">
							<p>-Submit: where where you can submit the examination (after you have answered all the questions)</p>
							<p>-NEXT: takes you to the next question when clicked</p>
							<p>-PREVIOUS: takes you to the previous question when clicked</p>
							<p>-QUICK REVIEW: where you can quickly navigate to the given question using the qustion number button</p>
							<p>
								-THE KEYBOARD: use the (A), (B), (c) and (D) letters to select the question options eg
								<br />
								(A) select option A (B) select option B (C) select option C.
							</p>
						</div>
					</div>
				</div>
			)}
			<div className="exam-head">
				<div className="candidate-info">
					<div className="info">
						<span className="title">Examination</span>
						<span className="value">Mock e-testing</span>
					</div>
					<div className="info">
						<span className="title">Canditate</span>
						<span className="value">{name}</span>
					</div>
					<div className="info">
						<span className="title">E-mail</span>
						<span className="value">{email}</span>
					</div>
				</div>
				<Timer />
				<div className="timer-info">
					<div className="img-cont">
						<img src={unknownPix} alt="unknownPix" />
					</div>
					<div className="button-cont">
						<button className="instruction" onClick={() => setModal(true)}>
							Instruction
						</button>
						<button className="submit" onClick={submitExamHandler}>
							Submit
						</button>
					</div>
				</div>
			</div>
			<div className="exam-main">
				<h3 className="question-index">Question {index + 1}</h3>
				<div className="exam-content">
					<h3 className="exam-question" dangerouslySetInnerHTML={{ __html: question }} />
					<div className="options">
						{Object.entries(option_pair).map((item, index) => {
							{
								/* {Object.entries(options[0]).map((item, index) => { */
							}
							return (
								<div className={`${selected === item[1] ? "colored option" : "option"}`} onClick={() => shadeOptionHandler(id, item[1])} key={index}>
									<span>({item[0]})</span> <span dangerouslySetInnerHTML={{ __html: item[1] }} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="next-prev-btn-cont">
				<button onClick={() => incdecIndex("dec")} disabled={index === 0}>
					Previous
				</button>
				<button onClick={() => incdecIndex("inc")} disabled={index === data.length - 1}>
					Next
				</button>
			</div>

			<Button />
		</div>
	);
};

export default ExamPage;

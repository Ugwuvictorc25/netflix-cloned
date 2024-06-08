import { useNavigate } from "react-router";

const Instruction = ({ resetLoginTimeYear }) => {
	const navigation = useNavigate();

	const continueHandler = () => {
		navigation("/exam");
	};

	const goBackHandler = () => {
		resetLoginTimeYear();
	};

	return (
		<div className="instruction-cont">
			<h1>Test Instruction</h1>
			<h2>Plaese take note of the following instruction</h2>
			<div className="during-exam-instruction-cont">
				<h3>During Examination:</h3>
				<div className="during-instruction">
					<p>-INSTRUCTION: where canditate are to check the instruction pertaining the examination</p>
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
			<div className="after-exam-instruction-cont">
				<h3>After Examination:</h3>
				<p>Immedietly the examamination is over, your result will be out and can also be printed</p>
			</div>
			<div className="button-cont">
				<button className="back" onClick={goBackHandler}>
					Back
				</button>
				<button onClick={continueHandler}>Continue</button>
			</div>
		</div>
	);
};

export default Instruction;

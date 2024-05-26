import { useGlobalContext } from "./Context";

const Question = () => {
	const { data: questions, index, colorBackground } = useGlobalContext();
	const { question, options, id, touch, selected } = questions[index];

	const clickHandler = (e, id, item) => {
		// let text;
		// if (e.target.nodeName === "SPAN") {
		// 	text = e.target.innerText;
		// } else {
		// 	text = e.target.innerText.split("").slice(1).join("");
		// }

		colorBackground(id, item);
	};

	return (
		<div className="question-cont">
			<h3>
				<span>{id}</span> {question}
			</h3>
			<div className="options">
				{Object.entries(options[0]).map((item, idx) => {
					return (
						// <div key={idx} className={`${touch && (selected === item[1] || selected === item[0]) ? "option-span-cont colored" : "option-span-cont"}`} onClick={(e) => clickHandler(e, id, item[1])}>
						<div key={idx} className={`${touch && (selected === item[1] || selected === item[0]) ? "option-span-cont colored" : "option-span-cont"}`} onClick={(e) => clickHandler(e, id, item[1])}>
							<span>{item[0]}</span>
							<span>{item[1]}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Question;

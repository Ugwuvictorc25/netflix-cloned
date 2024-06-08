import { useState } from "react";
import { useGlobalContext } from "./Context";

const Button = () => {
	const { data, changeIndex, index } = useGlobalContext();

	if (data.length === 0) {
		return;
	}

	const buttonClickHandle = (idx) => {
		changeIndex(idx);
	};

	return (
		<div className="button-container">
			{data.map((item, idx) => (
				<button key={idx} onClick={() => buttonClickHandle(idx)} className={`${data[idx].touch ? "button colored" : " button"} ${index === idx && "borded"}`}>
					{idx + 1}
				</button>
			))}
		</div>
	);
};

export default Button;

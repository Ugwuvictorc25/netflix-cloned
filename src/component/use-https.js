import axios from "axios";
import { useState } from "react";
import { useGlobalContext } from "./Context";
import { Navigate, useNavigate } from "react-router";

const useHttp = (url) => {
	const [waiting, setWaiting] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ errorValue: false, Message: "" });
	const { addQuestion } = useGlobalContext();
	const navigate = useNavigate();

	const fetchHttps = async () => {
		setLoading(true);
		setWaiting(true);
		const response = await axios(url).catch((err) => {
			setError({ value: true, message: err.message });
			setLoading(false);
		});

		if (response) {
			const data = response.data.results;

			if (data.length > 0) {
				data.forEach((item, idx) => {
					const alph = ["A", "B", "C", "D"];

					item["id"] = idx;
					item["selected"] = "";
					item["checked"] = false;
					item["options"] = [...item.incorrect_answers];

					const random = Math.floor(Math.random() * item["options"].length);

					item["options"].push(item["options"][random]);

					item["options"][random] = item.correct_answer;

					const obj = {};
					item["options"].forEach((al, idx) => {
						return (obj[alph[idx]] = al);
					});

					item["option_pair"] = obj;
					setWaiting(false);
					setError({ value: true });
				});
				addQuestion(data);
				setLoading(false);
				setWaiting(false);
				setError({ value: true, message: `Can't Generate Questions, Please Try Other Different Options` });
			} else {
				setWaiting(true);
				setLoading(false);
				setError({ value: true, message: `Can't Generate Questions, Please Try Other Different Options` });
			}
		}
	};

	return { fetchHttps, loading, waiting, error };
};

export default useHttp;

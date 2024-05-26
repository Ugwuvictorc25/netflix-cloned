import { createContext, useReducer, useContext } from "react";
import data from "./data";
import questionReducer from "./reducer";

const question = createContext({
	data: [],
	index: 0,
	score: 0,
	moment: {},
	changeIndex: () => {},
	colorBackground: () => {},
	user: {},
	addUser: () => {},
	questionChioce: {},
	addExamInfo: () => {},
	addQuestion: () => {},
	incdecIndex: () => {},
	shadeOption: () => {},
	scoreSummation: () => {},
	setMoment: () => {},
});

const defaulState = {
	data: data,
	index: 0,
	score: 0,
	changeIndex: () => {},
	moment: {},
	colorBackground: () => {},
	user: {},
	addUser: () => {},
	questionChioce: {},
	addExamInfo: () => {},
	addQuestion: () => {},
	incdecIndex: () => {},
	shadeOption: () => {},
	scoreSummation: () => {},
	setMoment: () => {},
};

export const QuestionProvider = (props) => {
	const [questionState, dispatchFunction] = useReducer(questionReducer, defaulState);

	const changeIndexHandle = (numb) => {
		dispatchFunction({ type: "CHANGE_INDEX", number: numb });
	};

	const colorBackgroundHandle = (id, text) => {
		dispatchFunction({ type: "COLOR_BG", payload: { id: id, text: text } });
	};

	const addUserHandler = (user) => {
		dispatchFunction({ type: "USER_DETAIL", user: user });
	};

	const addExamInfoHandler = (examInfo) => {
		dispatchFunction({ type: "ADD_EXAMINFO", examInfo });
	};

	const addExamQuestion = (examData) => {
		dispatchFunction({ type: "ADD_EXAMQUESTION", examData });
	};

	const incdecIndexHandler = (value) => {
		dispatchFunction({ type: "INCDEC", value });
	};

	const shadeOptionHandler = (id, Option) => {
		dispatchFunction({ type: "SHADE", payload: { id, Option } });
	};

	const scoreSummationHandler = () => {
		dispatchFunction({ type: "SUM_SCORE" });
	};

	const setMomentHandler = (moment) => {
		dispatchFunction({ type: "SETMOMENT", moment: moment });
	};

	const contextCtx = {
		data: questionState.data,
		index: questionState.index,
		score: questionState.score,
		changeIndex: changeIndexHandle,
		moment: questionState.moment,
		questionChioce: questionState.questionChioce,
		user: questionState.user,
		colorBackground: colorBackgroundHandle,
		addUser: addUserHandler,
		addExamInfo: addExamInfoHandler,
		addQuestion: addExamQuestion,
		incdecIndex: incdecIndexHandler,
		shadeOption: shadeOptionHandler,
		scoreSummation: scoreSummationHandler,
		setMoment: setMomentHandler,
	};

	return <question.Provider value={contextCtx}>{props.children}</question.Provider>;
};

export const useGlobalContext = () => {
	return useContext(question);
};

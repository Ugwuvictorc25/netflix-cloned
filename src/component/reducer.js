const questionReducer = (state, action) => {
	if (action.type === "CHANGE_INDEX") {
		return { ...state, index: action.number };
	}

	if (action.type === "COLOR_BG") {
		return { ...state, data: state.data.map((item) => (item.id === action.payload.id ? { ...item, touch: true, selected: action.payload.text } : { ...item })) };
	}

	if (action.type === "USER_DETAIL") {
		return { ...state, user: action.user };
	}

	if (action.type === "ADD_EXAMINFO") {
		return { ...state, questionChioce: action.examInfo };
	}

	if (action.type === "ADD_EXAMQUESTION") {
		return { ...state, data: action.examData };
	}

	if (action.type === "INCDEC") {
		if (action.value === "dec") {
			return { ...state, index: state.index === 0 ? state.data.length - 1 : state.index - 1 };
		}

		if (action.value === "inc") {
			return { ...state, index: state.index + 1 > state.data.length - 1 ? 0 : state.index + 1 };
		}
	}

	if (action.type === "SHADE") {
		return { ...state, data: state.data.map((item) => (item.id === action.payload.id ? { ...item, touch: true, selected: action.payload.Option } : item)) };
	}

	if (action.type === "SUM_SCORE") {
		return {
			...state,
			score: state.data.filter((item) => item.correct_answer === item.selected).length,
		};
	}

	if (action.type === "SETMOMENT") {
		return { ...state, moment: action.moment };
	}

	return state;
};

export default questionReducer;

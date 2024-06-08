import StartPage from "./component/pages/StartPage";
import { Route, Routes } from "react-router";
import LoginPage from "./component/pages/LoginPage";
import ExamPage from "./component/pages/ExamPage";
import ReviewPage from "./component/pages/ReviewPage";

const App = () => {
	return (
		<Routes>
			{/* {waiting && <Route element={<StartPage loading={loading} />} path="/" />}
			{!waiting && <Route element={<LoginPage />} path="/login" />}
			{!waiting && <Route element={<ExamPage />} path="/exam" />}
			{!waiting && <Route element={<ReviewPage />} path="/review" />} */}
			<Route element={<StartPage />} path="/" />
			<Route element={<LoginPage />} path="/login" />
			<Route element={<ExamPage />} path="/exam" />
			<Route element={<ReviewPage />} path="/review" />
		</Routes>
	);
};

export default App;

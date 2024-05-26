import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { QuestionProvider } from "./component/Context";
import { QuestionProvider } from "./component/Context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QuestionProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</QuestionProvider>
	</React.StrictMode>
);

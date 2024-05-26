import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";

export const DUMMY_QUOTES = [
	{ id: "q1", author: "Max", text: "Learning React is fun" },
	{ id: "q2", author: "Victor", text: "Learning React is great" },
];

const AllQuotes = () => {
	const { sendRequest, error, data: loadedQuotes, status } = useHttp(getAllQuotes, true);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	if (status === "pending") {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <div className="centered focused">{error}</div>;
	}

	if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
		return <NoQuotesFound />;
	}

	return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;

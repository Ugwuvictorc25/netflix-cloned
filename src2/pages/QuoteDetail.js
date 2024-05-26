import { Fragment, useEffect } from "react";
import { useParams, Route, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { Link } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
	const { quoteId } = useParams();
	const match = useRouteMatch();
	const { sendRequest, error, data: loadedQuotes, status } = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(quoteId);
	}, [quoteId, sendRequest]);

	if (status === "pending") {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className="centered focused">{error}</p>;
	}

	if (!loadedQuotes.text) {
		return <p className="centered">Quote not found</p>;
	}

	return (
		<Fragment>
			<HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
			<div className="centered">
				<Route path={match.path} exact>
					<Link className="btn--flat" to={`${match.url}/comments`}>
						Load Comments
					</Link>
				</Route>
			</div>
			<Route path={`${match.path}/comments`}>
				<Comments  quoteId={quoteId}/>
			</Route>
		</Fragment>
	);
};

export default QuoteDetail;

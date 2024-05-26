import { useCallback, useEffect, useState } from "react";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = (props) => {
	const [isAddingComment, setIsAddingComment] = useState(false);
	const { quoteId } = useParams();

	const { sendRequest, status, data: loadedCommments } = useHttp(getAllComments);

	useEffect(() => {
		sendRequest(quoteId);
	}, [quoteId, sendRequest]);

	const startAddCommentHandler = () => {
		setIsAddingComment(true);
	};

	const addedCommentHandler = useCallback(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	let comment;

	if (status === "pending") {
		comment = (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}

	if (status === "completed" && (loadedCommments || loadedCommments.length) > 0) {
		comment = <CommentsList comment={loadedCommments} />;
	}

	if (status === "completed" && (!loadedCommments || loadedCommments.length) > 0) {
		comment = <p className="centered">No comment were added yet</p>;
	}

	return (
		<section className={classes.comments}>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className="btn" onClick={startAddCommentHandler}>
					Add a Comment
				</button>
			)}
			{isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler} />}
			{comment}
		</section>
	);
};

export default Comments;

import React from "react";
import { useParams, Link, Route } from "react-router-dom";

import classes from "./DetailPage.module.css";

const DetailPage = (props) => {
	const movieDetails = getLocalStorage();

	function addToLocalStorage(title, openingText, language) {
		const movieDetails = { title, openingText, language };
		localStorage.setItem("list", JSON.stringify(movieDetails));
	}

	function getLocalStorage() {
		return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
	}

	const params = useParams();

	const selectedQoat = props.movies.find((qoate) => qoate.id === params.id);
	let text = `${selectedQoat.openingText}`;

	addToLocalStorage(selectedQoat.title, selectedQoat.openingText, selectedQoat.language);

	return (
		<li className={classes.movie}>
			<h2>{selectedQoat.title}</h2>
			<div className="img">
				<img src={`${selectedQoat.image}`} />
			</div>

			<div>
				<h3>Summary</h3>
				<div dangerouslySetInnerHTML={{ __html: text }} />
			</div>

			<Link to={`/movie/${params.id}/form`} className="show-btn">
				Show form
			</Link>

			<Route path={`/movie/${params.id}/form`}>
				<div>
					<form>
						<div className={classes.control}>
							<label htmlFor="title">Title</label>
							<input type="text" id="title" defaultValue={`${movieDetails.title}`} />
						</div>
						<div className={classes.control}>
							<label htmlFor="opening-text">Opening Text</label>
							<textarea rows="5" id="opening-text" defaultValue={`${movieDetails.openingText}`}></textarea>
						</div>
						<div className={classes.control}>
							<label htmlFor="date">language</label>
							<input type="text" id="date" defaultValue={`${movieDetails.language}`} />
						</div>
					</form>
				</div>
			</Route>
		</li>
	);
};

export default DetailPage;

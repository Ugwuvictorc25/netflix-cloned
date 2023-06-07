import React from "react";
import { Link } from "react-router-dom";

import classes from "./Movie.module.css";

const Movie = (props) => {
	let text = `${props.openingText}`;

	return (
		<li className={classes.movie}>
			<div>
				<h3>Title</h3>
				<h2>{props.title}</h2>
			</div>
			<div>
				<h3>Summary</h3>
				<div dangerouslySetInnerHTML={{ __html: text }} />
			</div>
			<Link to={`/movie/${props.id}`} className="show-btn">
				Show More
			</Link>
		</li>
	);
};

export default Movie;

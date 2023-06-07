import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, Link } from "react-router-dom";

import MoviesList from "./components/MoviesList";
import "./App.css";
import DetailPage from "./components/pages/DetailPage";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("https://api.tvmaze.com/search/shows?q=all");

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();

			const loadedMovies = [];

			console.log(data);
			for (const key in data) {
				loadedMovies.push({
					id: key,
					title: data[key].show["name"],
					openingText: data[key].show["summary"],
					image: data[key].show.image["original"],
					language: data[key].show["language"],
				});
			}

			setMovies(loadedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	let content = <p>Found no movies.</p>;
	let content2 = <p>Found no movies.</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
		content2 = <DetailPage movies={movies} />;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
			<Link to="/movie" className="btn">
				<button onClick={fetchMoviesHandler}>Fetch All Movies</button>
			</Link>
			<Switch>
				<Route path="/movie" exact>
					<section>{content}</section>
				</Route>
				<Route path="/movie/:id">
					<section>{content2}</section>
				</Route>
			</Switch>
		</React.Fragment>
	);
}

export default App;

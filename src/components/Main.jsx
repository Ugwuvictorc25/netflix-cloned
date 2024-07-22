import { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";

const Main = () => {
	const [movies, setMovies] = useState([]);
	const movie = movies[Math.floor(Math.random() * movies.length)];

	useEffect(() => {
		axios.get(requests.requestPopular).then((response) => setMovies(response.data.results));
	}, []);

	return (
		<div className="w-full h-[550px] text-white">
			<div className="w-full h-full">
				<div className="absolute h-[550px] bg-gradient-to-r from-black"></div>
				<img className="w-full h-full object-cover " src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
			</div>
			<div className="w-full absolute top-[20%]  p-4 md:p-8">
				<div className="my-4">
					<h1 className="text-3xl md:text-5xl font-bold my-4">{movie?.title}</h1>
					<button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">Play</button>
					<button className="border text-white py-2 px-5 ml-4 border-gray-300">Watch Later</button>
				</div>
				<p className="text-gray-400 text-sm">Released: {movie?.release_date}</p>
				{movie?.overview && <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">{movie?.overview.length > 200 ? `${movie?.overview.slice(0, 150)}...` : `${movie?.overview}`}</p>}
			</div>
		</div>
	);
};

export default Main;

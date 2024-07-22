import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchURL, rowId }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setMovies(response.data.results);
		});
	}, [fetchURL]);

	function scrollLeftHandle() {
		const left = document.getElementById("slider" + rowId);
		left.scrollLeft = left.scrollLeft - 500;
	}

	function scrollRigtHandle() {
		const left = document.getElementById("slider" + rowId);
		left.scrollLeft = left.scrollLeft + 500;
	}

	return (
		<>
			<h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
			<div className="relative flext items-center group">
				<MdChevronLeft onClick={scrollLeftHandle} className="bg-white rounded-full absolute top-[50%]   translate-y-[-50%] hidden opacity-50 hover:opacity-100 cursor-pointer z-10 left-0 group-hover:block" size={40} />
				<div id={"slider" + rowId} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
					{movies.map((item, id) => (
						<Movie item={item} key={id} />
					))}
				</div>
				<MdChevronRight onClick={scrollRigtHandle} className="bg-white rounded-full absolute top-[50%] translate-y-[-50%] hidden opacity-50 hover:opacity-100 cursor-pointer z-10 right-0 group-hover:block" size={40} />
			</div>
		</>
	);
};

export default Row;

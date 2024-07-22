import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const SavedShow = () => {
	const [movies, setMovies] = useState([]);
	const { user } = UserAuth();

	function scrollLeftHandle() {
		const left = document.getElementById("slider");
		left.scrollLeft = left.scrollLeft - 500;
	}

	function scrollRigtHandle() {
		const left = document.getElementById("slider");
		left.scrollLeft = left.scrollLeft + 500;
	}

	// useEffect(() => {
	// 	onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
	// 		setMovies(doc.data()?.savedShows);
	// 	});
	// }, [user?.emial]);

	useEffect(() => {
		if (!user?.uid) return; // Exit if there's no user uid

		const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
			setMovies(doc.data()?.savedShows || []); // Prevents errors if savedShows is undefined
		});

		return () => unsubscribe(); // Cleanup subscription on unmount
	}, [user?.uid]);

	const movieRef = doc(db, "users", user.uid);

	// const deleteShow = async (passedID) => {
	// 	try {
	// 		const result = movies.filter((item) => item.id !== passedID);
	// 		await updateDoc(movieRef, {
	// 			savedShows: result,
	// 		});
	// 	} catch (e) {
	// 		console.log(e.message);
	// 	}
	// };

	const deleteShow = async (passedID) => {
		if (!movies) return; // Prevents further execution if movies haven't loaded

		try {
			const result = movies.filter((item) => item.id !== passedID);
			await updateDoc(movieRef, {
				savedShows: result,
			});
			console.log("Show deleted successfully");
		} catch (e) {
			console.error("Error deleting show:", e.message);
		}
	};  

	return (
		<>
			<h2 className="text-white font-bold md:text-xl p-4">My Show </h2>
			<div className="relative flext items-center group">
				<MdChevronLeft onClick={scrollLeftHandle} className="bg-white rounded-full absolute top-[50%]   translate-y-[-50%] hidden opacity-50 hover:opacity-100 cursor-pointer z-10 left-0 group-hover:block" size={40} />
				<div className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
					{movies.map((item, id) => (
						<div key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] inline-block cursor-pointer relative p-2">
							<img className="w-full h-auto bock" src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
							<div className="absolute top-0 w-full h-full left-0 hover:bg-black/80 opacity-0 text-white hover:opacity-100">
								<p className="h-full flex justify-center items-center white-space-normal text-xs md:text-sm font-bold">{item?.title}</p>
								<p onClick={() => deleteShow(item.id)} className="absolute text-gray-300 top-4 right-4">
									<AiOutlineClose />
								</p>
							</div>
						</div>
					))}
				</div>
				<MdChevronRight onClick={scrollRigtHandle} className="bg-white rounded-full absolute top-[50%] translate-y-[-50%] hidden opacity-50 hover:opacity-100 cursor-pointer z-10 right-0 group-hover:block" size={40} />
			</div>
		</>
	);
};

export default SavedShow;

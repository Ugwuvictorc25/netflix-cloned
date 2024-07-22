import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Movie = ({ item, id }) => {
	const [like, setLike] = useState(false);
	const [saved, setSaved] = useState(false);
	const { user } = UserAuth();

	const movieID = doc(db, "users", `${user?.email}`);

	// const saveShow = async () => {
	// 	if (user?.email) {
	// 		setLike(!like);
	// 		setSaved(true);
	// 		await updateDoc(movieID, {
	// 			savedShows: arrayUnion({
	// 				id: item.id,
	// 				title: item.title,
	// 				img: item.backdrop_path,
	// 			}),
	// 		});
	// 	} else {
	// 		alert("Please log in to save a movie");
	// 	}
	// };

	// const saveShow = async (item) => {
	// 	// Ensure that we have user info
	// 	if (user?.uid) {
	// 		setLike(!like); // Toggle like state
	// 		setSaved(true); // Update saved state

	// 		// Reference to the user's document using uid
	// 		const userDocRef = doc(db, "users", user.uid);

	// 		try {
	// 			await updateDoc(userDocRef, {
	// 				savedShows: arrayUnion({
	// 					id: item.id,
	// 					title: item.title,
	// 					img: item.backdrop_path,
	// 				}),
	// 			});
	// 			console.log("Show saved successfully");
	// 		} catch (e) {
	// 			console.error("Error saving show:", e.message);
	// 		}
	// 	} else {
	// 		alert("Please log in to save a movie");
	// 	}
	// };

	const saveShow = async (item) => {
		if (user?.uid) {
			setLike(!like);
			setSaved(true);

			// Ensure the item has the required properties defined
			if (item && item.id && item.title && item.backdrop_path) {
				const userDocRef = doc(db, "users", user.uid);

				try {
					await updateDoc(userDocRef, {
						savedShows: arrayUnion({
							id: item.id,
							title: item.title,
							img: item.backdrop_path,
						}),
					});
					console.log("Show saved successfully");
				} catch (e) {
					console.error("Error saving show:", e.message);
					console.log(item);
				}
			} else {
				console.error("Item properties are undefined:", item);
				alert("The movie information is incomplete. Please try again.");
			}
		} else {
			alert("Please log in to save a movie");
		}
	};

	return (
		<div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] inline-block cursor-pointer relative p-2">
			<img className="w-full h-auto bock" src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
			<div className="absolute top-0 w-full h-full left-0 hover:bg-black/80 opacity-0 text-white hover:opacity-100">
				<p className="h-full flex justify-center items-center white-space-normal text-xs md:text-sm font-bold">{item?.title}</p>
				<p className="absolute top-4 left-4" onClick={() => saveShow(item)}>
					{like ? <FaHeart /> : <FaRegHeart />}
				</p>
			</div>
		</div>
	);
};

export default Movie;

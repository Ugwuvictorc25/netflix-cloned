import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null); // Initialize user as null
	const [error, setError] = useState(null); // State for error handling

	const signUp = async (email, password) => {
		setError("");

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Use user.uid instead of user.email for the document ID
			await setDoc(doc(db, "users", user.uid), {
				savedShows: [],
			});
			// navigate("/");
		} catch (err) {
			setError(err.message); // Set error message
			console.error("Error signing up:", err);
		}
	};

	const logIn = async (email, password) => {
		return await signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = async () => {
		try {
			await signOut(auth);
		} catch (err) {
			setError(err.message); // Set error message
			console.error("Error logging out:", err);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return <AuthContext.Provider value={{ signUp, logIn, logOut, user, error }}>{children}</AuthContext.Provider>;
}

export function UserAuth() {
	return useContext(AuthContext);
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKECT,
// 	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
// 	appId: process.env.REACT_APP_FIREBASE_API_ID,
// };

const firebaseConfig = {
	apiKey: "AIzaSyAaQGBZglW5KeOKS0F7lWdG_IzzlGyy5cM",
	authDomain: "netflix-react-yt-786ad.firebaseapp.com",
	projectId: "netflix-react-yt-786ad",
	storageBucket: "netflix-react-yt-786ad.appspot.com",
	messagingSenderId: "636622589314",
	appId: "1:636622589314:web:2851be11af33095ed3d39b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import { seedDatabase } from "../seed";

const config = {
	apiKey: "AIzaSyA72NrFvAN9TYNe7Y3FU_fSm-nXKFdWhvc",
	authDomain: "react-instagram-clone-7cf32.firebaseapp.com",
	projectId: "react-instagram-clone-7cf32",
	storageBucket: "react-instagram-clone-7cf32.appspot.com",
	messagingSenderId: "195868063549",
	appId: "1:195868063549:web:6a8474ac4b3d73ac4bb754",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };

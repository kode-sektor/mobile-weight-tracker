import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseCred = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "mobile-weight-tracker-e6e6b.firebaseapp.com",
    databaseURL: "https://mobile-weight-tracker-e6e6b.firebaseio.com",
    projectId: "mobile-weight-tracker-e6e6b",
    storageBucket: "mobile-weight-tracker-e6e6b.appspot.com",
    messagingSenderId: "363673774745",
    appId: "1:363673774745:web:06b70583a42642681b6608",
    measurementId: "G-LRBDQ1LHF3"
};

firebase.initializeApp(firebaseCred);

const firebaseDB = firebase.database();

const firebaseLoop = (snapshot) => {
	const data = [];

	// helper function for firebase
	snapshot.forEach((childSnapshot) => {	
		data.push({
			...childSnapshot.val(),
			id : childSnapshot.key
		})
	})
	return data;
}

const firebaseUser = firebaseDB.ref('user');
const firebaseWeight = firebaseDB.ref('weight');

export {
    firebase,
    firebaseDB,
    firebaseUser,
    firebaseWeight
}

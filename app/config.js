import { initializeApp} from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    // Apne Firebase config yahan dalen
    apiKey: "AIzaSyCjzvOM8ZLfOlGeedIkck3NOukNXEh4G5I",
    authDomain: "test-82fbc.firebaseapp.com",
    projectId: "test-82fbc",
    storageBucket: "test-82fbc.appspot.com",
    messagingSenderId: "385990565204",
    appId: "1:385990565204:web:4f4b84ba9c9ca50161bcc1",
    measurementId: "G-KNQDTFKP1N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db};
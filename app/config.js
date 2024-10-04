import { initializeApp} from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    // Apne Firebase config yahan dalen
    apiKey: "AIzaSyDK_o_mt2yHhlHt-Yopiuta-hkrH49LOig",
    authDomain: "talk-6b03e.firebaseapp.com",
    projectId: "talk-6b03e",
    storageBucket: "talk-6b03e.appspot.com",
    messagingSenderId: "896911416885",
    appId: "1:896911416885:web:48899b33b9060d12b91b7c",
    measurementId: "G-W2855Q5Q77"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {app,db,storage};
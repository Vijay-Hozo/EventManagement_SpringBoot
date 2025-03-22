import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC6ssS1ZOpnslSr0xh1HIg-eYMKXRLfk9Y",
  authDomain: "eventmanagement-d83d6.firebaseapp.com",
  projectId: "eventmanagement-d83d6",
  storageBucket: "eventmanagement-d83d6.appspot.com",
  messagingSenderId: "240445445253",
  appId: "1:240445445253:web:c9b2c7acd8bd76280905ec",
  measurementId: "G-LTEW381N3P"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
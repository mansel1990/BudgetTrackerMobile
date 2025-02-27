import { initializeApp } from "firebase/app"; // Change this import
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseJson = {
  project_info: {
    project_number: "491011553709",
    project_id: "budgettracker-136e8",
    storage_bucket: "budgettracker-136e8.firebasestorage.app",
  },
  client: [
    {
      client_info: {
        mobilesdk_app_id: "1:491011553709:android:0815e9d10701878ecdc924",
      },
      api_key: [
        {
          current_key: "AIzaSyABea1KDaeteOUzd0Nd_2tDeS8BadU07F8",
        },
      ],
    },
  ],
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseJson.client[0].api_key[0].current_key,
  authDomain: `${firebaseJson.project_info.project_id}.firebaseapp.com`,
  projectId: firebaseJson.project_info.project_id,
  storageBucket: firebaseJson.project_info.storage_bucket,
  appId: firebaseJson.client[0].client_info.mobilesdk_app_id,
  databaseURL: `https://${firebaseJson.project_info.project_id}-default-rtdb.firebaseio.com`,
  messagingSenderId: firebaseJson.project_info.project_number,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

export { auth, googleProvider };

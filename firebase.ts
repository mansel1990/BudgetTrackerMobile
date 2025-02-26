// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseJson = {
  "project_info": {
    "project_number": "491011553709",
    "project_id": "budgettracker-136e8",
    "storage_bucket": "budgettracker-136e8.firebasestorage.app"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:491011553709:android:0815e9d10701878ecdc924",
      },
      "api_key": [
        {
          "current_key": "AIzaSyABea1KDaeteOUzd0Nd_2tDeS8BadU07F8"
        }
      ]
    }
  ]
};

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: firebaseJson.client[0].api_key[0].current_key,
    authDomain: `${firebaseJson.project_info.project_id}.firebaseapp.com`,
    projectId: firebaseJson.project_info.project_id,
    storageBucket: firebaseJson.project_info.storage_bucket,
    appId: firebaseJson.client[0].client_info.mobilesdk_app_id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

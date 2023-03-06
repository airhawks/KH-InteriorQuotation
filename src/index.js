import * as React from "react";
import ReactDOM from "react-dom/client";

import Summary from "./components/Summary.js";
import Editor from "./components/Editor.js";

import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwKnWWyWHPOYwehaL-paX7KPOLHdomH6s",
  authDomain: "kh-curtains.firebaseapp.com",
  projectId: "kh-curtains",
  storageBucket: "kh-curtains.appspot.com",
  messagingSenderId: "88547459846",
  appId: "1:88547459846:web:99c15fd9dfa6c44ef19487",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.error(error.message, error);
    });
};

const clearStorage = () => {
  window.localStorage.removeItem("KH_data");
  window.localStorage.removeItem("KH_ClientDetails");
  window.location.reload();
};

const logout = () => {
  signOut(auth);
};

function App() {
  const [showSummary, setShowSummary] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loginDetails, setLoginDetails] = React.useState({});

  const updateLoginDetails = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  React.useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      }),
    []
  );

  if (!user) {
    return (
      <div className="m-2">
        <label htmlFor="Unit" className="mt-3 form-label">
          Username
        </label>
        <input
          className="form-control"
          id="Unit"
          onChange={(e) => updateLoginDetails("email", e.target.value)}
        />
        <label htmlFor="quantity" className="mt-3 form-label">
          Password
        </label>
        <input
          className="form-control"
          id="quantity"
          type="password"
          onChange={(e) => updateLoginDetails("password", e.target.value)}
        />
        <div className="d-grid gap-2 mt-3  d-sm-flex justify-content-sm-start">
          <button
            type="button"
            className="btn btn-primary me-sm-2"
            onClick={() => loginUser(loginDetails.email, loginDetails.password)}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return showSummary ? (
    <Summary />
  ) : (
    <>
      <div className="d-grid gap-2 m-2 d-sm-flex justify-content-sm-end">
        <button
          type="button"
          className="btn btn-primary me-sm-2"
          onClick={setShowSummary}
        >
          Show Receipt
        </button>

        <button
          type="button"
          className="btn btn-primary me-sm-2"
          onClick={logout}
        >
          Logout
        </button>
        <button
          type="button"
          className="btn btn-primary me-sm-2"
          onClick={clearStorage}
        >
          Clear form
        </button>
      </div>

      <Editor />
    </>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

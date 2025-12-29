import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Mobile → fake email বানানো (Firebase requirement)
function mobileToEmail(mobile) {
  return mobile + "@biniyog.com";
}

window.signup = async function () {
  const name = name.value;
  const mobile = mobile.value;
  const pass = password.value;
  const confirmPass = confirm.value;

  if (pass !== confirmPass) {
    alert("Password not match");
    return;
  }

  const email = mobileToEmail(mobile);

  const userCred = await createUserWithEmailAndPassword(auth, email, pass);

  await setDoc(doc(db, "users", userCred.user.uid), {
    name,
    mobile,
    balance: 0,
    createdAt: serverTimestamp()
  });

  location.href = "index.html";
};

window.login = async function () {
  const email = mobileToEmail(mobile.value);
  const pass = password.value;

  await signInWithEmailAndPassword(auth, email, pass);
  location.href = "dashboard.html";
};

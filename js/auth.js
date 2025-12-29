// js/auth.js
import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =========================
   🔹 Signup Function
========================= */
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !mobile || !password || !confirmPassword) {
      alert("সব ফিল্ড পূরণ করুন");
      return;
    }

    if (password !== confirmPassword) {
      alert("পাসওয়ার্ড মিলছে না");
      return;
    }

    try {
      // 🔐 Firebase Auth (email format হিসেবে mobile ব্যবহার)
      const email = mobile + "@biniyog.com";

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔥 Firestore auto add
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        mobile: mobile,
        balance: 0,
        createdAt: serverTimestamp(),
      });

      alert("Signup সফল হয়েছে");

      // ➜ Auto redirect to dashboard
      window.location.href = "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

/* =========================
   🔹 Login Function
========================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const mobile = document.getElementById("loginMobile").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!mobile || !password) {
      alert("মোবাইল ও পাসওয়ার্ড দিন");
      return;
    }

    try {
      const email = mobile + "@biniyog.com";

      await signInWithEmailAndPassword(auth, email, password);

      // ➜ Redirect to dashboard
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("ভুল তথ্য দিয়েছেন");
    }
  });
}

/* =========================
   🔹 Auth Guard (Optional)
========================= */
onAuthStateChanged(auth, async (user) => {
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "dashboard.html";
  }
});

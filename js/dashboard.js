import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Auth Guard
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      document.getElementById("balance").innerText =
        snap.data().balance || 0;
    }
  }
});

// Logout
window.logout = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};

import { db } from "./firebase.js";
import { doc, setDoc } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.getElementById("signupBtn").addEventListener("click", async ()=>{

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if(!name || !phone || !password){
    alert("সব তথ্য দিন");
    return;
  }

  await setDoc(doc(db,"users",phone),{
    name: name,
    phone: phone,
    password: password,
    balance: 0
  });

  alert("Signup success");
  window.location.href="index.html";
});

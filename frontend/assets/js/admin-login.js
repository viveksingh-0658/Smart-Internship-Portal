const form =
document.getElementById(
"adminLoginForm"
);

form.addEventListener(
"submit",
async (e) => {

e.preventDefault();

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

try {

const response =
await fetch(
"http://localhost:8000/api/admin/login",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
email,
password
})
}
);

const data =
await response.json();

if(response.ok){

localStorage.setItem(
"adminToken",
data.token
);

alert(
"✅ Login Successful"
);

window.location.href =
"admin.html";

}else{

alert(
data.message
);

}

}catch(error){

console.log(error);

alert(
"Server Error"
);

}

}
);

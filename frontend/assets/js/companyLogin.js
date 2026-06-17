console.log("COMPANY LOGIN JS LOADED");

const loginForm =
document.getElementById(
"companyLoginForm"
);

const message =
document.getElementById(
"message"
);

if(loginForm){

loginForm.addEventListener(
"submit",
async (e)=>{

  e.preventDefault();

  if(message){
    message.innerText = "";
  }

  const email =
  document.getElementById(
    "email"
  ).value;

  const password =
  document.getElementById(
    "password"
  ).value;

  try{

    const response =
    await fetch(
      "http://localhost:8000/api/company/login",
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
        "companyToken",
        data.token
      );

      if(message){
        message.style.color =
        "#22c55e";

        message.innerText =
        "Login Successful";
      }

      setTimeout(()=>{

        window.location.href =
        "dashboard.html";

      },1000);

    }else{

      if(message){
        message.style.color =
        "#ef4444";

        message.innerText =
        data.message ||
        "Invalid Email or Password";
      }

    }

  }catch(error){

    console.log(error);

    if(message){
      message.style.color =
      "#ef4444";

      message.innerText =
      "Server Error";
    }

  }

}


);

}else{

console.log(
"companyLoginForm NOT FOUND"
);

}

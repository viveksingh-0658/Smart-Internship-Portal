console.log("COMPANY AUTH JS LOADED");

const registerForm =
document.getElementById(
"companyRegisterForm"
);

console.log("Register Form:", registerForm);

const message =
document.getElementById(
"message"
);

if(registerForm){

registerForm.addEventListener(
"submit",
async (e)=>{


  console.log(
    "FORM SUBMITTED"
  );

  e.preventDefault();

  if(message){
    message.innerText = "";
  }

  const companyName =
  document.getElementById(
    "companyName"
  ).value;

  const email =
  document.getElementById(
    "email"
  ).value;

  const password =
  document.getElementById(
    "password"
  ).value;

  const industry =
  document.getElementById(
    "industry"
  ).value;

  const location =
  document.getElementById(
    "location"
  ).value;

  const description =
  document.getElementById(
    "description"
  ).value;

  try{

    console.log(
      "Sending Request..."
    );

    const response =
    await fetch(
      "http://localhost:8000/api/company/register",
      {
        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:JSON.stringify({
          companyName,
          email,
          password,
          industry,
          location,
          description
        })
      }
    );

    const data =
    await response.json();

    console.log(
      "Response:",
      data
    );

    if(response.ok){

      if(message){

        message.style.color =
        "lime";

        message.innerText =
        "Company Registered Successfully";

      }

      setTimeout(()=>{

        window.location.href =
        "login.html";

      },1500);

    }else{

      if(message){

        message.style.color =
        "red";

        message.innerText =
        data.message;

      }

    }

  }catch(error){

    console.log(
      "ERROR:",
      error
    );

    if(message){

      message.style.color =
      "red";

      message.innerText =
      "Server Error";

    }

  }

}


);

}else{

console.log(
"companyRegisterForm NOT FOUND"
);

}



const loginForm =
document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener(
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
            "http://localhost:8000/api/auth/login",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
                password,
              }),
            }
          );

        const data =
          await response.json();

        if (response.ok) {

          localStorage.setItem(
            "studentToken",
            data.token
          );

        //   alert(
        //     "Login Successful"
        //   );

          window.location.href =
            "dashboard.html";

        } else {

          alert(data.message);

        }

      } catch (error) {

        console.log(error);

        alert(
          "Server Error"
        );

      }

    }
  );

}


const registerForm =
document.getElementById("registerForm");

if (registerForm) {

registerForm.addEventListener(
"submit",
async (e) => {


  e.preventDefault();

  const name =
    document.getElementById("name").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const college =
    document.getElementById("college").value;

  const skills =
    document.getElementById("skills").value;

  try {

    const response =
      await fetch(
        "http://localhost:8000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
            college,
            skills,
          }),
        }
      );

    const data =
      await response.json();

    if (response.ok) {

    //   alert("Registration Successful");

      window.location.href =
        "login.html";

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

    alert("Server Error");

  }

}


);

}

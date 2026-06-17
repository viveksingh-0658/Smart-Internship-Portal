// const token = localStorage.getItem("studentToken");

// if (!token) {
//   window.location.href = "login.html";
// }

// async function loadApplications() {

//   try {

//     const response = await fetch(
//       "http://localhost:8000/api/applications/my-applications",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     const applications = await response.json();

//     const container =
//       document.getElementById("applications");

//     container.innerHTML = "";

//     if (!applications.length) {

//       container.innerHTML = `
//         <div class="card">
//           <h2>No Applications Found</h2>
//         </div>
//       `;

//       return;
//     }

//     applications.forEach((app) => {

//       container.innerHTML += `
//         <div class="card">

//           <h2>
//             ${app.internship?.title || "N/A"}
//           </h2>

//           <p>
//             📍 ${app.internship?.location || "N/A"}
//           </p>

//           <p>
//             💰 ₹${app.internship?.stipend || "N/A"}
//           </p>

//           <p>
//             ⏳ ${app.internship?.duration || "N/A"}
//           </p>

//           <p>
//             📌 Status:
//             <strong>${app.status}</strong>
//           </p>

//         </div>
//       `;
//     });

//   } catch (error) {

//     console.log(error);

//     document.getElementById("applications").innerHTML =
//       "<h2 style='color:white'>Failed to Load Applications</h2>";
//   }
// }

// loadApplications();


const token =
localStorage.getItem(
    "studentToken"
);

if(!token){

    window.location.href =
    "login.html";
}

async function loadApplications(){

    try{

        const response =
        await fetch(
            "http://localhost:8000/api/applications/my-applications",
            {
                headers:{
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

        const applications =
        await response.json();

        const container =
        document.getElementById(
            "applicationsContainer"
        );

        container.innerHTML = "";

        if(applications.length === 0){

            container.innerHTML = `
                <h2>
                    No Applications Found
                </h2>
            `;

            return;
        }

        applications.forEach(app => {

            const status =
            app.status || "Pending";

            container.innerHTML += `

            <div class="application-card">

                <h2>
                    ${app.internship?.title}
                </h2>

                <p>
                    📍 ${app.internship?.location}
                </p>

                <p>
                    💰 ₹${app.internship?.stipend || "N/A"}
                </p>

                <p>
                    ⏳ ${app.internship?.duration || "N/A"}
                </p>

                <span
                    class="
                    status
                    ${status.toLowerCase()}
                    "
                >
                    ${status}
                </span>

            </div>

            `;
        });

    }catch(error){

        console.log(error);
    }
}

function logout(){

    localStorage.removeItem(
        "studentToken"
    );

    window.location.href =
    "login.html";
}

loadApplications();
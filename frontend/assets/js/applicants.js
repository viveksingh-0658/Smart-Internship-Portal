console.log("Applicants JS Loaded");
const token =
localStorage.getItem(
"companyToken"
);

if (!token) {

window.location.href =
"login.html";

}

// =======================
// Load Applicants
// =======================

async function loadApplicants() {

  try {

    const response = await fetch(
      "http://localhost:8000/api/applications/company",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const applicants = await response.json();

    console.log("Applicants:", applicants);

    const container =
      document.getElementById(
        "applicantsContainer"
      );

    if (!container) return;

    container.innerHTML = "";

    if (
      !applicants ||
      applicants.length === 0
    ) {

      container.innerHTML = `
        <div class="card-item">
          <h2>No Applicants Found</h2>
        </div>
      `;

      return;
    }

    applicants.forEach((app) => {

      const status =
        app.status || "Pending";

      container.innerHTML += `
        <div class="card-item">

          <h2>
            👨‍🎓 ${app.student?.name || "Student"}
          </h2>

          <p>
            📧 Email:
            ${app.student?.email || "N/A"}
          </p>

          <p>
            🎓 College:
            ${app.student?.college || "N/A"}
          </p>

          <p>
            💼 Internship:
            ${app.internship?.title || "N/A"}
          </p>

          <p>
            📍 Location:
            ${app.internship?.location || "N/A"}
          </p>

          <p>
            📌 Status:
            <b>${status}</b>
          </p>

          ${
            status === "Pending"
              ? `
              <div class="actions">

                <button
                  class="edit-btn"
                  onclick="acceptApplicant('${app._id}')"
                >
                  ✅ Accept
                </button>

                <button
                  class="delete-btn"
                  onclick="rejectApplicant('${app._id}')"
                >
                  ❌ Reject
                </button>

              </div>
              `
              : ""
          }

        </div>
      `;

    });

  } catch (error) {

    console.log(
      "Applicant Error:",
      error
    );

  }

}

// =======================
// Accept Applicant
// =======================

async function acceptApplicant(id){

try{

const response =
await fetch(
`http://localhost:8000/api/applications/${id}/accept`,
{
method:"PUT",

headers:{
Authorization:
`Bearer ${token}`
}
}
);

const data =
await response.json();

alert(
data.message ||
"Application Accepted"
);

loadApplicants();

}catch(error){

console.log(error);

alert(
"Accept Failed"
);

}

}

// =======================
// Reject Applicant
// =======================

async function rejectApplicant(id){

try{

const response =
await fetch(
`http://localhost:8000/api/applications/${id}/reject`,
{
method:"PUT",

headers:{
Authorization:
`Bearer ${token}`
}
}
);

const data =
await response.json();

alert(
data.message ||
"Application Rejected"
);

loadApplicants();

}catch(error){

console.log(error);

alert(
"Reject Failed"
);

}

}

// =======================
// Initial Load
// =======================

loadApplicants();

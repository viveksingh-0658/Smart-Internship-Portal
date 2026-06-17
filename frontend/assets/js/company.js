const token = localStorage.getItem("companyToken");
console.log("COMPANY JS LOADED");

if (!token) {
window.location.href = "login.html";
}

// ======================
// Create Internship
// ======================

const internshipForm =
document.getElementById("internshipForm");

if (internshipForm) {

internshipForm.addEventListener(
"submit",
async (e) => {


  e.preventDefault();

  const title =
    document.getElementById("title").value;

  const location =
    document.getElementById("location").value;

  const stipend =
    document.getElementById("stipend").value;

  const duration =
    document.getElementById("duration").value;

  const skillsRequired =
    document
      .getElementById("skillsRequired")
      .value
      .split(",")
      .map(skill => skill.trim());

  const description =
    document.getElementById("description").value;

  try {

    const response = await fetch(
      "http://localhost:8000/api/internships/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          title,
          location,
          stipend,
          duration,
          skillsRequired,
          description
        })
      }
    );

    const data =
      await response.json();

    if (response.ok) {

      alert(
        "✅ Internship Created Successfully"
      );

      internshipForm.reset();

      await loadInternships();

      document.getElementById(
        "internshipsSection"
      ).style.display = "block";

    } else {

      alert(
        data.message ||
        "Failed To Create Internship"
      );

    }

  } catch (error) {

    console.log(error);

    alert(
      "❌ Server Error"
    );

  }

}


);
}
const editForm =
document.getElementById(
  "editInternshipForm"
);

if (editForm) {

  editForm.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const id =
        document.getElementById("editId").value;

      try {

        const response =
          await fetch(
            `http://localhost:8000/api/internships/${id}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`
              },

              body: JSON.stringify({

                title:
                  document.getElementById("editTitle").value,

                location:
                  document.getElementById("editLocation").value,

                stipend:
                  document.getElementById("editStipend").value,

                duration:
                  document.getElementById("editDuration").value,

                skillsRequired:
                  document.getElementById(
                    "editSkillsRequired"
                  )
                  .value
                  .split(",")
                  .map(skill => skill.trim()),

                description:
                  document.getElementById(
                    "editDescription"
                  ).value

              })

            }
          );

        const data =
          await response.json();

        if (response.ok) {

          alert(
            "✅ Internship Updated"
          );

          loadInternships();

          showSection(
            "internshipsSection"
          );

        } else {

          alert(data.message);

        }

      } catch (error) {

        console.log(error);

        alert(
          "Update Failed"
        );

      }

    }
  );

}

// ======================
// Edit Internship
// ======================

async function editInternship(id) {

  try {

    const response = await fetch(
      `http://localhost:8000/api/internships/${id}`
    );

    const internship =
      await response.json();

    document.getElementById("editId").value =
      internship._id;

    document.getElementById("editTitle").value =
      internship.title || "";

    document.getElementById("editLocation").value =
      internship.location || "";

    document.getElementById("editStipend").value =
      internship.stipend || "";

    document.getElementById("editDuration").value =
      internship.duration || "";

    document.getElementById("editSkillsRequired").value =
      internship.skillsRequired
        ? internship.skillsRequired.join(", ")
        : "";

    document.getElementById("editDescription").value =
      internship.description || "";

    showSection("editSection");

  } catch (error) {

    console.log(error);

    alert("Failed to load internship");

  }

}

// load internship 

async function loadInternships() {

  try {

    const response = await fetch(
      "http://localhost:8000/api/internships/company/my-internships",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const internships = await response.json();

    console.log(internships);

    const container =
      document.getElementById("internships");

    const totalInternships =
      document.getElementById(
        "totalInternships"
      );

    if (!container) return;

    container.innerHTML = "";

    totalInternships.innerText =
      internships.length;

    if (internships.length === 0) {

      container.innerHTML = `
        <h3>No Internship Found</h3>
      `;

      return;
    }

    internships.forEach((internship) => {

      container.innerHTML += `

      <div class="card-item">

        <h2>
          ${internship.title}
        </h2>

        <p>
          📍 ${internship.location}
        </p>

        <p>
          💰 ₹${internship.stipend || "N/A"}
        </p>

        <p>
          ⏳ ${internship.duration || "N/A"}
        </p>

        <div class="actions">

          <button
            class="edit-btn"
            onclick="editInternship('${internship._id}')"
          >
            ✏ Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteInternship('${internship._id}')"
          >
            🗑 Delete
          </button>

        </div>

      </div>

      `;
    });

  } catch(error) {

    console.log(
      "Load Internship Error:",
      error
    );

  }
}

// ======================
// Delete Internship
// ======================

async function deleteInternship(id) {

const confirmDelete =
confirm(
"Delete this internship?"
);

if (!confirmDelete) return;

try {


const response = await fetch(
  `http://localhost:8000/api/internships/${id}`,
  {
    method: "DELETE",

    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
);

const data =
  await response.json();

alert(
  data.message
);

loadInternships();


} catch (error) {


console.log(error);


}

}

// ======================
// Navigation
// ======================

function showSection(sectionId) {

const sections = [
  "createSection",
  "internshipsSection",
  "profileSection",
  "editSection"
];
sections.forEach(id => {


const section =
  document.getElementById(id);

if (section) {
  section.style.display =
    "none";
}


});

const activeSection =
document.getElementById(
sectionId
);

if (activeSection) {
activeSection.style.display =
"block";
}

if (
sectionId ===
"internshipsSection"
) {


loadInternships();


}

}

async function loadCompanyProfile() {

  try {

    const response = await fetch(
      "http://localhost:8000/api/company/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    document.getElementById(
      "companyName"
    ).innerText =
      data.company.companyName || "N/A";

    document.getElementById(
      "companyEmail"
    ).innerText =
      data.company.email || "N/A";

    document.getElementById(
      "companyIndustry"
    ).innerText =
      data.company.industry || "N/A";

  } catch (error) {

    console.log(
      "Profile Error:",
      error
    );

  }
}

// ======================
// Logout
// ======================

// function logout() {

// localStorage.removeItem(
// "companyToken"
// );

// window.location.href =
// "login.html";

// }
function logout(){

    localStorage.removeItem("adminToken");

    window.location.href =
    "../../index.html";

}
// ======================
// Initial Load
// ======================

async function loadDashboardStats() {

  try {

    const response = await fetch(
      "http://localhost:8000/api/applications/company",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const applications =
      await response.json();

    console.log("Applications:", applications);

    document.getElementById(
      "totalApplicants"
    ).innerText =
      applications.length;

    const accepted =
      applications.filter(
        app => app.status === "Accepted"
      ).length;

    const rejected =
      applications.filter(
        app => app.status === "Rejected"
      ).length;

    document.getElementById(
      "acceptedCount"
    ).innerText = accepted;

    document.getElementById(
      "rejectedCount"
    ).innerText = rejected;

  } catch (error) {

    console.log(
      "Dashboard Stats Error:",
      error
    );

  }

}


window.onload = () => {

  // hide all sections
  const sections = [
    "createSection",
    "internshipsSection",
    "profileSection",
    "editSection"
  ];

  sections.forEach(id => {
    const section = document.getElementById(id);

    if(section){
      section.style.display = "none";
    }
  });

  // dashboard data load
  loadInternships();
  loadDashboardStats();
  loadCompanyProfile();

};
const token = localStorage.getItem("studentToken");

let allInternships = [];

if (!token) {
window.location.href = "login.html";
}

// =========================
// LOAD INTERNSHIPS
// =========================

async function loadInternships() {


try {

    const container =
        document.getElementById("internships");

    if (container) {

        container.innerHTML = `
            <div class="loading">
                Loading internships...
            </div>
        `;
    }

    const response = await fetch(
        "http://localhost:8000/api/internships"
    );

    console.log(
        "Internship API Status:",
        response.status
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch internships"
        );
    }

    const internships =
        await response.json();

    console.log(
        "Internships:",
        internships
    );

    allInternships = internships;

    const total =
        document.getElementById(
            "totalInternships"
        );

    if (total) {
        total.innerText =
            internships.length;
    }

    renderInternships(
        internships
    );

} catch (error) {

    console.error(
        "Load Internship Error:",
        error
    );

    const container =
        document.getElementById(
            "internships"
        );

    if (container) {

        container.innerHTML = `
            <div class="empty-state">
                <h2>⚠️ Error Loading Internships</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}


}

// =========================
// RENDER INTERNSHIPS
// =========================
function renderInternships(internships) {

    const container =
        document.getElementById("internships");

    if (!container) return;

    container.innerHTML = "";

    if (internships.length === 0) {

        container.innerHTML = `
        <div class="empty-state">
            <h2>🚫 No Internships Found</h2>
            <p>Try changing your filters.</p>
        </div>
        `;

        return;
    }

    internships.forEach((internship) => {

        container.innerHTML += `

        <div class="internship-card">

            <div class="card-top">

                <h3>
                    ${internship.title}
                </h3>

                <span class="status">
                    Open
                </span>

            </div>

            <div class="company">

                🏢 ${internship.company?.companyName || "Company"}

            </div>

            <div class="details">

                <p>
                    📍 ${internship.location || "N/A"}
                </p>

                <p>
                    ⏳ ${internship.duration || "N/A"}
                </p>

                <p>
                    💰 ₹${internship.stipend || "N/A"}
                </p>

            </div>

            <div class="description">

                ${
                    internship.description
                    ?
                    internship.description.substring(0,120)
                    :
                    "No description available"
                }

            </div>

            <button
                onclick="applyInternship('${internship._id}')"
            >
                🚀 Apply Now
            </button>

        </div>

        `;
    });
}

// =========================
// APPLY INTERNSHIP
// =========================

async function applyInternship(id) {

    console.log("Internship ID:", id);
    console.log("Token:", token);

    try {

        const response = await fetch(
            "http://localhost:8000/api/applications/apply",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    internshipId: id
                })
            }
        );

        const data = await response.json();

        console.log("Apply Response:", data);

        if(response.ok){

            alert(
                data.message ||
                "Application Submitted Successfully"
            );

            loadApplicationStats();

        }else{

            alert(
                data.message ||
                "Application Failed"
            );

        }

    } catch(error){

        console.error(
            "Apply Error:",
            error
        );

        alert(
            error.message
        );

    }
}



// =========================
// APPLICATION STATS
// =========================

async function loadApplicationStats() {


try {

    const response =
        await fetch(
            "http://localhost:8000/api/applications/my-applications",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    console.log(
        "Stats API Status:",
        response.status
    );

    const applications =
        await response.json();

    console.log(
        "Applications:",
        applications
    );

    document.getElementById(
        "appliedCount"
    ).innerText =
        applications.length || 0;

    const accepted =
        applications.filter(
            app =>
                app.status ===
                "Accepted"
        ).length;

    const rejected =
        applications.filter(
            app =>
                app.status ===
                "Rejected"
        ).length;

    document.getElementById(
        "acceptedCount"
    ).innerText =
        accepted;

    document.getElementById(
        "rejectedCount"
    ).innerText =
        rejected;

} catch (error) {

    console.error(
        "Stats Error:",
        error
    );
}


}

// =========================
// FILTERS
// =========================

function filterInternships() {


let filtered =
    [...allInternships];

const search =
    document.getElementById(
        "searchInput"
    )?.value
        .toLowerCase() || "";

const location =
    document.getElementById(
        "locationFilter"
    )?.value || "";

const sort =
    document.getElementById(
        "sortFilter"
    )?.value || "";

if (search) {

    filtered =
        filtered.filter(
            item =>
                item.title
                    ?.toLowerCase()
                    .includes(search) ||

                item.company?.companyName
                    ?.toLowerCase()
                    .includes(search)
        );
}

if (location) {

    filtered =
        filtered.filter(
            item =>
                item.location ===
                location
        );
}

if (sort === "high") {

    filtered.sort(
        (a, b) =>
            (Number(b.stipend) || 0) -
            (Number(a.stipend) || 0)
    );
}

if (sort === "low") {

    filtered.sort(
        (a, b) =>
            (Number(a.stipend) || 0) -
            (Number(b.stipend) || 0)
    );
}

renderInternships(
    filtered
);


}

// =========================
// NAVIGATION
// =========================

function showDashboard() {
window.location.href =
"dashboard.html";
}

function showProfile() {
window.location.href =
"profile.html";
}
//logout
// function logout() {


// localStorage.removeItem(
//     "studentToken"
// );

// window.location.href =
//     "login.html";


// }


function logout(){

    localStorage.removeItem("adminToken");

    window.location.href =
    "../../index.html";

}

// =========================
// PAGE LOAD
// =========================

window.onload = () => {

loadInternships();

loadApplicationStats();


};

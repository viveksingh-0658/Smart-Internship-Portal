const token = localStorage.getItem("adminToken");

if (!token) {
window.location.href = "login.html";
}

// ========================
// DASHBOARD STATS
// ========================

async function loadDashboard() {


try {

    const response = await fetch(
        "http://localhost:8000/api/admin/dashboard",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    document.getElementById(
        "studentsCount"
    ).innerText = data.students || 0;

    document.getElementById(
        "companiesCount"
    ).innerText = data.companies || 0;

    document.getElementById(
        "internshipsCount"
    ).innerText = data.internships || 0;

    document.getElementById(
        "applicationsCount"
    ).innerText = data.applications || 0;

} catch(error){

    console.log(
        "Dashboard Error:",
        error
    );

}


}

// ========================
// LOAD STUDENTS
// ========================

async function loadStudents() {


try {

    const response = await fetch(
        "http://localhost:8000/api/admin/students",
        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    const students =
    await response.json();

    const container =
    document.getElementById(
        "studentsContainer"
    );

    container.innerHTML = "";

    students.forEach(student => {

        container.innerHTML += `

        <div class="admin-card">

            <h3>
                ${student.name}
            </h3>

            <p>
                📧 ${student.email}
            </p>

            <p>
                🎓 ${student.college || "N/A"}
            </p>

            <button
                class="delete-btn"
                onclick="deleteStudent('${student._id}')"
            >
                Delete
            </button>

        </div>

        `;

    });

} catch(error){

    console.log(error);

}


}

// ========================
// LOAD COMPANIES
// ========================

async function loadCompanies() {


try {

    const response = await fetch(
        "http://localhost:8000/api/admin/companies",
        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    const companies =
    await response.json();

    const container =
    document.getElementById(
        "companiesContainer"
    );

    container.innerHTML = "";

    companies.forEach(company => {

        container.innerHTML += `

        <div class="admin-card">

            <h3>
                ${company.companyName}
            </h3>

            <p>
                📧 ${company.email}
            </p>

            <p>
                🏢 ${company.industry || "N/A"}
            </p>

            <button
                class="delete-btn"
                onclick="deleteCompany('${company._id}')"
            >
                Delete
            </button>

        </div>

        `;

    });

} catch(error){

    console.log(error);

}


}

// ========================
// LOAD INTERNSHIPS
// ========================

async function loadInternships() {


try {

    const response = await fetch(
        "http://localhost:8000/api/admin/internships",
        {
            headers:{
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    const internships =
    await response.json();

    const container =
    document.getElementById(
        "internshipsContainer"
    );

    container.innerHTML = "";

    internships.forEach(item => {

        container.innerHTML += `

        <div class="admin-card">

            <h3>
                ${item.title}
            </h3>

            <p>
                📍 ${item.location}
            </p>

            <p>
                💰 ₹${item.stipend || "N/A"}
            </p>

            <button
                class="delete-btn"
                onclick="deleteInternship('${item._id}')"
            >
                Delete
            </button>

        </div>

        `;

    });

} catch(error){

    console.log(error);

}


}

// ========================
// LOAD APPLICATIONS
// ========================

async function loadApplications() {


try {

    const response = await fetch(
        "http://localhost:8000/api/admin/applications",
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

    applications.forEach(app => {

        container.innerHTML += `

        <div class="admin-card">

            <h3>
                ${app.student?.name || "Student"}
            </h3>

            <p>
                📧 ${app.student?.email || ""}
            </p>

            <p>
                💼 ${app.internship?.title || ""}
            </p>

            <span class="
            status
            ${app.status?.toLowerCase()}
            ">
                ${app.status}
            </span>

        </div>

        `;

    });

} catch(error){

    console.log(error);

}


}

// ========================
// DELETE FUNCTIONS
// ========================

async function deleteStudent(id){


if(!confirm("Delete Student?"))
return;

await fetch(
    `http://localhost:8000/api/admin/student/${id}`,
    {
        method:"DELETE",

        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
);

loadStudents();
loadDashboard();


}

async function deleteCompany(id){


if(!confirm("Delete Company?"))
return;

await fetch(
    `http://localhost:8000/api/admin/company/${id}`,
    {
        method:"DELETE",

        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
);

loadCompanies();
loadDashboard();


}

async function deleteInternship(id){


if(!confirm("Delete Internship?"))
return;

await fetch(
    `http://localhost:8000/api/admin/internship/${id}`,
    {
        method:"DELETE",

        headers:{
            Authorization:
            `Bearer ${token}`
        }
    }
);

loadInternships();
loadDashboard();


}

// ========================
// NAVIGATION
// ========================

function showSection(sectionId){


const sections = [

    "dashboardSection",
    "studentsSection",
    "companiesSection",
    "internshipsSection",
    "applicationsSection"

];

sections.forEach(id => {

    const section =
    document.getElementById(id);

    if(section){

        section.style.display =
        "none";

    }

});

document.getElementById(
    sectionId
).style.display = "block";

if(sectionId === "studentsSection"){
    loadStudents();
}

if(sectionId === "companiesSection"){
    loadCompanies();
}

if(sectionId === "internshipsSection"){
    loadInternships();
}

if(sectionId === "applicationsSection"){
    loadApplications();
}


}

// ========================
// LOGOUT
// ========================

function logout(){

    localStorage.removeItem("adminToken");

    window.location.href =
    "../../index.html";

}

// ========================
// INITIAL LOAD
// ========================

window.onload = () => {


loadDashboard();

showSection(
    "dashboardSection"
);


};


// ========================
// SEARCH + FILTER
// ========================

function filterData(){

    const searchInput =
    document.getElementById(
        "searchInput"
    );

    const filterType =
    document.getElementById(
        "filterType"
    );

    if(!searchInput || !filterType)
    return;

    const search =
    searchInput.value.toLowerCase();

    const filter =
    filterType.value;

    const cards =
    document.querySelectorAll(
        ".admin-card"
    );

    cards.forEach(card => {

        const text =
        card.innerText.toLowerCase();

        const type =
        card.dataset.type;

        const matchSearch =
        text.includes(search);

        const matchFilter =
        filter === "all" ||
        type === filter;

        card.style.display =
        matchSearch && matchFilter
        ? "block"
        : "none";

    });

}

document.addEventListener(
    "keyup",
    (e) => {

        if(
            e.target.id ===
            "searchInput"
        ){
            filterData();
        }

    }
);

document.addEventListener(
    "change",
    (e) => {

        if(
            e.target.id ===
            "filterType"
        ){
            filterData();
        }

    }
);

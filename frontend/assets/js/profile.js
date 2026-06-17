const token = localStorage.getItem("studentToken");

if (!token) {
    window.location.href = "login.html";
}

// ==========================
// LOAD PROFILE
// ==========================

async function loadProfile() {

    try {

        const response = await fetch(
            "http://localhost:8000/api/student/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const student = await response.json();

        console.log("Profile:", student);

        document.getElementById(
            "studentName"
        ).innerText =
        student.name || "Student";

        document.getElementById(
            "studentEmail"
        ).innerText =
        student.email || "";

        document.getElementById(
            "name"
        ).value =
        student.name || "";

        document.getElementById(
            "college"
        ).value =
        student.college || "";

        document.getElementById(
            "skills"
        ).value =
        student.skills
        ?
        student.skills.join(", ")
        :
        "";

        document.getElementById(
            "resume"
        ).value =
        student.resume || "";

    } catch (error) {

        console.log(
            "Load Profile Error:",
            error
        );

    }

}

// ==========================
// LOAD APPLICATION COUNT
// ==========================

async function loadApplications() {

    try {

        const response = await fetch(
            "http://localhost:8000/api/student/applications",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const applications =
        await response.json();

        const count =
        document.getElementById(
            "applicationCount"
        );

        if (count) {

            count.innerText =
            applications.length;

        }

    } catch (error) {

        console.log(
            "Application Error:",
            error
        );

    }

}

// ==========================
// UPDATE PROFILE
// ==========================

const profileForm =
document.getElementById(
    "profileForm"
);

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            try {

                const response =
                await fetch(
                    "http://localhost:8000/api/student/profile",
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                            "application/json",

                            Authorization:
                            `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            name:
                            document.getElementById(
                                "name"
                            ).value,

                            college:
                            document.getElementById(
                                "college"
                            ).value,

                            skills:
                            document.getElementById(
                                "skills"
                            )
                            .value
                            .split(",")
                            .map(skill =>
                                skill.trim()
                            )
                            .filter(skill =>
                                skill !== ""
                            ),

                            resume:
                            document.getElementById(
                                "resume"
                            ).value

                        })

                    }
                );

                const data =
                await response.json();

                console.log(
                    "Update Response:",
                    data
                );

                if (response.ok) {

                    alert(
                        "✅ Profile Updated Successfully"
                    );

                    loadProfile();

                } else {

                    alert(
                        data.message ||
                        "Profile Update Failed"
                    );

                }

            } catch (error) {

                console.log(
                    "Update Error:",
                    error
                );

                alert(
                    "Profile Update Failed"
                );

            }

        }
    );

}

// ==========================
// LOGOUT
// ==========================

function logout() {

    localStorage.removeItem(
        "studentToken"
    );

    window.location.href =
    "login.html";

}

// ==========================
// INITIAL LOAD
// ==========================

window.onload = () => {

    loadProfile();

    loadApplications();

};
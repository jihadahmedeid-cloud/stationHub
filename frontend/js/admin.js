const API_URL = "http://localhost:3000";


// ===============================
// Login
// ===============================

async function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const loginMsg = document.getElementById("loginMsg");

    if (!email || !password) {

        loginMsg.textContent = "Please enter email and password.";
        return;

    }

    try {

        const response = await fetch(
            `${API_URL}/api/v1/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const result = await response.json();

        console.log("Login response:", result);


        if (!response.ok) {

            loginMsg.textContent =
                result.message || "Login failed.";

            return;
        }


        // Save JWT
        localStorage.setItem("adminToken", result.token);


        loginMsg.textContent = "Login successful!";


        // Hide login
        document.getElementById("loginSection").style.display = "none";


        // Show announcement section
        document.getElementById("postSection").style.display = "block";


    } catch (error) {

        console.error("Login error:", error);

        loginMsg.textContent =
            "Unable to connect to server.";

    }
}



// ===============================
// Send Announcement
// ===============================

async function postUpdate() {

    const station =
        document.getElementById("stationSelect").value;

    const status =
        document.getElementById("priority").value;

    const message =
        document.getElementById("message").value.trim();

    const postMsg =
        document.getElementById("postMsg");


    if (!station) {

        postMsg.textContent =
            "Please select a station.";

        return;
    }


    if (!message) {

        postMsg.textContent =
            "Please write an announcement.";

        return;
    }


    const token =
        localStorage.getItem("adminToken");


    if (!token) {

        postMsg.textContent =
            "You are not logged in.";

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/api/v1/stations/${station.toLowerCase()}/updates`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    status,
                    message
                })
            }
        );


        const result = await response.json();

        console.log("Post response:", result);


        if (!response.ok) {

            postMsg.textContent =
                result.message || "Failed to send announcement.";

            return;
        }


        postMsg.textContent =
            "Announcement sent successfully!";


        // Clear message
        document.getElementById("message").value = "";


    } catch (error) {

        console.error("Post announcement error:", error);

        postMsg.textContent =
            "Unable to connect to server.";

    }

}
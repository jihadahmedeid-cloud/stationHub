const API_URL = "http://localhost:3000";


// ===============================
// DOM Elements
// ===============================

const stationButtons = document.querySelectorAll(".station");

const stationName = document.getElementById("station-name");
const viewerCount = document.getElementById("viewer-count");
const messagesContainer = document.getElementById("messages");
const currentDate = document.getElementById("current-date");
const searchInput = document.getElementById("search");


// ===============================
// Current Station
// ===============================

let currentStation = "ramses";


// ===============================
// Socket.io Connection
// ===============================

const socket = io(API_URL);


// ===============================
// Socket Connected
// ===============================

socket.on("connect", () => {

    console.log("Socket connected:", socket.id);

    // Join default station
    socket.emit("joinStation", currentStation);

});


// ===============================
// Presence Update
// ===============================

socket.on("presenceUpdate", (data) => {

    console.log("Presence update:", data);

    if (data.stationId.toLowerCase() === currentStation.toLowerCase()) {

        viewerCount.textContent = data.count;

    }

});


// ===============================
// New Message
// ===============================

socket.on("newMessage", (data) => {

    console.log("New announcement:", data);

    addMessage(data);

});


// ===============================
// Load Messages
// ===============================

async function loadMessages(station) {

    try {

        const response = await fetch(
            `${API_URL}/api/v1/stations/${station}/updates`
        );

        const result = await response.json();

        console.log("Messages:", result);


        if (!response.ok) {

            throw new Error(
                result.message || "Failed to load messages"
            );

        }


        messagesContainer.innerHTML = "";


        result.data.forEach(message => {

            addMessage(message);

        });


    } catch (error) {

        console.error("Error loading messages:", error);

        messagesContainer.innerHTML = `
            <div class="message">
                <p>Unable to load announcements.</p>
            </div>
        `;

    }

}


// ===============================
// Add Message To Page
// ===============================

function addMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.classList.add("message");


    const date = new Date(message.createdAt);

    const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });


    const status = message.status.toUpperCase();


    messageElement.innerHTML = `
        <div class="message-info">

            <span class="time">
                ${time}
            </span>

            <span class="tag ${message.status}">
                ${status}
            </span>

        </div>

        <p>
            ${message.message}
        </p>
    `;


    // Newest message appears at the top
    messagesContainer.prepend(messageElement);

}


// ===============================
// Change Station
// ===============================

stationButtons.forEach(button => {

    button.addEventListener("click", () => {

        const station = button.dataset.station;

        changeStation(station);

    });

});


function changeStation(station) {

    currentStation = station.toLowerCase();


    // Update active button
    stationButtons.forEach(button => {

        button.classList.remove("active");

    });


    const selectedButton =
        document.querySelector(
            `.station[data-station="${currentStation}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add("active");

    }


    // Update station title

    stationName.textContent =
        capitalize(currentStation) + " Station";


    // Reset viewer count while switching

    viewerCount.textContent = "0";


    // Tell Socket.io to join the new station

    socket.emit("joinStation", currentStation);


    // Load announcements for the new station

    loadMessages(currentStation);

}


// ===============================
// Search Stations
// ===============================

searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase();


    stationButtons.forEach(button => {

        const name =
            button.dataset.station.toLowerCase();


        if (name.includes(searchValue)) {

            button.style.display = "flex";

        } else {

            button.style.display = "none";

        }

    });

});


// ===============================
// Current Date
// ===============================

function updateDate() {

    const now = new Date();

    currentDate.textContent =
        now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

}


// ===============================
// Capitalize Station Name
// ===============================

function capitalize(text) {

    return text.charAt(0).toUpperCase() + text.slice(1);

}


// ===============================
// Initial Page Load
// ===============================

updateDate();

loadMessages(currentStation);
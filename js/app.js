console.log("HostelHub JavaScript is connected!");

// ========================================
// ROOM DATA
// ========================================

const roomData = {

    "101": {
        name: "Room 101",
        type: "Single Sharing",
        floor: "1st Floor",
        rent: 6000,
        occupancy: "1 Person",
        status: "Available",
        image: "assets/images/room1.jpg"
    },

    "102": {
        name: "Room 102",
        type: "Double Sharing",
        floor: "1st Floor",
        rent: 5500,
        occupancy: "1/2 Occupied",
        status: "Available",
        image: "assets/images/room2.jpg"
    },

    "201": {
        name: "Room 201",
        type: "Triple Sharing",
        floor: "2nd Floor",
        rent: 4500,
        occupancy: "2/3 Occupied",
        status: "Available",
        image: "assets/images/room3.jpg"
    },

    "205": {
        name: "Room 205",
        type: "Triple Sharing",
        floor: "2nd Floor",
        rent: 4500,
        occupancy: "2/3 Occupied",
        status: "Available",
        image: "assets/images/room3.jpg"
    },

    "301": {
        name: "Room 301",
        type: "Single Sharing",
        floor: "3rd Floor",
        rent: 6500,
        occupancy: "1 Person",
        status: "Available",
        image: "assets/images/room1.jpg"
    },

    "308": {
        name: "Room 308",
        type: "Double Sharing",
        floor: "3rd Floor",
        rent: 5500,
        occupancy: "2/2 Occupied",
        status: "Partial",
        image: "assets/images/room2.jpg"
    }

};

// ========================================
// ROOM FILTERS
// ========================================

const roomSearch = document.getElementById("roomSearch");
const roomTypeFilter = document.getElementById("roomTypeFilter");
const rentFilter = document.getElementById("rentFilter");
const rooms = document.querySelectorAll("#roomsGrid .room-card");


function filterRooms() {

    const searchValue = roomSearch
        ? roomSearch.value.toLowerCase().trim()
        : "";

    const selectedType = roomTypeFilter
        ? roomTypeFilter.value
        : "all";

    const selectedRent = rentFilter
        ? rentFilter.value
        : "all";

    const noRoomsMessage =
    document.getElementById("noRoomsMessage");

let visibleRooms = 0;
    rooms.forEach(function(room) {

        const roomNumber =
            room.querySelector("h3").textContent.toLowerCase();

        const roomType =
            room.dataset.type;

        const roomRent =
            Number(room.dataset.rent);


        const matchesSearch =
            roomNumber.includes(searchValue);

        const matchesType =
            selectedType === "all" ||
            roomType === selectedType;

        const matchesRent =
            selectedRent === "all" ||
            roomRent <= Number(selectedRent);

        
        if (matchesSearch && matchesType && matchesRent) 
            {
            room.style.display = "";
            }
        else 
            {
            room.style.display = "none";
            }
    });
        if (noRoomsMessage) {

    if (visibleRooms === 0) {
        noRoomsMessage.style.display = "block";
    } else {
        noRoomsMessage.style.display = "none";
    }

}
}


// Search

if (roomSearch) {

    roomSearch.addEventListener(
        "input",
        filterRooms
    );

}


// Room type filter

if (roomTypeFilter) {

    roomTypeFilter.addEventListener(
        "change",
        filterRooms
    );

}


// Rent filter

if (rentFilter) {

    rentFilter.addEventListener(
        "change",
        filterRooms
    );

}


// Clear filters

function clearRoomFilters() {

    if (roomSearch) {
        roomSearch.value = "";
    }

    if (roomTypeFilter) {
        roomTypeFilter.value = "all";
    }

    if (rentFilter) {
        rentFilter.value = "all";
    }

    filterRooms();

}
// ========================================
// ROOM DETAILS
// ========================================

const urlParams = new URLSearchParams(
    window.location.search
);

const roomId = urlParams.get("id");

const selectedRoom = roomData[roomId];
console.log("URL Room ID:", roomId);
console.log("Selected Room:", selectedRoom);
if (selectedRoom &&
    document.getElementById("detailRoomName")) {

    const detailRoomName =
        document.getElementById("detailRoomName");

    const detailRoomType =
        document.getElementById("detailRoomType");

    const detailRoomRent =
        document.getElementById("detailRoomRent");

    const detailOccupancy =
        document.getElementById("detailOccupancy");

    const detailFloor =
        document.getElementById("detailFloor");

    const detailType =
        document.getElementById("detailType");

    const detailAvailability =
        document.getElementById("detailAvailability");

    const detailRoomImage =
        document.getElementById("detailRoomImage");

    const detailRoomStatus =
        document.getElementById("detailRoomStatus");


    detailRoomName.textContent =
        selectedRoom.name;


    detailRoomType.textContent =
        `${selectedRoom.type} • ${selectedRoom.floor}`;


    detailRoomRent.textContent =
        `₹${selectedRoom.rent.toLocaleString("en-IN")}`;


    detailOccupancy.textContent =
        selectedRoom.occupancy;


    detailFloor.textContent =
        selectedRoom.floor;


    detailType.textContent =
        selectedRoom.type;


    detailAvailability.textContent =
        selectedRoom.status;


    detailRoomImage.src =
        selectedRoom.image;


    detailRoomStatus.textContent =
        selectedRoom.status;


    if (selectedRoom.status === "Partial") {

        detailRoomStatus.classList.remove(
            "available"
        );

        detailRoomStatus.classList.add(
            "partial"
        );

    }
    const applyRoomBtn =
    document.getElementById("applyRoomBtn");

if (applyRoomBtn) {

   applyRoomBtn.href =
    `apply.html?id=${roomId}`;

}
}
// ========================================
// ROOM APPLICATION PAGE
// ========================================

const applyRoomId =
    new URLSearchParams(window.location.search).get("id");

if (
    applyRoomId &&
    document.getElementById("applyRoomName")
) {

    const applyRoom =
        roomData[applyRoomId];

    if (applyRoom) {

        document.getElementById(
            "applyRoomName"
        ).textContent =
            applyRoom.name;

        document.getElementById(
            "applyRoomType"
        ).textContent =
            applyRoom.type;

        document.getElementById(
            "applyRoomRent"
        ).textContent =
            `₹${applyRoom.rent.toLocaleString("en-IN")} / month`;

        document.getElementById(
            "applyRoomFloor"
        ).textContent =
            applyRoom.floor;

    }

}
// ========================================
// SAVE ROOM APPLICATION
// ========================================

const applicationForm =
    document.getElementById("roomApplicationForm");

if (applicationForm) {

    applicationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const application = {
            id: Date.now(),
            roomId: applyRoomId,
            roomName: document.getElementById("applyRoomName").textContent,
            status: "Pending",
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            college: document.getElementById("college").value,
            address: document.getElementById("address").value,
            submittedAt: new Date().toISOString()
        };

        const existingApplications =
            JSON.parse(
                localStorage.getItem("hostelApplications")
            ) || [];

        existingApplications.push(application);

        localStorage.setItem(
            "hostelApplications",
            JSON.stringify(existingApplications)
        );

        alert("Application submitted successfully!");

    });

}
// ========================================
// DISPLAY SAVED APPLICATIONS
// ========================================

const applicationList =
    document.getElementById("applicationList");

if (applicationList) {

    const statusFilter =
        document.getElementById("statusFilter");
    function getStatusBadge(status) {

        const currentStatus = status || "Pending";

        return `
            <span class="status-badge status-${currentStatus.toLowerCase()}">
                ${currentStatus}
            </span>
        `;

    }
    function displayApplications(filter = "All") {

        const savedApplications =
            JSON.parse(
                localStorage.getItem("hostelApplications")
            ) || [];

        const filteredApplications =
            filter === "All"
                ? savedApplications
                : savedApplications.filter(
                    application =>
                        (application.status || "Pending") === filter
                );

        if (filteredApplications.length > 0) {

            applicationList.innerHTML =
                filteredApplications.map(application => `

                    <div class="selected-room-card">

                        <h2>Application Details</h2>

                        <p>
                            <strong>Room:</strong>
                            ${application.roomName}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            ${getStatusBadge(application.status)}
                        </p>

                        <p>
                            <strong>Name:</strong>
                            ${application.fullName}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${application.email}
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            ${application.phone}
                        </p>

                        <p>
                            <strong>College:</strong>
                            ${application.college}
                        </p>

                        <p>
                            <strong>Address:</strong>
                            ${application.address}
                        </p>

                        <p>
                            <strong>Submitted:</strong>
                            ${new Date(application.submittedAt).toLocaleString("en-IN")}
                        </p>
                        <div class="application-actions">

                            <button
                                onclick="updateApplicationStatus(${application.id}, 'Approved')"
                            >
                                Approve
                            </button>

                            <button
                                onclick="updateApplicationStatus(${application.id}, 'Rejected')"
                            >
                                Reject
                            </button>

                            <button
                                onclick="deleteApplication(${application.id})"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                `).join("");

        } else {

            applicationList.innerHTML = `
                <p>No applications found.</p>
            `;

        }

    }

    displayApplications();

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                displayApplications(
                    statusFilter.value
                );

            }
        );

    }

}

// ========================================
// UPDATE APPLICATION STATUS
// ========================================

function updateApplicationStatus(applicationId, newStatus) {

    const applications =
        JSON.parse(
            localStorage.getItem("hostelApplications")
        ) || [];

    const application =
        applications.find(
            app => app.id === applicationId
        );

    if (application) {

        application.status = newStatus;

        localStorage.setItem(
            "hostelApplications",
            JSON.stringify(applications)
        );

        location.reload();

    }

}
// ========================================
// DELETE APPLICATION
// ========================================

function deleteApplication(applicationId) {

    const confirmDelete =
        confirm("Are you sure you want to delete this application?");

    if (!confirmDelete) {
        return;
    }

    const applications =
        JSON.parse(
            localStorage.getItem("hostelApplications")
        ) || [];

    const updatedApplications =
        applications.filter(
            application => application.id !== applicationId
        );

    localStorage.setItem(
        "hostelApplications",
        JSON.stringify(updatedApplications)
    );

    location.reload();

}
// ========================================
// ADMIN DASHBOARD
// ========================================

const totalApplications =
    document.getElementById("totalApplications");

if (totalApplications) {

    const applications =
        JSON.parse(
            localStorage.getItem("hostelApplications")
        ) || [];

    const pendingCount =
        applications.filter(
            application =>
                (application.status || "Pending") === "Pending"
        ).length;

    const approvedCount =
        applications.filter(
            application =>
                application.status === "Approved"
        ).length;

    const rejectedCount =
        applications.filter(
            application =>
                application.status === "Rejected"
        ).length;

    totalApplications.textContent =
        applications.length;

    document.getElementById(
        "pendingApplications"
    ).textContent = pendingCount;

    document.getElementById(
        "approvedApplications"
    ).textContent = approvedCount;

    document.getElementById(
        "rejectedApplications"
    ).textContent = rejectedCount;

}
// ========================================
// DASHBOARD APPLICATION LIST
// ========================================

const dashboardApplications =
    document.getElementById("dashboardApplications");

if (dashboardApplications) {

    const applications =
        JSON.parse(
            localStorage.getItem("hostelApplications")
        ) || [];

    if (applications.length > 0) {

        dashboardApplications.innerHTML = `
            <div class="selected-room-card">

                <h2>Recent Applications</h2>

                ${applications.map(application => `

                    <div class="dashboard-application">

                        <p>
                            <strong>Room:</strong>
                            ${application.roomName}
                        </p>

                        <p>
                            <strong>Name:</strong>
                            ${application.fullName}
                        </p>

                       <p>
                            <strong>Status:</strong>
                            ${getStatusBadge(application.status)}
                        </p>

                    </div>

                `).join("")}

            </div>
        `;

    } else {

        dashboardApplications.innerHTML = `
            <div class="selected-room-card">
                <p>No applications found.</p>
            </div>
        `;

    }

}
// ========================================
// CLEAR ALL APPLICATIONS
// ========================================

function clearAllApplications() {

    const confirmClear =
        confirm("Are you sure you want to clear all applications?");

    if (!confirmClear) {
        return;
    }

    localStorage.removeItem("hostelApplications");

    location.reload();

}
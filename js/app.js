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

    const savedApplications =
        JSON.parse(
            localStorage.getItem("hostelApplications")
        ) || [];

    if (savedApplications.length > 0) {

        applicationList.innerHTML =
            savedApplications.map(application => `

                <div class="selected-room-card">

                    <h2>Application Details</h2>

                    <p>
                        <strong>Room:</strong>
                        ${application.roomName}
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

                </div>

            `).join("");

    } else {

        applicationList.innerHTML = `
            <p>No applications found.</p>
        `;

    }

}
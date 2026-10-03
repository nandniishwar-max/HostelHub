// ============================================================
// HostelHub — Dynamic Room Rendering + Filters
// ============================================================

function renderRooms() {
    var rooms  = getData("rooms", defaultRooms);
    var grid   = document.getElementById("roomsGrid");
    var countEl = document.getElementById("availableRoomCount");
    if (!grid) return;

    var available = rooms.filter(function (r) { return r.status !== "Full"; });
    if (countEl) countEl.textContent = available.length;

    if (rooms.length === 0) {
        grid.innerHTML = "";
        document.getElementById("noRoomsMessage").style.display = "block";
        return;
    }

    grid.innerHTML = rooms.map(function (r) {
        var typeKey   = r.type.toLowerCase();
        var isAvail   = r.occupied < r.capacity;
        var statusTxt = isAvail ? (r.occupied === 0 ? "Available" : "Partial") : "Full";
        var statusCls = isAvail ? (r.occupied === 0 ? "available" : "partial") : "full";
        var floorSuffix = r.floor === 1 ? "st" : r.floor === 2 ? "nd" : "rd";

        return "<div class='room-card' data-type='" + typeKey + "' data-rent='" + r.rent + "' data-room-type='" + typeKey + "'>" +
            "<div class='room-image'>" +
                "<img src='assets/images/room" + ((r.id % 3) || 3) + ".jpg' alt='Room " + r.number + "'>" +
                "<span class='room-status " + statusCls + "'>" + statusTxt + "</span>" +
            "</div>" +
            "<div class='room-content'>" +
                "<h3>Room " + r.number + "</h3>" +
                "<p class='room-type'>" + r.type + " Sharing &bull; " + r.floor + floorSuffix + " Floor</p>" +
                "<p class='room-rent'>" + formatCurrency(r.rent) + " <span>/ month</span></p>" +
                "<div class='room-info'>" +
                    "<span>👤 " + r.occupied + "/" + r.capacity + " Occupied</span>" +
                    "<span>" + (isAvail ? "✓ " : "✗ ") + statusTxt + "</span>" +
                "</div>" +
                "<p class='room-availability " + statusCls + "'>" + (statusTxt === "Partial" ? "Partially Occupied" : statusTxt) + "</p>" +
                "<a href='room-details.html?id=" + r.id + "' class='room-button'>View Details</a>" +
            "</div>" +
        "</div>";
    }).join("");

    // Apply any pre-set URL filter
    applyUrlFilters();
}

// ── Filters ──────────────────────────────────────────────────

function filterRooms() {
    var roomSearch     = document.getElementById("roomSearch");
    var roomTypeFilter = document.getElementById("roomTypeFilter");
    var rentFilter     = document.getElementById("rentFilter");

    var searchValue  = roomSearch     ? roomSearch.value.toLowerCase().trim()  : "";
    var selectedType = roomTypeFilter ? roomTypeFilter.value                   : "all";
    var selectedRent = rentFilter     ? rentFilter.value                       : "all";

    var cards          = document.querySelectorAll("#roomsGrid .room-card");
    var noRoomsMessage = document.getElementById("noRoomsMessage");
    var visibleRooms   = 0;

    cards.forEach(function (card) {
        var roomNumber = card.querySelector("h3").textContent.toLowerCase();
        var roomType   = card.dataset.type;
        var roomRent   = Number(card.dataset.rent);

        var matchesSearch = roomNumber.includes(searchValue);
        var matchesType   = selectedType === "all" || roomType === selectedType;
        var matchesRent   = selectedRent === "all" || roomRent <= Number(selectedRent);

        if (matchesSearch && matchesType && matchesRent) {
            card.style.display = "";
            visibleRooms++;
        } else {
            card.style.display = "none";
        }
    });

    if (noRoomsMessage) {
        noRoomsMessage.style.display = visibleRooms === 0 ? "block" : "none";
    }
}

function clearRoomFilters() {
    var roomSearch     = document.getElementById("roomSearch");
    var roomTypeFilter = document.getElementById("roomTypeFilter");
    var rentFilter     = document.getElementById("rentFilter");
    if (roomSearch)     roomSearch.value     = "";
    if (roomTypeFilter) roomTypeFilter.value = "all";
    if (rentFilter)     rentFilter.value     = "all";
    filterRooms();
}

function applyUrlFilters() {
    var params       = new URLSearchParams(window.location.search);
    var typeParam    = params.get("type");
    var roomTypeFilter = document.getElementById("roomTypeFilter");
    if (typeParam && roomTypeFilter) {
        roomTypeFilter.value = typeParam;
        filterRooms();
    }
}

// ── Attach listeners ─────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
    renderRooms();

    var roomSearch = document.getElementById("roomSearch");
    if (roomSearch) roomSearch.addEventListener("input", filterRooms);

    var roomTypeFilter = document.getElementById("roomTypeFilter");
    if (roomTypeFilter) roomTypeFilter.addEventListener("change", filterRooms);

    var rentFilter = document.getElementById("rentFilter");
    if (rentFilter) rentFilter.addEventListener("change", filterRooms);
});

// ── Home page college search redirect ────────────────────────

function searchCollege() {
    var college  = document.getElementById("collegeSearch");
    var roomType = document.getElementById("roomTypeSearch");
    var url = "rooms.html?";
    if (college && college.value.trim()) {
        url += "college=" + encodeURIComponent(college.value.trim()) + "&";
    }
    if (roomType && roomType.value !== "all") {
        url += "type=" + encodeURIComponent(roomType.value);
    }
    window.location.href = url;
}

// ── Geolocation stub (index.html) ────────────────────────────

function useCurrentLocation() {
    if (!navigator.geolocation) {
        showMessage("Geolocation is not supported by your browser.", "error");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            window.location.href = "location.html?lat=" + lat + "&lng=" + lng;
        },
        function () {
            showMessage("Location access denied. You can still search by college name.", "info");
        }
    );
}

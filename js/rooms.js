document.addEventListener("DOMContentLoaded", function () {


    // =====================================================
    // GET COLLEGE FROM URL
    // =====================================================

    const params =
        new URLSearchParams(window.location.search);

    const collegeId =
        params.get("collegeId");



    // =====================================================
    // GET DATA FROM LOCAL STORAGE
    // =====================================================

    const pgs =
        JSON.parse(
            localStorage.getItem("pgs")
        ) || [];


    const colleges =
        JSON.parse(
            localStorage.getItem("colleges")
        ) || [];



    // =====================================================
    // FIND SELECTED COLLEGE
    // =====================================================

    const selectedCollege =
        colleges.find(function (college) {

            return college.id === collegeId;

        });



    // =====================================================
    // GET HTML ELEMENTS
    // =====================================================

    const roomsGrid =
        document.getElementById("roomsGrid");


    const resultsTitle =
        document.getElementById("resultsTitle");


    const resultsSubtitle =
        document.getElementById("resultsSubtitle");


    const availableRoomCount =
        document.getElementById(
            "availableRoomCount"
        );


    const roomSearch =
        document.getElementById(
            "roomSearch"
        );


    const roomTypeFilter =
        document.getElementById(
            "roomTypeFilter"
        );


    const rentFilter =
        document.getElementById(
            "rentFilter"
        );


    const sortFilter =
        document.getElementById(
            "sortFilter"
        );


    const clearFiltersBtn =
        document.getElementById(
            "clearFiltersBtn"
        );



    // =====================================================
    // CHECK WHETHER COLLEGE EXISTS
    // =====================================================

    if (!selectedCollege) {


        resultsTitle.textContent =
            "College Not Found";


        resultsSubtitle.textContent =
            "Please search for a supported college.";


        availableRoomCount.textContent =
            "0";


        roomsGrid.innerHTML = `

            <div class="no-results">

                <h2>
                    No college selected
                </h2>

                <p>
                    Please go back and search for your college.
                </p>

                <a href="index.html">
                    Back to Home
                </a>

            </div>

        `;


        return;

    }



    // =====================================================
    // UPDATE PAGE HEADER
    // =====================================================

    resultsTitle.textContent =
        `PGs Near ${selectedCollege.name}`;


    resultsSubtitle.textContent =
        `Find student accommodation near ${selectedCollege.name}, ${selectedCollege.area}.`;



    // =====================================================
    // GET PGs FOR SELECTED COLLEGE
    // =====================================================

    const collegePGs =
        pgs.filter(function (pg) {

            return (
                pg.college ===
                selectedCollege.name
            );

        });



    // =====================================================
    // CALCULATE MINIMUM PG PRICE
    // =====================================================

    function getMinimumPrice(pg) {

        const prices =
            Object.values(pg.sharing);

        return Math.min(...prices);

    }



    // =====================================================
    // FORMAT SHARING TYPE
    // =====================================================

    function formatSharing(type) {


        const names = {

            single: "Single",

            double: "Double",

            triple: "Triple",

            four: "4 Sharing"

        };


        return (
            names[type] ||
            type
        );

    }



    // =====================================================
    // APPLY FILTERS + SORT
    // =====================================================

    function applyFilters() {


        // -------------------------------------------------
        // GET CURRENT FILTER VALUES
        // -------------------------------------------------

        const searchText =
            roomSearch.value
                .trim()
                .toLowerCase();


        const selectedSharing =
            roomTypeFilter.value;


        const maximumRent =
            rentFilter.value;


        const sortOption =
            sortFilter.value;



        // -------------------------------------------------
        // FILTER PGs
        // -------------------------------------------------

        let filteredPGs =
            collegePGs.filter(function (pg) {


                // -----------------------------------------
                // SEARCH
                // -----------------------------------------

                const matchesSearch =

                    !searchText ||

                    pg.name
                        .toLowerCase()
                        .includes(searchText) ||

                    pg.area
                        .toLowerCase()
                        .includes(searchText);



                // -----------------------------------------
                // SHARING
                // -----------------------------------------

                const matchesSharing =

                    selectedSharing === "all" ||

                    pg.sharing[
                        selectedSharing
                    ] !== undefined;



                // -----------------------------------------
                // RENT
                // -----------------------------------------

                let matchesRent = true;


                if (
                    maximumRent !==
                    "all"
                ) {


                    const minimumPrice =
                        getMinimumPrice(pg);


                    matchesRent =
                        minimumPrice <=
                        Number(maximumRent);

                }



                // -----------------------------------------
                // RETURN FILTER RESULT
                // -----------------------------------------

                return (

                    matchesSearch &&

                    matchesSharing &&

                    matchesRent

                );

            });



        // =================================================
        // SORT RESULTS
        // =================================================

        filteredPGs.sort(function (a, b) {


            // ---------------------------------------------
            // PRICE LOW → HIGH
            // ---------------------------------------------

            if (
                sortOption ===
                "price-low"
            ) {

                return (
                    getMinimumPrice(a) -
                    getMinimumPrice(b)
                );

            }



            // ---------------------------------------------
            // PRICE HIGH → LOW
            // ---------------------------------------------

            if (
                sortOption ===
                "price-high"
            ) {

                return (
                    getMinimumPrice(b) -
                    getMinimumPrice(a)
                );

            }



            // ---------------------------------------------
            // DISTANCE
            // ---------------------------------------------

            if (
                sortOption ===
                "distance"
            ) {

                return (
                    Number(a.distanceKm) -
                    Number(b.distanceKm)
                );

            }



            // ---------------------------------------------
            // RATING
            // ---------------------------------------------

            if (
                sortOption ===
                "rating"
            ) {

                return (
                    Number(b.rating) -
                    Number(a.rating)
                );

            }



            // ---------------------------------------------
            // RECOMMENDED
            // ---------------------------------------------

            return 0;

        });



        // =================================================
        // UPDATE RESULT COUNT
        // =================================================

        availableRoomCount.textContent =
            filteredPGs.length;



        // =================================================
        // DISPLAY RESULTS
        // =================================================

        renderPGs(filteredPGs);

    }



    // =====================================================
    // RENDER PG CARDS
    // =====================================================

    function renderPGs(pgList) {


        // Clear previous cards

        roomsGrid.innerHTML = "";



        // =================================================
        // NO RESULTS
        // =================================================

        if (
            pgList.length ===
            0
        ) {


            roomsGrid.innerHTML = `

                <div class="no-results">

                    <div class="no-rooms-icon">
                        🔍
                    </div>


                    <h2>
                        No PGs Found
                    </h2>


                    <p>
                        Try changing your search or filters.
                    </p>

                </div>

            `;


            return;

        }



        // =================================================
        // CREATE EACH PG CARD
        // =================================================

        pgList.forEach(function (pg) {


            // ---------------------------------------------
            // PRICE
            // ---------------------------------------------

            const minimumPrice =
                getMinimumPrice(pg);



            // ---------------------------------------------
            // SHARING TYPES
            // ---------------------------------------------

            const sharingTypes =
                Object.keys(
                    pg.sharing
                )
                .map(function (type) {

                    return formatSharing(type);

                })
                .join(" • ");



            // ---------------------------------------------
            // AMENITIES
            // ---------------------------------------------

            const amenities =
                pg.amenities
                    .slice(0, 4)
                    .map(function (amenity) {

                        return `

                            <span class="amenity">

                                ✓ ${amenity}

                            </span>

                        `;

                    })
                    .join("");



            // ---------------------------------------------
            // CREATE CARD
            // ---------------------------------------------

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "room-card pg-card";



            // ---------------------------------------------
            // CARD HTML
            // ---------------------------------------------

            card.innerHTML = `

                <div class="room-image">

                    <img
                        src="${pg.image}"
                        alt="${pg.name}"
                        onerror="
                            this.src='assets/images/room1.jpg'
                        "
                    >

                </div>


                <div class="room-content">


                    <h3>
                        ${pg.name}
                    </h3>


                    <p class="pg-location">
                        📍 ${pg.area}
                    </p>


                    <p class="pg-distance">
                        🚶 ${pg.distanceKm} km
                        from your college
                    </p>


                    <div class="pg-price">

                        ₹${minimumPrice.toLocaleString("en-IN")}

                        <span>
                            / month onwards
                        </span>

                    </div>


                    <p class="pg-sharing">

                        👥 ${sharingTypes}

                    </p>


                    <div class="pg-amenities">

                        ${amenities}

                    </div>


                    <div class="pg-bottom">


                        <span class="pg-rating">

                            ⭐ ${pg.rating}

                        </span>


                        <button
                            class="view-pg-btn"
                            data-pg-id="${pg.id}"
                        >

                            View Details

                        </button>


                    </div>

                </div>

            `;



            // Add card to grid

            roomsGrid.appendChild(card);

        });



        // =================================================
        // VIEW DETAILS BUTTONS
        // =================================================

        document
            .querySelectorAll(
                ".view-pg-btn"
            )
            .forEach(function (button) {


                button.addEventListener(
                    "click",
                    function () {


                        const pgId =
                            this.dataset.pgId;


                        window.location.href =
                            `room-details.html?pgId=${encodeURIComponent(pgId)}`;

                    }

                );

            });

    }



    // =====================================================
    // SEARCH EVENT
    // =====================================================

    roomSearch.addEventListener(
        "input",
        applyFilters
    );



    // =====================================================
    // SHARING FILTER EVENT
    // =====================================================

    roomTypeFilter.addEventListener(
        "change",
        applyFilters
    );



    // =====================================================
    // RENT FILTER EVENT
    // =====================================================

    rentFilter.addEventListener(
        "change",
        applyFilters
    );



    // =====================================================
    // SORT EVENT
    // =====================================================

    sortFilter.addEventListener(
        "change",
        applyFilters
    );



    // =====================================================
    // CLEAR ALL FILTERS
    // =====================================================

    clearFiltersBtn.addEventListener(
        "click",
        function () {


            roomSearch.value =
                "";


            roomTypeFilter.value =
                "all";


            rentFilter.value =
                "all";


            sortFilter.value =
                "default";


            applyFilters();

        }

    );



    // =====================================================
    // INITIAL DISPLAY
    // =====================================================

    applyFilters();


});
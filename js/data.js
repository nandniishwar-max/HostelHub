// ============================================================
// HostelHub — Default Data (Simulated Database)
// Load this file FIRST on every page before storage.js / auth.js
// ============================================================

const defaultUsers = [
    {
        id: 1,
        name: "Priya Sharma",
        email: "student@gmail.com",
        password: "1234",
        role: "student",
        phone: "9876543210",
        college: "KJ Somaiya College",
        address: "Mumbai, Maharashtra",
        roomId: 205,
        joinDate: "2026-07-01"
    },
    {
        id: 2,
        name: "Rahul Mehta",
        email: "rahul@gmail.com",
        password: "rahul123",
        role: "student",
        phone: "9123456789",
        college: "SIES College",
        address: "Navi Mumbai, Maharashtra",
        roomId: 101,
        joinDate: "2026-07-15"
    },
    {
        id: 3,
        name: "Hostel Admin",
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin",
        phone: "9000000001",
        college: null,
        address: "Mumbai, Maharashtra",
        roomId: null,
        joinDate: "2026-01-01"
    }
];

const defaultRooms = [
    {
        id: 101,
        number: "101",
        floor: 1,
        type: "Single",
        capacity: 1,
        occupied: 1,
        rent: 6000,
        status: "Full",
        facilities: ["Wi-Fi", "Fan", "Study Table"],
        image: "assets/images/room1.jpg"
    },
    {
        id: 102,
        number: "102",
        floor: 1,
        type: "Double",
        capacity: 2,
        occupied: 1,
        rent: 5500,
        status: "Available",
        facilities: ["Wi-Fi", "Fan", "Attached Bathroom"],
        image: "assets/images/room2.jpg"
    },
    {
        id: 201,
        number: "201",
        floor: 2,
        type: "Triple",
        capacity: 3,
        occupied: 2,
        rent: 4500,
        status: "Available",
        facilities: ["Wi-Fi", "Fan", "Study Table"],
        image: "assets/images/room3.jpg"
    },
    {
        id: 205,
        number: "205",
        floor: 2,
        type: "Triple",
        capacity: 3,
        occupied: 2,
        rent: 4500,
        status: "Available",
        facilities: ["Wi-Fi", "Fan", "Attached Bathroom", "Study Table"],
        image: "assets/images/room3.jpg"
    },
    {
        id: 301,
        number: "301",
        floor: 3,
        type: "Single",
        capacity: 1,
        occupied: 0,
        rent: 6500,
        status: "Available",
        facilities: ["Wi-Fi", "Fan", "Study Table", "Wardrobe"],
        image: "assets/images/room1.jpg"
    },
    {
        id: 308,
        number: "308",
        floor: 3,
        type: "Double",
        capacity: 2,
        occupied: 2,
        rent: 5500,
        status: "Full",
        facilities: ["Wi-Fi", "Fan", "Attached Bathroom"],
        image: "assets/images/room2.jpg"
    }
];

// One payment record per student per month
const defaultPayments = [
    { id: 1, userId: 1, roomId: 205, amount: 4500, month: "October 2026",   dueDate: "2026-10-10", status: "Pending", paidDate: null },
    { id: 2, userId: 1, roomId: 205, amount: 4500, month: "September 2026", dueDate: "2026-09-10", status: "Paid",    paidDate: "2026-09-08" },
    { id: 3, userId: 1, roomId: 205, amount: 4500, month: "August 2026",    dueDate: "2026-08-10", status: "Paid",    paidDate: "2026-08-07" },
    { id: 4, userId: 1, roomId: 205, amount: 4500, month: "July 2026",      dueDate: "2026-07-10", status: "Paid",    paidDate: "2026-07-09" },
    { id: 5, userId: 2, roomId: 101, amount: 6000, month: "October 2026",   dueDate: "2026-10-10", status: "Pending", paidDate: null },
    { id: 6, userId: 2, roomId: 101, amount: 6000, month: "September 2026", dueDate: "2026-09-10", status: "Paid",    paidDate: "2026-09-09" }
];

const defaultComplaints = [
    {
        id: 1024,
        userId: 1,
        title: "Fan not working",
        category: "Electrical",
        priority: "High",
        description: "The ceiling fan in Room 205 stops working after a few minutes of operation.",
        status: "In Progress",
        submittedDate: "2026-09-28",
        resolvedDate: null
    },
    {
        id: 1025,
        userId: 2,
        title: "Water leakage in bathroom",
        category: "Plumbing",
        priority: "High",
        description: "There is a water leakage from the tap in Room 101 bathroom.",
        status: "Pending",
        submittedDate: "2026-10-01",
        resolvedDate: null
    },
    {
        id: 1026,
        userId: 1,
        title: "Wi-Fi connectivity issue",
        category: "Network",
        priority: "Medium",
        description: "Wi-Fi signal is very weak near Room 205. Pages take too long to load.",
        status: "Resolved",
        submittedDate: "2026-09-15",
        resolvedDate: "2026-09-18"
    }
];

const defaultAnnouncements = [
    {
        id: 1,
        title: "Hostel Maintenance — Water Supply",
        description: "Water supply will be unavailable on 5th October from 10 AM to 2 PM due to pipeline maintenance. Please store water accordingly.",
        date: "2026-10-03",
        postedBy: "Admin"
    },
    {
        id: 2,
        title: "Mess Timing Updated",
        description: "Dinner will now be served from 7:30 PM to 9:00 PM starting from 1st October. Breakfast remains at 7:30 AM – 9:00 AM.",
        date: "2026-09-30",
        postedBy: "Admin"
    },
    {
        id: 3,
        title: "Common Room Renovation",
        description: "The common room on the 2nd floor will be renovated from 8th to 12th October. It will remain closed during this period.",
        date: "2026-09-25",
        postedBy: "Admin"
    }
];

const defaultApplications = [
    {
        id: 2001,
        userId: 1,
        roomId: 205,
        roomName: "Room 205",
        status: "Approved",
        fullName: "Priya Sharma",
        email: "student@gmail.com",
        phone: "9876543210",
        college: "KJ Somaiya College",
        address: "Mumbai, Maharashtra",
        submittedAt: "2026-07-01T10:00:00.000Z"
    },
    {
        id: 2002,
        userId: 2,
        roomId: 101,
        roomName: "Room 101",
        status: "Approved",
        fullName: "Rahul Mehta",
        email: "rahul@gmail.com",
        phone: "9123456789",
        college: "SIES College",
        address: "Navi Mumbai, Maharashtra",
        submittedAt: "2026-07-15T10:00:00.000Z"
    }
];

// ── Location data (colleges + nearby PGs/hostels) ──────────
const defaultColleges = [
    { name: "KJ Somaiya College",   lat: 19.0726, lng: 72.9002 },
    { name: "SIES College",         lat: 19.0496, lng: 73.0699 },
    { name: "Mithibai College",     lat: 19.1005, lng: 72.8369 },
    { name: "Jai Hind College",     lat: 18.9640, lng: 72.8290 },
    { name: "St. Xavier's College", lat: 18.9430, lng: 72.8296 },
    { name: "Ruia College",         lat: 19.0217, lng: 72.8562 },
    { name: "Sydenham College",     lat: 18.9375, lng: 72.8364 },
    { name: "Wilson College",       lat: 18.9598, lng: 72.8204 }
];

const defaultNearbyHostels = [
    { id: 1, name: "Sunshine PG",       lat: 19.0740, lng: 72.9030, rent: 8000, type: "PG",     gender: "Girls", distance: "0.3 km", facilities: ["Wi-Fi", "Meals", "Laundry"] },
    { id: 2, name: "Student Residency", lat: 19.0700, lng: 72.8970, rent: 7000, type: "Hostel", gender: "Boys",  distance: "0.5 km", facilities: ["Wi-Fi", "Security", "Parking"] },
    { id: 3, name: "Green Valley PG",   lat: 19.0756, lng: 72.8990, rent: 6500, type: "PG",     gender: "Girls", distance: "0.6 km", facilities: ["Wi-Fi", "Meals"] },
    { id: 4, name: "Metro Boys Hostel", lat: 19.0715, lng: 72.9050, rent: 5500, type: "Hostel", gender: "Boys",  distance: "0.8 km", facilities: ["Wi-Fi", "Study Room"] },
    { id: 5, name: "Comfort Zone PG",   lat: 19.0498, lng: 73.0720, rent: 7500, type: "PG",     gender: "Mixed", distance: "0.4 km", facilities: ["Wi-Fi", "Meals", "Gym"] },
    { id: 6, name: "Scholar's Inn",     lat: 19.0480, lng: 73.0680, rent: 6000, type: "Hostel", gender: "Boys",  distance: "0.6 km", facilities: ["Wi-Fi", "Study Room"] },
    { id: 7, name: "Lakeside Hostel",   lat: 19.1010, lng: 72.8350, rent: 9000, type: "PG",     gender: "Girls", distance: "0.3 km", facilities: ["Wi-Fi", "Meals", "Laundry", "Gym"] },
    { id: 8, name: "Campus View PG",    lat: 19.1020, lng: 72.8390, rent: 8500, type: "PG",     gender: "Mixed", distance: "0.5 km", facilities: ["Wi-Fi", "Meals", "Security"] }
];

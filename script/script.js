import { tableData } from "/db/db.js"; // Added .js extension

// Wait for DOM to be fully loaded before accessing any elements
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, tableData:", tableData); // Debug log
    
    // Get DOM elements after DOM is ready
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const closeBtn = document.getElementById("closeBtn");

    console.log("Elements found:", { sidebar, menuToggle, closeBtn }); // Debug log

    // Toggle sidebar functions
    function showMenu() {
        console.log("Opening menu"); // Debug log
        sidebar.classList.add("open");
    }

    function closeMenu() {
        console.log("Closing menu"); // Debug log
        sidebar.classList.remove("open");
    }

    // Add event listeners only if elements exist
    if (menuToggle) {
        menuToggle.addEventListener("click", showMenu);
        console.log("Menu toggle listener added"); // Debug log
    } else {
        console.error("menuToggle element not found!"); // Debug log
    }
    
    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
        console.log("Close button listener added"); // Debug log
    } else {
        console.error("closeBtn element not found!"); // Debug log
    }

    // Search functionality on table
    const tableSearch = document.getElementById("tableSearch");
    if (tableSearch) {
        tableSearch.addEventListener("keyup", function () {
            const searchValue = this.value.toLowerCase();
            const rows = document.querySelectorAll("#myTable tbody tr");

            rows.forEach(row => {
                const rowText = row.innerText.toLowerCase();
                row.style.display = rowText.includes(searchValue) ? "" : "none";
            });
        });
        console.log("Table search listener added"); // Debug log
    }

    // Table rendering
    const tbody = document.getElementById("table-body");
    if (tbody && tableData) {
        let rows = "";
        tableData.forEach(data => {
            rows += `<tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.position}</td>
                <td>${data.office}</td>
            </tr>`;
        });
        tbody.innerHTML = rows;
        console.log("Table rendered with", tableData.length, "rows"); // Debug log
    } else {
        console.error("tbody or tableData not found!", { tbody, tableData }); // Debug log
    }

    // Charts initialization
    const ctx = document.getElementById("myChart")?.getContext("2d");
    if (ctx) {
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [{
                    data: [12, 19, 8, 15, 10],
                    backgroundColor: "rgba(54, 162, 235, 0.8)",
                }],
            },
            options: { responsive: true, maintainAspectRatio: false },
        });
        console.log("Bar chart created"); // Debug log
    } else {
        console.log("Bar chart canvas not found"); // Debug log
    }

    const lineGraph = document.getElementById("myLine")?.getContext("2d");
    if (lineGraph) {
        new Chart(lineGraph, {
            type: "line",
            data: {
                labels: [
                    "Jan", "Feb", "Mar", "Apr", "May",
                    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ],
                datasets: [{
                    data: [12, 19, 34, 10, 5, 6, 7, 8, 19, 15, 12, 11],
                    backgroundColor: "rgba(54, 162, 235, 0.9)",
                    fill: true,
                }],
            },
            options: { responsive: true, maintainAspectRatio: false },
        });
        console.log("Line chart created"); // Debug log
    } else {
        console.log("Line chart canvas not found"); // Debug log
    }
    
    const pieChartCtx = document.getElementById("officePieChart")?.getContext("2d");
    if (pieChartCtx) {
        new Chart(pieChartCtx, {
            type: "pie",
            data: {
                labels: ["New York", "London", "Paris", "Berlin", "San Francisco", "Tokyo", "Toronto", "Sydney", "Amsterdam", "Dubai"],
                datasets: [{
                    label: "Office Distribution",
                    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                        "#FF9F40",
                        "#E7E9ED",
                        "#71B37C",
                        "#F7464A",
                        "#46BFBD"
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                    }
                }
            }
        });
        console.log("Pie chart created"); // Debug log
    } else {
        console.log("Pie chart canvas not found"); // Debug log
    }
});
import { tableData } from "/db/db.js";

// Dark Mode functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle icon based on theme
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = theme === 'dark' ? 
        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>` :
        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
    themeToggle.innerHTML = icon;
}

// Mini Calendar functionality
class MiniCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        this.dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    }

    init() {
        this.render();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.render();
        });
    }

    render() {
        this.renderHeader();
        this.renderDays();
    }

    renderHeader() {
        const monthYear = document.getElementById('monthYear');
        monthYear.textContent = `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    }

    renderDays() {
        const grid = document.getElementById('calendarGrid');
        grid.innerHTML = '';

        // Add day headers
        this.dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });

        // Get first day of month and number of days
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const today = new Date();

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            grid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            const currentDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
            
            // Check if it's today
            if (currentDay.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }

            // Add click event
            dayElement.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                if (!dayElement.classList.contains('today')) {
                    dayElement.classList.add('selected');
                }
                
                this.selectedDate = currentDay;
                console.log('Selected date:', currentDay.toDateString());
            });

            grid.appendChild(dayElement);
        }
    }
}

// Wait for DOM to be fully loaded before accessing any elements
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, tableData:", tableData);
    
    // Initialize theme
    initTheme();
    
    // Initialize mini calendar
    const calendar = new MiniCalendar();
    calendar.init();
    
    // Get DOM elements after DOM is ready
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const closeBtn = document.getElementById("closeBtn");

    console.log("Elements found:", { sidebar, menuToggle, closeBtn });

    // Toggle sidebar functions
    function showMenu() {
        console.log("Opening menu");
        sidebar.classList.add("open");
    }

    function closeMenu() {
        console.log("Closing menu");
        sidebar.classList.remove("open");
    }

    // Add event listeners only if elements exist
    if (menuToggle) {
        menuToggle.addEventListener("click", showMenu);
        console.log("Menu toggle listener added");
    } else {
        console.error("menuToggle element not found!");
    }
    
    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
        console.log("Close button listener added");
    } else {
        console.error("closeBtn element not found!");
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
        console.log("Table search listener added");
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
        console.log("Table rendered with", tableData.length, "rows");
    } else {
        console.error("tbody or tableData not found!", { tbody, tableData });
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
        console.log("Bar chart created");
    } else {
        console.log("Bar chart canvas not found");
    }

    const lineGraph = document.getElementById("myLine")?.getContext("2d");
    if (lineGraph) {
        new Chart(lineGraph, {
            type: "line",
            data:
            {
                labels: [
                    "Jan", "Feb", "Mar", "Apr", "May",
                    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                ],
                datasets: 
                [{
                    data: [12, 19, 34, 10, 5, 6, 7, 8, 19, 15, 12, 11],
                    backgroundColor: "rgba(54, 162, 235, 0.9)",
                    fill: true,
                }],
            },
            options: { responsive: true, maintainAspectRatio: false },
        });
        console.log("Line chart created");
    } else {
        console.log("Line chart canvas not found");
    }
    
    const pieChartCtx = document.getElementById("officePieChart")?.getContext("2d");
    if (pieChartCtx) {
        new Chart(pieChartCtx, {
            type: "pie",
            data: {
                labels: ["New York", "London", "Paris", "Berlin", "San Francisco"],
                datasets: [{
                    label: "Office Distribution",
                    data: [5, 3, 4, 2, 6],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF"
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
        console.log("Pie chart created");
    } else {
        console.log("Pie chart canvas not found");
    }
      const radarCtx = document.getElementById('radarChart').getContext('2d');
        const radarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Sales', 'Marketing', 'Development', 'Customer Support', 'Quality', 'Innovation'],
                datasets: [
                    {
                        label: 'Current Year',
                        data: [85, 90, 78, 92, 88, 76],
                        backgroundColor: 'rgba(102, 126, 234, 0.2)',
                        borderColor: 'rgba(102, 126, 234, 1)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    },
                    {
                        label: 'Previous Year',
                        data: [75, 82, 70, 85, 80, 68],
                        backgroundColor: 'rgba(118, 75, 162, 0.2)',
                        borderColor: 'rgba(118, 75, 162, 1)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgba(118, 75, 162, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            },
                            color: '#2c3e50'
                        },
                        ticks: {
                            stepSize: 20,
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        // Revenue Growth Doughnut Chart
        const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
        const doughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Product Sales', 'Services', 'Subscriptions', 'Partnerships', 'Other'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)'
                    ],
                    borderColor: [
                        'rgba(102, 126, 234, 1)',
                        'rgba(118, 75, 162, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 3,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeInOutQuart'
                },
                elements: {
                    arc: {
                        borderJoinStyle: 'round'
                    }
                }
            }
        });

        // Add hover animations
        radarChart.canvas.addEventListener('mousemove', function(e) {
            radarChart.canvas.style.cursor = 'pointer';
        });

        doughnutChart.canvas.addEventListener('mousemove', function(e) {
            doughnutChart.canvas.style.cursor = 'pointer';
        });
})
// ------------------ INITIAL DATA ------------------
let tableData = [
    { id: 1, name: "John Doe", position: "Developer", office: "New York" },
    { id: 2, name: "Jane Smith", position: "Designer", office: "London" },
    { id: 3, name: "Mike Johnson", position: "Manager", office: "Paris" },
    { id: 4, name: "Emily Davis", position: "QA Engineer", office: "Berlin" },
    { id: 5, name: "Chris Lee", position: "Developer", office: "San Francisco" },
];

let currentTheme = 'light';

// ------------------ THEME TOGGLE ------------------
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.innerHTML = theme === 'dark'
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
           </svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
}

// ------------------ SIDEBAR TOGGLE ------------------
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('closeBtn');

    menuToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
    closeBtn.addEventListener('click', () => sidebar.classList.remove('active'));
}

// ------------------ CHARTS ------------------
function initCharts() {
    // Bar chart - Quarterly Revenue
    const ctx = document.getElementById("myChart")?.getContext("2d");
    if (ctx) {
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Q1", "Q2", "Q3", "Q4"],
                datasets: [{
                    data: [25000, 32000, 28000, 35000], // USD
                    backgroundColor: "rgba(84, 160, 255, 0.8)",
                }],
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => "$" + context.parsed.toLocaleString()
                        }
                    }
                }
            },
        });
    }

    // Line chart - Monthly Sales Trend
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
                    data: [5000, 7000, 8000, 7600, 8200, 9000, 9500, 9700, 8800, 9300, 11000, 12000],
                    backgroundColor: "rgba(84, 160, 255, 0.2)",
                    borderColor: "rgba(84, 160, 255, 1)",
                    fill: true,
                }],
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => "$" + context.parsed.toLocaleString()
                        }
                    }
                }
            },
        });
    }
    
    // Pie chart - Market Share by Region
    const pieChartCtx = document.getElementById("officePieChart")?.getContext("2d");
    if (pieChartCtx) {
        new Chart(pieChartCtx, {
            type: "pie",
            data: {
                labels: ["North America", "Europe", "Asia-Pacific", "South America", "Africa"],
                datasets: [{
                    label: "Market Share",
                    data: [40, 25, 20, 10, 5],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF"
                    ],
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "bottom" },
                    tooltip: {
                        callbacks: {
                            label: (context) => context.label + ": " + context.parsed + "%"
                        }
                    }
                }
            }
        });
    }

    // Radar chart - Department Performance
    const radarCtx = document.getElementById('radarChart')?.getContext('2d');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Sales', 'Marketing', 'R&D', 'Customer Support', 'Quality', 'Operations'],
                datasets: [
                    {
                        label: 'Current Year',
                        data: [90, 85, 88, 92, 86, 80],
                        backgroundColor: 'rgba(84, 160, 255, 0.2)',
                        borderColor: 'rgba(84, 160, 255, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(84, 160, 255, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    },
                    {
                        label: 'Previous Year',
                        data: [80, 78, 82, 88, 80, 75],
                        backgroundColor: 'rgba(118, 75, 162, 0.2)',
                        borderColor: 'rgba(118, 75, 162, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(118, 75, 162, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 20 }
                    }
                }
            }
        });
    }

    // Doughnut chart - Revenue Breakdown
    const doughnutCtx = document.getElementById('doughnutChart')?.getContext('2d');
    if (doughnutCtx) {
        new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Product Sales', 'Services', 'Subscriptions', 'Partnerships', 'Other'],
                datasets: [{
                    data: [50, 20, 15, 10, 5],
                    backgroundColor: [
                        'rgba(84, 160, 255, 0.8)',
                        'rgba(95, 39, 205, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)'
                    ],
                    borderColor: [
                        'rgba(84, 160, 255, 1)',
                        'rgba(95, 39, 205, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: (context) => context.label + ': ' + context.parsed + '%'
                        }
                    }
                },
                cutout: '60%',
            }
        });
    }
}


// ------------------ CALENDAR ------------------
function initCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarGrid = document.getElementById('calendarGrid');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function renderCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${today.toLocaleString('default', { month: 'long' })} ${year}`;
        calendarGrid.innerHTML = '';

        for (let i = 0; i < firstDay; i++) calendarGrid.innerHTML += `<div></div>`;
        for (let day = 1; day <= daysInMonth; day++) {
            calendarGrid.innerHTML += `<div>${day}</div>`;
        }
    }

    prevMonth.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
}

// ------------------ INIT ------------------
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initCharts();
    initCalendar();
});

// Initial data
let tableData = [
    { id: 1, name: "John Doe", position: "Developer", office: "New York" },
    { id: 2, name: "Jane Smith", position: "Designer", office: "London" },
    { id: 3, name: "Mike Johnson", position: "Manager", office: "Paris" },
    { id: 4, name: "Emily Davis", position: "QA Engineer", office: "Berlin" },
    { id: 5, name: "Chris Lee", position: "Developer", office: "San Francisco" },
];

let currentTheme = 'light';

// Theme functionality (without localStorage)
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

// Modal functionality
function initModal() {
    const addBtn = document.getElementById('add-btn');
    const modal = document.getElementById('addModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('employeeForm');
    
    // Open modal
    addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });
    
    // Close modal events
    closeModal.addEventListener('click', hideModal);
    cancelBtn.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', hideModal);
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addEmployee();
    });
}

function showModal() {
    const modal = document.getElementById('addModal');
    const modalOverlay = document.getElementById('modalOverlay');
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
}

function hideModal() {
    const modal = document.getElementById('addModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const form = document.getElementById('employeeForm');
    
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    form.reset(); // Clear form
}

function addEmployee() {
    const nameInput = document.getElementById('name');
    const positionInput = document.getElementById('position');
    const officeInput = document.getElementById('office');

    const name = nameInput.value.trim();
    const position = positionInput.value.trim();
    const office = officeInput.value.trim();

    if (!name || !position || !office) {
        alert("Please fill in all fields");
        return;
    }

    // Generate new ID
    const newId = Math.max(...tableData.map(item => item.id)) + 1;
    
    // Add to data
    tableData.push({
        id: newId,
        name,
        position,
        office
    });

    // Update table
    renderTable();
    
    // Close modal
    hideModal();
    
    console.log('Employee added:', { id: newId, name, position, office });
}

// Table functionality
function renderTable() {
    const tbody = document.getElementById("table-body");
    if (!tbody) return;

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
}

function initTableSearch() {
    const tableSearch = document.getElementById("tableSearch");
    if (!tableSearch) return;

    tableSearch.addEventListener("keyup", function () {
        const searchValue = this.value.toLowerCase();
        const rows = document.querySelectorAll("#myTable tbody tr");

        rows.forEach(row => {
            const rowText = row.innerText.toLowerCase();
            row.style.display = rowText.includes(searchValue) ? "" : "none";
        });
    });
}

// Calendar functionality
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
        document.getElementById('prevMonth')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render();
        });

        document.getElementById('nextMonth')?.addEventListener('click', () => {
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
        if (monthYear) {
            monthYear.textContent = `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        }
    }

    renderDays() {
        const grid = document.getElementById('calendarGrid');
        if (!grid) return;

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

// Sidebar functionality
function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const closeBtn = document.getElementById("closeBtn");

    function showMenu() {
        sidebar.classList.add("open");
    }

    function closeMenu() {
        sidebar.classList.remove("open");
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", showMenu);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
}

// Charts initialization
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


// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard initializing...");
    
    // Initialize all components
    initTheme();
    initSidebar();
    initModal();
    initTableSearch();
    renderTable();
    initCharts();
    
    // Initialize calendar
    const calendar = new MiniCalendar();
    calendar.init();
    
    console.log("Dashboard initialized successfully!");
});
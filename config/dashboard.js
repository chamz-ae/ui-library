function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}


// Sample data for the dashboard table
    const dashboardData = [
        { id: 1, Name: "UserBorrow 1", Title: "Book 1", Date: dateToYMD(new Date(2017,10,5)), status: "Available" },
        { id: 2, Name: "UserBorrow 2", Title: "Book 2", Date: dateToYMD(new Date(2020,9,7)), status: "Borrowed" },
        { id: 3, Name: "UserBorrow 3", Title: "Book 3", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" },
        { id: 4, Name: "UserBorrow 4", Title: "Book 4", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" },
        { id: 5, Name: "UserBorrow 5", Title: "Book 5", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" },
        { id: 6, Name: "UserBorrow 6", Title: "Book 6", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" },
        { id: 7, Name: "UserBorrow 7", Title: "Book 7", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" },
        { id: 8, Name: "UserBorrow 8", Title: "Book 8", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" },
        { id: 9, Name: "UserBorrow 9", Title: "Book 9", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" },
        { id: 10, Name: "UserBorrow 10", Title: "Book 10", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" },
        { id: 11, Name: "UserBorrow 11", Title: "Book 11", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" },
        { id: 12, Name: "UserBorrow 12", Title: "Book 12", Date: dateToYMD(new Date(2017,10,5)), status: "Borrowed" }
        // Add more sample data here...
    ];

    // Pagination function
    function paginate(data, tableId, paginationId, itemsPerPage = 5) {
        const table = document.getElementById(tableId);
        const pagination = document.getElementById(paginationId);
        let currentPage = 1;

        function displayTable(page) {
            const tbody = table.querySelector("tbody");
            tbody.innerHTML = "";
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedData = data.slice(start, end);

            paginatedData.forEach(item => {
                const row = tbody.insertRow();
                Object.values(item).forEach(text => {
                    const cell = row.insertCell();
                    cell.textContent = text;
                });
            });
        }

        function setupPagination() {
            pagination.innerHTML = "";
            const pageCount = Math.ceil(data.length / itemsPerPage);
            
            const prevButton = document.createElement("button");
            prevButton.textContent = "Previous";
            prevButton.addEventListener("click", () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayTable(currentPage);
                    updatePaginationButtons();
                }
            });
            pagination.appendChild(prevButton);

            for (let i = 1; i <= pageCount; i++) {
                const button = document.createElement("button");
                button.textContent = i;
                button.addEventListener("click", () => {
                    currentPage = i;
                    displayTable(currentPage);
                    updatePaginationButtons();
                });
                pagination.appendChild(button);
            }

            const nextButton = document.createElement("button");
            nextButton.textContent = "Next";
            nextButton.addEventListener("click", () => {
                if (currentPage < pageCount) {
                    currentPage++;
                    displayTable(currentPage);
                    updatePaginationButtons();
                }
            });
            pagination.appendChild(nextButton);

            updatePaginationButtons();
        }

        function updatePaginationButtons() {
            const buttons = pagination.querySelectorAll("button");
            buttons.forEach((button, index) => {
                if (index === 0) {
                    button.disabled = currentPage === 1;
                } else if (index === buttons.length - 1) {
                    button.disabled = currentPage === Math.ceil(data.length / itemsPerPage);
                } else {
                    button.classList.toggle("active", index === currentPage);
                }
            });
        }

        displayTable(currentPage);
        setupPagination();
    }

    // Initialize pagination for dashboard table
    paginate(dashboardData, "dashboardTable", "dashboardPagination");

    // Navigation
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
            document.getElementById('page-title').textContent = this.textContent.trim();
            document.querySelectorAll('.sidebar li').forEach(item => item.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });

    // Sample chart (you can customize this based on your needs)
    const ctx = document.getElementById('combinedChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Visitor',
                data: [90, 90, 50, 70, 90, 50],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: 'Books-Borrowed',
                data: [0, 0, 50, 20, 0, 50],
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                tension: 0.1,
                pointStyle: 'rect',
                pointRadius: 5,
                pointHoverRadius: 7,
            }
        ],
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
            },
            legend: {
                display: true,
                position: 'top',
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



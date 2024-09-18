    // Sample data for the dashboard table
    const dashboardData = [
        { id: 1, judul: "Book Title 1", penulis: "Author 1", tahun: 2023, status: "Available" },
        { id: 2, judul: "Book Title 2", penulis: "Author 2", tahun: 2022, status: "Borrowed" },
        { id: 3, judul: "Book Title 3", penulis: "Author 3", tahun: 2032, status: "Borrowed" },
        { id: 4, judul: "Book Title 4", penulis: "Author 4", tahun: 4044, status: "Borrowed" },
        { id: 5, judul: "Book Title 5", penulis: "Author 5", tahun: 5055, status: "Borrowed" },
        { id: 6, judul: "Book Title 6", penulis: "Author 6", tahun: 6066, status: "Borrowed" },
        { id: 7, judul: "Book Title 7", penulis: "Author 7", tahun: 7072, status: "Borrowed" },
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
                data: [12, 19, 3, 5, 2, 3],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 7,
            },
            {
                label: 'Books-Borrowed',
                data: [10, 15, 8, 13, 7, 4],
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

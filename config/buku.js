$(document).ready(function() {
    const itemsPerPage = 5;
    let currentPage = 1;

    // Sample JSON data
    const data = {
        books: [
            { id: 1, title: "To Kill a Mockingbird", year: 1960, ISBN: 89823902744, Price: 500000, barcode: 324388479 },
            { id: 2, title: "1984", year: 1949, ISBN: 89823902744, Price: 500000, Barcode: 324388479 },
            { id: 3, title: "Pride and Prejudice", year: 1813, ISBN: 89823902744, Price: 500000, Barcode: 324388479 },
            { id: 4, title: "The Great Gatsby", year: 1925, ISBN: 89823902744, Price: 500000, Barcode: 324388479 },
            { id: 5, title: "Moby-Dick", year: 1851, ISBN: 89823902744, Price: 500000, Barcode: 324388479 },
            { id: 6, title: "The Catcher in the Rye", year: 1951, ISBN: 89823902744, Price: 500000, Barcode: 324388479 },
            { id: 7, title: "Jane Eyre", year: 1847, ISBN: 89823902744, Price: 500000, Barcode: 324388479 }
        ],
        publishers: [
            { id: 1, Name: "J. B. Lippincott & Co.", Address: "Los Dol", Phone: 13388932, Email: "Example@example.com"},
            { id: 2, Name: "Secker & Warburg", Address: "Los Aja", Phone: 13388932, Email: "Example@example.com" },
            { id: 3, Name: "T. Egerton, Whitehall", Address: "Los Santai", Phone: 13388932, Email: "Example@example.com" },
            { id: 4, Name: "Charles Scribner's Sons", Address: "Los Angels", Phone: 13388932, Email: "Example@example.com" },
            { id: 5, Name: "Harper & Brothers", Address: "Los Santos", Phone: 13388932, Email: "Example@example.com" },
            { id: 6, Name: "Little, Brown and Company", Address: "Los Angels", Phone: 13388932, Email: "Example@example.com" },
            { id: 7, Name: "Smith, Elder & Co.", Address: "Los Hackss", Phone: 13388932, Email: "Example@example.com" }
        ],
        authors: [
            { id: 1, name: "Harper Lee", biography: "dia adalah seorang kapiten yang mempunyai pedang panjang"},
            { id: 2, name: "George Orwell", biography: "dia adalah seorang kapiten yang mempunyai pedang panjang"},
            { id: 3, name: "Jane Austen", biography: "dia adalah seorang kapiten yang mempunyai pedang panjang"},
            { id: 4, name: "F. Scott Fitzgerald", biography: "dia adalah seorang kapiten yang mempunyai pedang panjang"},
            { id: 5, name: "Herman Melville", biography: "dia adalah seorang kapiten yang mempunyai pedang panjang"},
            { id: 6, name: "J.D. Salinger", biography: "dia adalah seorang kapiten yang mempunyai pedang panjang"},
            { id: 7, name: "Charlotte Brontë", biography: "dia adalah seorang kapiten yang mempunyai pedang panjang"}
        ]
    };

    function displayTable(tabId) {
        const tableData = data[tabId];
        const table = $(`#${tabId} table`);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = tableData.slice(startIndex, endIndex);

        let html = '<tr>';
        Object.keys(tableData[0]).forEach(key => {
            html += `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`;
        });
        html += '</tr>';

        pageData.forEach(item => {
            html += '<tr>';
            Object.values(item).forEach(value => {
                html += `<td>${value}</td>`;
            });
            html += '</tr>';
        });

        table.html(html);
        updatePagination(tabId, tableData.length);
    }

    function updatePagination(tabId, totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const pagination = $(`#${tabId} .pagination`);
        let html = '';

        for (let i = 1; i <= totalPages; i++) {
            html += `<button ${i === currentPage ? 'disabled' : ''}>${i}</button>`;
        }

        pagination.html(html);

        pagination.find('button').on('click', function() {
            currentPage = parseInt($(this).text());
            displayTable(tabId);
        });
    }

    // Initial display
    displayTable('books');

    // Tab switching
    $('.tab').on('click', function() {
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.content').removeClass('active');
        const tabId = $(this).data('tab');
        $(`#${tabId}`).addClass('active');
        currentPage = 1;
        displayTable(tabId);
    });
});
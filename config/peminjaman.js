// Simulasi data dari database
const products = [
    {
        id: 1,
        name: "GHAZZI AL MUHAMMBAH",
        image: "../image/image1.png"
    },
    {
        id: 2,
        name: "DAUN TERATAI",
        image: "../image/image2.png"
    },
    {
        id: 3,
        name: "TERELIYE",
        image: "../image/image3.png"
    },
    {
        id: 4,
        name: "SEMUA AKAN PERGI",
        image: "../image/image4.png"
    },
    {
        id: 5,
        name: "MALAIKAT",
        image: "../image/image2.png"
    },
    {
        id: 6,
        name: "PENCIPTA",
        image: "../image/image3.png"
    },
    {
        id: 7,
        name: "LOST ENERGI",
        image: "../image/image4.png"
    },
    {
        id: 8,
        name: "THE SUN",
        image: "../image/image2.png"
    },
    {
        id: 9,
        name: "LIKE ANGEL",
        image: "../image/image3.png"
    },
    {
        id: 10,
        name: "BACK TO HOME",
        image: "../image/image4.png"
    },
    {
        id: 11,
        name: "MANAGE TIME",
        image: "../image/image4.png"
    },
    {
        id: 12,
        name: "MONEY SAFE",
        image: "../image/image2.png"
    },
    {
        id: 13,
        name: "BE INTELEGENT",
        image: "../image/image3.png"
    },
    {
        id: 14,
        name: "SPEAKING",
        image: "../image/image4.png"
    }
];

let cart = [];
let transactions = [];

// Function untuk merender produk
function renderProducts() {
    const productList = $('#productList');
    productList.empty();

    products.forEach(product => {
        productList.append(`
            <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                    <img src="${product.image}" 
                         class="card-img-top add-to-cart" 
                         alt="${product.name}" 
                         data-id="${product.id}" 
                         style="cursor: pointer;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                    </div>
                </div>
            </div>
        `);
    });
}

// Function untuk merender keranjang
function renderCart() {
    const cartItems = $('#cartItems');
    cartItems.empty();

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);

        cartItems.append(`
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <div>
                    <h4 style="margin-bottom: 4px;" class="mb-0">${product.name}</h4>
                    <medium class="text-muted">Quantity: ${item.quantity}</medium>
                </div>
                <div style="margin-bottom: 15px;" class="d-flex padding align-items-center">
                    <button style="width: 32px;" class="btn btn-sm btn-outline-primary me-2 update-quantity" data-id="${item.id}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button style="width: 32px;" class="btn btn-sm btn-outline-primary ms-2 update-quantity" data-id="${item.id}" data-action="increase">+</button>
                    <button style="width: 24px; margin-left: 13px;" class="btn btn-sm btn-danger ms-3 remove-from-cart" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `);
    });

    // Update total count di cart header
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cartCount').text(totalItems);
    
    // Update total count di cart footer
    $('#cartTotal').text(totalItems);
}

// Event Handlers
$(document).ready(function() {
    // Render products
    renderProducts();

    // Add to cart
    $(document).on('click', '.add-to-cart', function() {
        const productId = $(this).data('id');
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }

        renderCart();
    });

    // Update quantity
    $(document).on('click', '.update-quantity', function() {
        const productId = $(this).data('id');
        const action = $(this).data('action');
        const item = cart.find(item => item.id === productId);

        if (item) {
            if (action === 'increase') {
                item.quantity += 1;
            } else {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== productId);
                }
            }
            renderCart();
        }
    });

    // Remove from cart
    $(document).on('click', '.remove-from-cart', function() {
        const productId = $(this).data('id');
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    });

    // Checkout process
    $('#checkoutButton').click(function() {
        if (cart.length === 0) {
            showNotification('Keranjang belanja kosong!', 'error');
            return;
        }

        // Simulasi data pesanan
        const orderData = {
            items: cart.map(item => {
                const product = products.find(p => p.id === item.id);
                return {
                    ...item,
                    productName: product.name
                };
            }),
            orderDate: new Date().toISOString(),
            customerName: 'Nama Pelanggan' // Ganti sesuai input dari pengguna
        };

        // Simpan transaksi
        const transaction = {
            no: transactions.length + 1,
            name: orderData.customerName,
            product: orderData.items.map(item => `${item.productName} (${item.quantity})`).join(', '),
            date: new Date().toLocaleDateString(),
            status: "Selesai"
        };

        transactions.push(transaction);

        // Tampilkan notifikasi
        showNotification('Terima kasih atas pembelian Anda! Order sedang diproses.');

        // Reset keranjang dan render ulang
        cart = [];
        renderCart();
        $('#cartModal').modal('hide');
        
        // Render transaksi ke tabel laporan
        renderTransactions();
    });
});
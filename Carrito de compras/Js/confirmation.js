// Load order details from localStorage
const orderDetails = JSON.parse(localStorage.getItem('order_details'));
const orderSummary = document.getElementById('orderSummary');
const orderTotal = document.getElementById('orderTotal');
const shippingDetails = document.getElementById('shippingDetails');

function displayOrderConfirmation() {
    if (!orderDetails) {
        window.location.href = 'index.html';
        return;
    }

    // Display order items
    orderSummary.innerHTML = orderDetails.cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
        </div>
    `).join('');

    // Display totals
    orderSummary.innerHTML += `
        <div class="order-summary-totals">
            <div class="subtotal-line">
                <span>Subtotal:</span>
                <span>$${orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div class="tax-line">
                <span>IVA (13%):</span>
                <span>$${orderDetails.tax.toFixed(2)}</span>
            </div>
        </div>
    `;

    // Display total
    orderTotal.textContent = `$${orderDetails.total.toFixed(2)}`;

    // Display shipping details
    shippingDetails.innerHTML = `
        <p><strong>Nombre:</strong> ${orderDetails.customer.nombres} ${orderDetails.customer.apellidos}</p>
        <p><strong>Email:</strong> ${orderDetails.customer.email}</p>
        <p><strong>Teléfono:</strong> ${orderDetails.customer.telefono}</p>
        <p><strong>Dirección:</strong> ${orderDetails.customer.direccion}</p>
    `;

    // Clear order details from localStorage
    localStorage.removeItem('order_details');
}

// Initialize confirmation page
displayOrderConfirmation();
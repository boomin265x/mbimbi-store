const cart = JSON.parse(localStorage.getItem("mbimbi-cart") || "[]");
const orderItems = document.querySelector("#orderItems");
const orderTotal = document.querySelector("#orderTotal");
const checkoutForm = document.querySelector("#checkoutForm");
const formatPrice = price => `MWK ${price.toLocaleString("en-MW")}`;

if (cart.length) {
	orderItems.innerHTML = cart.map(product => `<div class="order-item"><span>${product.name}</span><span>${formatPrice(product.price)}</span></div>`).join("");
	orderTotal.textContent = formatPrice(cart.reduce((total, product) => total + product.price, 0));
} else {
	orderItems.innerHTML = `<p class="empty-order">Your bag is empty. Add something soft before checking out.</p>`;
	checkoutForm.querySelector("button").setAttribute("aria-disabled", "true");
	checkoutForm.querySelector("button").disabled = true;
}

checkoutForm.addEventListener("submit", event => {
	event.preventDefault();
	localStorage.removeItem("mbimbi-cart");
	checkoutForm.innerHTML = `<div class="order-confirmation"><div class="eyebrow">Order received / 03</div><h2>Thank you for your order.</h2><p>We will be in touch shortly with your delivery details.</p><a class="primary-button" href="shop.html">Return to shop</a></div>`;
});

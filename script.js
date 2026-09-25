const products = [
	{ name: "Sunday set", type: "sets", price: 88000, tag: "New", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=80" },
	{ name: "Cloud robe", type: "robes", price: 112000, tag: "Bestseller", image: "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?auto=format&fit=crop&w=700&q=80" },
	{ name: "Dawn cami", type: "separates", price: 46000, tag: "", image: "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=700&q=80" },
	{ name: "Slow morning set", type: "sets", price: 94000, tag: "New", image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=700&q=80" }
];

const cart = JSON.parse(localStorage.getItem("mbimbi-cart") || "[]");
const grid = document.querySelector("#productGrid");
let searchTerm = "";
const formatPrice = price => `MWK ${price.toLocaleString("en-MW")}`;

const renderProducts = (filter = "all") => {
	grid.innerHTML = products
		.filter(product => filter === "all" || product.type === filter)
		.filter(product => `${product.name} ${product.type}`.toLowerCase().includes(searchTerm))
		.map(product => `
			<article class="product-card">
				<div class="product-image">
					<img src="${product.image}" alt="${product.name}" loading="lazy" />
					${product.tag ? `<span class="badge">${product.tag}</span>` : ""}
					<button class="quick-add" data-index="${products.indexOf(product)}">Add to bag +</button>
				</div>
				<div class="product-info">
					<h3>${product.name}</h3>
					<p>${product.type === "sets" ? "Top + trouser" : "Soft cotton modal"}</p>
					<span class="price">${formatPrice(product.price)}</span>
				</div>
			</article>`)
		.join("");

	document.querySelectorAll(".quick-add").forEach(button => {
		button.addEventListener("click", () => addToCart(Number(button.dataset.index)));
	});
};

const addToCart = index => {
	cart.push(products[index]);
	updateCart();
	openCart();
};

const updateCart = () => {
	localStorage.setItem("mbimbi-cart", JSON.stringify(cart));
	document.querySelector("#cartCount").textContent = cart.length;
	document.querySelector("#cartTotal").textContent = formatPrice(cart.reduce((total, product) => total + product.price, 0));
	document.querySelector("#cartItems").innerHTML = cart.length
		? cart.map(product => `<div class="cart-item"><img src="${product.image}" alt="" /><div><h3>${product.name}</h3><p>${formatPrice(product.price)}</p></div></div>`).join("")
		: `<div class="empty-cart">Your bag is feeling light.<br />Add something soft to fill it up.</div>`;
};

const openCart = () => {
	document.querySelector("#accountPanel").classList.remove("open");
	document.querySelector("#cartDrawer").classList.add("open");
	document.querySelector("#overlay").classList.add("visible");
};

const closeCart = () => {
	document.querySelector("#cartDrawer").classList.remove("open");
	document.querySelector("#overlay").classList.remove("visible");
};

const openAccount = () => {
	document.querySelector("#cartDrawer").classList.remove("open");
	document.querySelector("#accountPanel").classList.add("open");
	document.querySelector("#overlay").classList.add("visible");
};

const closeAccount = () => {
	document.querySelector("#accountPanel").classList.remove("open");
	document.querySelector("#overlay").classList.remove("visible");
};

const mobileMenuButton = document.querySelector("#mobileMenuButton");
const mobileMenuPanel = document.querySelector("#mobileMenuPanel");
const closeMobileMenu = () => {
	mobileMenuPanel.classList.remove("open");
	mobileMenuButton.setAttribute("aria-expanded", "false");
	mobileMenuButton.setAttribute("aria-label", "Open menu");
};

mobileMenuButton.addEventListener("click", () => {
	const isOpen = mobileMenuPanel.classList.toggle("open");
	mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
	mobileMenuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
	document.querySelector("#overlay").classList.toggle("visible", isOpen);
});

mobileMenuPanel.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMobileMenu));

document.querySelectorAll(".filter").forEach(button => {
	button.addEventListener("click", () => {
		document.querySelector(".filter.active").classList.remove("active");
		button.classList.add("active");
		renderProducts(button.dataset.filter);
	});
});

document.querySelector("#searchInput").addEventListener("input", event => {
	searchTerm = event.target.value.trim().toLowerCase();
	renderProducts(document.querySelector(".filter.active").dataset.filter);
});

document.querySelector("#cartButton").addEventListener("click", openCart);
document.querySelector("#cartButtonBottom").addEventListener("click", openCart);
document.querySelector("#accountButton").addEventListener("click", openAccount);
document.querySelector("#closeAccount").addEventListener("click", closeAccount);
document.querySelector("#closeCart").addEventListener("click", closeCart);
document.querySelector("#overlay").addEventListener("click", () => { closeCart(); closeAccount(); closeMobileMenu(); });
document.querySelector("#signup").addEventListener("submit", event => {
	event.preventDefault();
	event.target.innerHTML = "<p>Thank you. You're on the list.</p>";
});

renderProducts();
updateCart();

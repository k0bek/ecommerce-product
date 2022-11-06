const burgerBtn = document.querySelector(".nav__burger-btn");
const closeBurgerBtn = document.querySelector(".nav-mobile__close");
const navMobile = document.querySelector(".nav-mobile");
const boxShadow = document.querySelector(".box-shadow");
const navMobileItem = document.querySelectorAll(".nav-mobile__item");
const buttonsControl = document.querySelectorAll(".control");
const numberOfPruduct = document.querySelector(".number");
const buttons = document.querySelectorAll("[data-carousel-button]");
const boxShadowProduct = document.querySelectorAll(".box-shadow-product");
const slides = document.querySelector(".carousel-items");
const navCart = document.querySelector(".nav__cart");
const add = document.querySelector(".add");
const basket = document.querySelector(".basket-bottom");
const basketTrash = document.querySelector(".basket__trash");
const counter = document.querySelector(".nav__cart-counter");
const boxes = [...boxShadowProduct];
let numberOfProducts = 0;
numberOfPruduct.textContent = numberOfProducts;
let arrayOfProducts = [];

function navMobileShowHandler() {
	navMobile.classList.add("active");
	boxShadow.classList.add("box-shadow-active");
}

function navMobileActiveRemove() {
	navMobile.classList.remove("active");
	boxShadow.classList.remove("box-shadow-active");
}

function navMobileHideHandler() {
	navMobileActiveRemove();
}

navMobileItem.forEach((item) => {
	item.addEventListener("click", () => {
		navMobileActiveRemove();
	});
});

buttonsControl.forEach((button) => {
	const minusBtn = document.querySelector(".minus");
	button.addEventListener("click", () => {
		button.classList.contains("plus") ? numberOfProducts++ : numberOfProducts--;
		numberOfPruduct.value = numberOfProducts;

		numberOfProducts !== 0
			? minusBtn.removeAttribute("disabled")
			: minusBtn.setAttribute("disabled", "");
	});
});

const removeActiveClass = function () {
	for (const box of boxShadowProduct) {
		box.classList.remove("box-shadow-product-active");
	}
};

const handleIndex = function (index) {
	const slidesChildren = slides.children;

	for (const slide of slidesChildren) {
		slide.removeAttribute("data-active");
	}
	for (const box of boxes) {
		box.classList.remove("box-shadow-product-active");
	}
	boxes[index].classList.add("box-shadow-product-active");
};

const clickedBoxHandler = function (e) {
	removeActiveClass();
	const clickedBox = e.target;
	clickedBox.classList.add("box-shadow-product-active");
	const clickedBoxIndex = boxes.indexOf(clickedBox);
	handleIndex(clickedBoxIndex);

	slides.children[clickedBoxIndex].dataset.active = true;
};

buttons.forEach((button) => {
	button.addEventListener("click", (e) => {
		const offset = button.dataset.carouselButton === "next" ? 1 : -1;

		const activeSlide = slides.querySelector("[data-active]");
		let newIndex = [...slides.children].indexOf(activeSlide) + offset;
		if (newIndex < 0) newIndex = slides.children.length - 1;
		if (newIndex >= slides.children.length) newIndex = 0;
		handleIndex(newIndex);
		slides.children[newIndex].dataset.active = true;
	});
});

boxShadowProduct.forEach((box) => {
	box.addEventListener("click", (e) => clickedBoxHandler(e));
});

navCart.addEventListener("click", () => {
	const basket = document.querySelector(".basket");
	basket.classList.toggle("basket-active");
});

const addToCartHandler = function () {
	const numberOfProducts = document.querySelector(".number").value;

	if (numberOfProducts == 0) {
		return;
	}

	arrayOfProducts.push(Number(numberOfProducts));

	const sumOfProducts = arrayOfProducts.reduce((prev, curr) => {
		return prev + curr;
	}, 0);

	counter.innerText = sumOfProducts;
	counter.style.visibility = "visible";

	basket.innerHTML = `
	<img class="basket__img" src="./images/image-product-1-thumbnail.jpg" alt="">
        <div class="basket-text">
          <p class="basket__desc">Fall Limited Edition Sneakers</p>
          <p class="basket__prices"><span class="lower">$125 x <span class="amount">${sumOfProducts}</span></span> <span
              class="higher">$${sumOfProducts * 125}</span></p>
        </div>
      </div>

      <button class="basket__button">Checkout</button> 
	`;

	basketTrash.classList.add("basket__trash-active");
	console.log(arrayOfProducts);
};

const resetBasketHandler = function () {
	arrayOfProducts = [];
	basketTrash.classList.remove("basket__trash-active");
	basket.innerHTML = `
	<p class="basket__info">Your cart is empty.</p>
	`;
	counter.style.visibility = "hidden";
};

burgerBtn.addEventListener("click", navMobileShowHandler);
closeBurgerBtn.addEventListener("click", navMobileHideHandler);
add.addEventListener("click", addToCartHandler);
basketTrash.addEventListener("click", resetBasketHandler);

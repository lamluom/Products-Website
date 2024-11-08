let productContainer = document.getElementById("product-container");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");
let searchIcon = document.getElementById("search-icon");
let headerLogo = document.getElementsByClassName(".header-Logo");
let homeSection = document.querySelector(".main-section");

let products = [];


fetch("https://dummyjson.com/products")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        products = data.products;
        renderProducts(products);
    })
    .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
    });
    
    function renderProducts(productsToRender) {
      productContainer.innerHTML = "";
      productsToRender.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");
          productCard.innerHTML = `
              <img src="${product.thumbnail}" alt="${product.title}" />
              <h3>${product.title}</h3>
              <div class="rating">${"★".repeat(Math.round(product.rating))}<span> ${product.rating}/5</span></div>
              <p class="price">$${product.price}</p>
              <p class="id">ID: ${product.id}</p>
              <button class="show-details" data-id="${product.id}" onclick="window.location.href='../Product-Detail/index.html?id=1'">Show More Details</button>
              <div class="product-details" id="details-${product.id}" style="display: none;"></div>
          `;
          productContainer.appendChild(productCard);
  
          // Add click event listener to the "Show details" button
          const showdetailsButton = productCard.querySelector(".show-details");
          showdetailsButton.addEventListener("click", () => {
              const detailsDiv = document.getElementById(`details-${product.id}`);
              if (detailsDiv.style.display === "none") {
                  fetchProductDetails(product.id, detailsDiv);
              } else {
                  detailsDiv.style.display = "none"; // Toggle the visibility
              }
          });
      });
  }

  function fetchProductDetails(productId, detailsDiv) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            detailsDiv.innerHTML = `
                <h4>Details:</h4>
                <p>${data.description}</p>
                <p>Category: ${data.category}</p>
                <p>Brand: ${data.brand}</p>
                <p>Stock: ${data.stock} available</p>
            `;
            detailsDiv.style.display = "block"; // Show the details
        })
        .catch((error) => {
            console.error("There has been a problem with your fetch operation:", error);
        });
}

searchButton.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();
  console.log(`Searching for: ${searchValue}`);
  const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchValue)
  );
  console.log(`Filtered Products: ${filteredProducts.length}`);
  renderProducts(filteredProducts);
  searchInput.value = "";
});

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}

function fetchSearchResults(category) {
  fetch(`https://dummyjson.com/products/category/${category}`)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
      })
      .then((data) => {
          renderProducts(data.products);
      })
      .catch((error) => {
          console.error("There has been a problem with your fetch operation:", error);
      });
}

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  console.log(`Searching for: ${searchValue}`);
  const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchValue)
  );
  console.log(`Filtered Products: ${filteredProducts.length}`);
  renderProducts(filteredProducts);
});

searchIcon.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();
  console.log(`Searching for: ${searchValue}`);
  const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchValue)
  );
  console.log(`Filtered Products: ${filteredProducts.length}`);
  renderProducts(filteredProducts);
  searchInput.value = "";
});

function goHome() {
  history.replaceState(null, null, window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
  location.reload();
}

function updateURLOnScroll() {
  if (window.scrollY <= 565) {
      history.replaceState(null, null, window.location.pathname + window.location.search);
  } else if (window.scrollY >= 66){
    window.location.hash = "product-section";
  }
}

window.addEventListener("scroll", () => {

  const rect = homeSection.getBoundingClientRect();
  const isHomeSectionVisible = rect.bottom >= 0; // Check if the bottom of the home section is in the viewport

  if (!isHomeSectionVisible) {
      window.location.hash = "product-section";
  } else {
      window.history.replaceState(null, null, window.location.pathname); // Remove hash if home section is visible
  }
});
// // Function to get query parameters from the URL
// function getQueryParam(param) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(param);
// }

// async function fetchProductDetails(productId) {
//     console.log(`Fetching details for product ID: ${productId}`);
//     try {
//         const response = await fetch(`https://your-api-url.com/products/${productId}`); // Update this with your API URL
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const product = await response.json();
//         console.log('Product data:', product); // Log the fetched product data
//         displayProductDetails(product);
//     } catch (error) {
//         console.error('Error fetching product details:', error);
//     }
// }

// // Function to display product details on the page
// function displayProductDetails(product) {
//     if (product) { // Ensure product data is available
//         document.querySelector('.product-img-logo').src = product.image; // Assuming product object has an image property
//         document.querySelector('.thumbnail').src = product.thumbnail; // Assuming there's a thumbnail property
//         document.querySelector('.product-info h1').textContent = product.title; // Set the product title
//         document.querySelector('.product-info .price').innerHTML = `$${product.price} <del>$${product.originalPrice}</del>`; // Set the price
//         document.querySelector('.product-info p').textContent = product.description; // Set the product description
//     } else {
//         console.error('No product data to display.');
//     }
// }

// // On page load, get the product ID and fetch details
// document.addEventListener('DOMContentLoaded', async () => {
//     const productId = getQueryParam('id');
//     if (productId) {
//         await fetchProductDetails(productId); // Ensure to await this async function
//     } else {
//         console.error('No product ID found in URL.');
//     }
// });

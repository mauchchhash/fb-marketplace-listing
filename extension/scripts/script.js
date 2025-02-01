fetch("http://localhost:3000/products")
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    const list = document.getElementById('products-list')
    console.log(data)
    data.forEach(product => {
      const li = document.createElement('li');
      li.id = 'p-' + product._id;
      li.innerHTML = `
        <div>
          <p><i class="fa-regular fa-copy">&nbsp</i><b>Name: </b><span class="name">${product.name}</span></p>
          <p><i class="fa-regular fa-copy">&nbsp</i><b>Price: </b><span class="price">${product.price}</span></p>
          <p><i class="fa-regular fa-copy">&nbsp</i><b>Category: </b><span class="category">${product.category}</span></p>
          <p><i class="fa-regular fa-copy">&nbsp</i><b>Condition: </b><span class="condition">${product.condition}</span></p>
          <p><i class="fa-regular fa-copy">&nbsp</i><b>Sku: </b><span class="sku">${product.sku}</span></p>
        </div>
      `;
      list.appendChild(li)
    })
    document.querySelectorAll(".fa-regular.fa-copy").forEach(item => {
      item.addEventListener("click", function(event) {
        navigator.clipboard.writeText(event.target.parentNode.lastChild.textContent)
      })
    })
  }) // Log products
  .catch(error => console.error("Error fetching products:", error));
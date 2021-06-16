// Just submit the form when pressing enter...

$(document).ready(function () {

  $('#submit_on_enter').keydown(function (event) {
    // enter has keyCode = 13, change it if you want to use another button
    if (event.keyCode == 13) {
      $('#submit_on_enter').submit();
      return false;
    }
  });

});


function makeSearch() {
  productsElement = document.getElementById("products");
  productsElement.innerHTML =
    '<div data-role="activity" data-type="ring" data-style="color"></div>';

  ref = document.getElementById("refInput").value;
  refAbsolutelyInTitle = document.getElementById("refAbsolutlyInTitle").checked;

  searchOnlyNfirstProducts = document.getElementById("searchOnlyNfirstProducts").checked;
  numberOfProducts = $('#numberOfProducts').val();

  url = " https://phzd41gui1.execute-api.eu-west-3.amazonaws.com/default/fournisseurs-papa"
  body = {
    "ref": ref
  }
  if (searchOnlyNfirstProducts) {
    body["numberOfProducts"] = numberOfProducts
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
    .then((products) => {
      productsElement = document.getElementById("products");
      productsElement.innerHTML = "";
      products.forEach((product) => {
        if (refAbsolutelyInTitle) {
          if (product.name.toLowerCase().includes(ref.toLowerCase())) {
            productsElement.appendChild(
              generateProduct(
                product.name,
                product.price,
                product.brand,
                product.imageUrl,
                product.link
              )
            );
          }
        } else {
          productsElement.appendChild(
            generateProduct(
              product.name,
              product.price,
              product.brand,
              product.imageUrl,
              product.link
            )
          );
        }
      });
    })
    .catch((error) => alert("Erreur : " + error));
  //products.appendChild(generateProduct("Test", 12, "ElecDirect", "http://lorempixel.com/1000/600/"))
}

const generateProduct = (name, price, brand, imageUrl, link) => {
  let li = document.createElement("li");
  li.setAttribute("class", "cell-6 cell-md-3");
  li.innerHTML = `
                  <a target="_blank" rel="noopener noreferrer" href="${link}">
                    <figure class="text-center">
                        <div class="img-container thumbnail">
                            <img referrerPolicy="no-referrer" src="${imageUrl}">
                        </div>
                        <figcaption class="painting-name">${name}</figcaption>
                        <figcaption class="painting-author text-bold">${brand}</figcaption>
                        <figcaption class="painting-price" data-format="money">${price} € H.T</figcaption>
                    </figure>
                  </a>
                  `;
  return li;
};

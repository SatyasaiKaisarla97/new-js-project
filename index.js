const form = document.getElementById("my-form");
form.addEventListener("submit", saveData);

function saveData(e) {
  e.preventDefault();
  let sellingPrice = document.querySelector("#selling-price").value;
  let productName = document.querySelector("#product-name").value;
  let productCategory = document.querySelector("#product-category").value;

  let my_obj = {
    'amount': sellingPrice,
    'description': productName,
    'category': productCategory,
  };
  axios.post('https://crudcrud.com/api/3b785ee70f594f9781e1f1cd899dca9c/products', my_obj)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  my_objSerialized = JSON.stringify(my_obj);
  localStorage.setItem(productName, my_objSerialized);
  showOutput(my_obj)


  document.getElementById("selling-price").value = null;
  document.getElementById("product-name").value = null;
  document.getElementById("product-category").value = null;
}

function showOutput(productDetails) {
  const li = document.createElement("li");
  let details =
    productDetails.amount + '-' +
    productDetails.category + '-' +
    productDetails.description;

  const deleteBtn = document.createElement("input");
  const editBtn = document.createElement("input");

  deleteBtn.type = "button";
  deleteBtn.value = "Delete Producct";
  deleteBtn.style.marginLeft='10px';

  editBtn.type = "button";
  editBtn.value = "Edit Product";
  editBtn.style.marginLeft = '10px';

  if (productDetails.sellingPrice != "") {
    if (productDetails.category === "food") {
      li.innerText = details;
      var ul = document.getElementById("food-items");
      ul.appendChild(li);
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
    }else if(productDetails.category === "Electronics"){
        li.innerText = details;
        var ul = document.getElementById('electronic-items');
        ul.appendChild(li);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
    }else{
        li.innerText = details;
        var ul = document.getElementById('skincare-items');
        ul.appendChild(li);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        }
  }
  li.style.marginTop = '10px';

  deleteBtn.addEventListener("click", removeData);
  function removeData(e) {
    e.preventDefault();
    deleteBtn.parentElement.innerText = " ";
    li.style.listStyle = "none";
    let id = productDetails._id
        axios.delete(`https://crudcrud.com/api/3b785ee70f594f9781e1f1cd899dca9c/products/${id}` )
        .then(res => {
            window.location.reload();
            console.log(res)})
        .catch(err => console.log(err))
        
    // localStorage.removeItem(productName);
  }

  editBtn.addEventListener("click", editData);
  function editData(e) {
    e.preventDefault();
    let id = productDetails._id
    axios.put(`https://crudcrud.com/api/3b785ee70f594f9781e1f1cd899dca9c/products/${id}`,
    {
        'amount': document.getElementById('selling-price').value,
        'description':document.getElementById('product-name').value ,
        'category':document.getElementById('product-category').value
    }
    ).then(res => console.log(res)).catch(err => console.log(err))
    axios.delete(`https://crudcrud.com/api/3b785ee70f594f9781e1f1cd899dca9c/products/${id}` )
        .then(res => {
            console.log(res)})
        .catch(err => console.log(err))
    document.getElementById("selling-price").value = productDetails.amount;
    document.getElementById("product-name").value = productDetails.description;
    document.getElementById("product-category").value = productDetails.category;
    editBtn.parentElement.innerText = " ";
    li.style.listStyle = "none";
    // localStorage.removeItem(productName);
  }
}

window.addEventListener('DOMContentLoaded', () =>{
    axios.get('https://crudcrud.com/api/3b785ee70f594f9781e1f1cd899dca9c/products')
    .then(res => {console.log(res.data)
    for(let i=0; i<res.data.length; i++){
        if(res.data[i] != null){
        showOutput(res.data[i])
        }
    }

    })
    .catch(err => console.log(err))
})

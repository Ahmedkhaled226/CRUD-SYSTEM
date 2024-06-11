let productNameInput = document.getElementById('productName')
let productCategoryInput = document.getElementById('productCategory')
let productPriceInput = document.getElementById('productPrice')
let productDescInput = document.getElementById('productDesc')
let productImgInput = document.getElementById('productImg')
let searchInput = document.getElementById('searchInput')

let btnAdd = document.getElementById("btnAdd")
let btnUpdate = document.getElementById("btnUpdate")
let index = 0;
productContainer = []


if (localStorage.getItem('allProducts') != null) {

    productContainer = JSON.parse(localStorage.getItem('allProducts'))
    displayProduct()
}

function addProduct() {

    if (
        validationInputs(productNameInput, "msgName") &&
        validationInputs(productCategoryInput, "msgCategory") &&
        validationInputs(productPriceInput, "msgPrice") &&
        validationInputs(productDescInput, "msgDesc") &&
        validationInputs(productImgInput, "msgImg")) {
        product = {
            name: productNameInput.value,
            category: productCategoryInput.value,
            price: productPriceInput.value,
            desc: productDescInput.value,
            img: productImgInput.files[0]?.name ? `images/${productImgInput.files[0]?.name}` : 'images/post2.jpg',

        }
        productContainer.push(product)
        localStorage.setItem('allProducts', JSON.stringify(productContainer))


        displayProduct()

        clearForm()



    }

}



function clearForm() {

    productNameInput.value = ''
    productCategoryInput.value = ''
    productPriceInput.value = ''
    productDescInput.value = ''
    productImgInput.value = ''


    productNameInput.classList.remove('is-valid')
    productCategoryInput.classList.remove('is-valid')
    productPriceInput.classList.remove('is-valid')
    productDescInput.classList.remove('is-valid')
    productImgInput.classList.remove('is-valid')


}



function deleteProduct(index) {

    productContainer.splice(index, 1)
    localStorage.setItem('allProducts', JSON.stringify(productContainer))
    displayProduct()

}


function displayProduct() {
    let term = searchInput.value;
    var cartona = "";
    for (let i = 0; i < productContainer.length; i++) {

        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {


            cartona += `
        <tr>
                <td>${i + 1}</td>
                <td>${productContainer[i].name} </td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].desc}</td>
                <td><img src="${productContainer[i].img}" alt=""></td>
                <td>
                    <button onclick="setFormUpdate(${i})"  class="btn btn-success">Update</button>
                    <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                </td>
    
            </tr>




`

        }



    }
    document.getElementById('demo').innerHTML = cartona






}


function validationInputs(element, msgId) {
    let text = element.value;
    let regex = {
        productName: /^[A-Z][a-z]{3,8}$/,
        productPrice: /^[1-90?]{2,5}$/,
        productCategory: /^(tv|mobile|screen|electronic)$/i,
        productDesc: /^.{3,}$/m,
        productImg: /^.{1,}\.(jpg|png|jpeg|svg|avif)$/,
    }
    let msg = document.getElementById(msgId);
    if (regex[element.id].test(text)) {

        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true

    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        msg.classList.remove("d-none");
        return false

    }


}

function setFormUpdate(indexElement) {
    productNameInput.value = productContainer[indexElement].name
    productCategoryInput.value = productContainer[indexElement].category
    productPriceInput.value = productContainer[indexElement].price
    productDescInput.value = productContainer[indexElement].desc

    btnAdd.classList.add('d-none')
    btnUpdate.classList.remove('d-none')
    index = indexElement
}

function updateData() {
    let product = {
        name: productNameInput.value,
        category: productCategoryInput.value,
        price: productPriceInput.value,
        desc: productDescInput.value,
        img: productImgInput.files[0]?.name ? `images/${productImgInput.files[0]?.name}` : 'images/post2.jpg',

    };

    productContainer.splice(index, 1, product)

    displayProduct()
    localStorage.setItem('allProducts', JSON.stringify(productContainer))

    clearForm()
    btnAdd.classList.remove('d-none')
    btnUpdate.classList.add('d-none')
    
}

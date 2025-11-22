let showBtn=document.querySelector('#show-product-btn')
let addBtn=document.querySelector('#add-product-btn')
let updateBtn=document.querySelector('#update-product-btn')
let deleteBtn=document.querySelector('#delete-product-btn')


let inventoryContainer=document.querySelector('.inventory-container')
let resultContainer=document.querySelectorAll('.result-container .container')

let productsContainer=document.querySelector('#products-container')

let addContainer=document.querySelector('#add-container')
let addSubmit=document.querySelector('#add-submit')
let addCancel=document.querySelector('#add-cancel')

let updateContainer=document.querySelector('#update-container')
let updateSubmit=document.querySelector('#update-submit')
let updateCancel=document.querySelector('#update-cancel')

let deleteContainer=document.querySelector('#delete-container')
let deleteSubmit=document.querySelector('#delete-submit')
let deleteCancel=document.querySelector('#delete-cancel')

let searchBtn=document.querySelector('.search-container #search-btn')

let productLoaded=false


function getAuthHeader() {
  const token = localStorage.getItem('token');
  console.log(token)
  if (!token) {
    alert("Session expired! Please login again.");
    localStorage.clear();
    window.location.href = 'login.html';
    return {}; 
  }
  return {'Authorization': `Bearer ${token}`};g
}

getView=(element)=>{
    inventoryContainer.classList.add('row-layout')
    for(let container of resultContainer){
        container.classList.add('hidden')
    }   
    element.classList.remove('hidden')
}

let resetForm=(element)=>{
    if(element.id==='delete-container'){
        element.querySelector('#prodID').value=""
        return
    }
    element.querySelector('#prodID').value=""
    element.querySelector('#prodID').value=""
    element.querySelector('#prodName').value=""
    element.querySelector('#prodPrice').value=""
}

if(showBtn){
    showBtn.addEventListener('click',async (evt)=>{
    let showURL="http://localhost:8081/api/products"
    try {
        let response=await fetch(showURL,{method:'GET',headers:{
            'Content-Type':'application/json',...getAuthHeader()}})
        console.log(response)
        if (response.status === 401) {
            alert('Session expired! Please login again.');
            localStorage.clear();
            // window.location.href = 'login.html';
            return;
        }
        let responseObj=await response.json()
        if(productLoaded){
            getView(productsContainer)
            return;
        }
        for (product of responseObj){
            let prodID=product.prodID
            let prodPrice=product.prodPrice
            let prodName=product.prodName
            let card=document.createElement('div')
            card.className='product-card'
            card.innerHTML=`<div class="product-info"><h3>${prodName}</h3><p># ${prodID}</p><div class="product-price">${prodPrice}<i class="fa-solid fa-bangladeshi-taka-sign"></i></div></div>`
            productsContainer.appendChild(card)
        }
        productLoaded=true
        getView(productsContainer)
    } catch (error) {
        console.log(error)
    }
    
    })
}

if(addBtn && addContainer){
    addBtn.addEventListener('click',(evt)=>{
        getView(addContainer)
    })
}

if(addSubmit){
    addSubmit.addEventListener('click',async (evt)=>{
        evt.preventDefault()
        let prodID=document.querySelector('#add-product-form #prodID').value
        let prodName=document.querySelector('#add-product-form #prodName').value
        let prodPrice=document.querySelector('#add-product-form #prodPrice').value
        let addObj={"prodID":prodID,"prodName":prodName,"prodPrice":prodPrice}
        console.log(addObj)
        let addURL="http://localhost:8081/api/products"
        let response=await fetch(addURL,{method:'POST',headers:{
            'Content-Type':'application/json',...getAuthHeader()},body:JSON.stringify(addObj)})
        let alertOverlay=document.querySelector('#add-container #alert-overlay')
        let alertMessage=document.querySelector('#add-container #alert-overlay #alert-message')
        console.log(response)
        if(response.ok){
            alertMessage.innerText="Product added Succesfully"
        }
        else{
            alertMessage.innerText="Someting went wrong !"
        }
        
        alertOverlay.classList.add('show')

        alertOverlay.addEventListener('click',()=>{
            alertOverlay.classList.remove('show')
        })
        resetForm(addContainer)
   
    })
}

if(addCancel){
    addCancel.addEventListener('click',(evt)=>{
        resetForm(addContainer)
    })
}

if(updateBtn && updateContainer){
    updateBtn.addEventListener('click',(evt)=>{
        getView(updateContainer)
    })
}

if(updateSubmit){
    updateSubmit.addEventListener('click',async (evt)=>{
        evt.preventDefault()
        let prodID=document.querySelector('#update-product-form #prodID').value
        let prodName=document.querySelector('#update-product-form #prodName').value
        let prodPrice=document.querySelector('#update-product-form #prodPrice').value
        let updateObj={"prodID":prodID,"prodName":prodName,"prodPrice":prodPrice}
        console.log(updateObj)
        
        let updateURL="http://localhost:8081/api/products"
        let response=await fetch(updateURL,{method:'PUT',headers:{
            'Content-Type':'application/json',...getAuthHeader()},body:JSON.stringify(updateObj)})
        
        let alertOverlay=document.querySelector('#update-container #alert-overlay')
        let alertMessage=document.querySelector('#update-container #alert-overlay #alert-message')
        console.log(response)

        if(response.ok){
            alertMessage.innerText="Product updated succesfully"
            
        }
        else{
            alertMessage.innerText="Someting went wrong !"
        }
        
        alertOverlay.classList.add('show')

        alertOverlay.addEventListener('click',()=>{
            alertOverlay.classList.remove('show')
        })
        resetForm(updateContainer)
    })
}

if(updateCancel && updateContainer){
    updateCancel.addEventListener('click',(evt)=>{
        resetForm(updateContainer)
    })
}

if(deleteBtn && deleteContainer){
    deleteBtn.addEventListener('click',(evt)=>{
        getView(deleteContainer)
    })
}

if(deleteSubmit){
    deleteSubmit.addEventListener('click',async (evt)=>{
        evt.preventDefault()
        let prodID=document.querySelector('#delete-product-form #prodID').value
        
        let deleteURL=`http://localhost:8081/api/products/${prodID}`
        let response=await fetch(deleteURL,{method:'DELETE',headers:{...getAuthHeader()}})
        
        let alertOverlay=document.querySelector('#delete-container #alert-overlay')
        let alertMessage=document.querySelector('#delete-container #alert-overlay #alert-message')
        console.log(response)

        if(response.ok){
            alertMessage.innerText="Product deleted succesfully"
        }
        else{
            alertMessage.innerText="Someting went wrong !"
        }
        
        alertOverlay.classList.add('show')

        alertOverlay.addEventListener('click',()=>{
            alertOverlay.classList.remove('show')
        })
        resetForm(deleteContainer)
    })
}

if(deleteCancel && deleteContainer){
    deleteCancel.addEventListener('click',(evt)=>{
        resetForm(deleteContainer)
    })
}

if(searchBtn){
    searchBtn.addEventListener('click',async(evt)=>{
        evt.preventDefault()
        console.log('Search button click')
        let prodID=document.querySelector('.search-container input').value
        console.log(`product id to search is ${prodID}`)
        let searchURL=`http://localhost:8081/api/products/${prodID}`
        let searchOverlay=document.querySelector('#search-overlay')
        
        try{
            let responseObj = await fetch(searchURL,{method:'GET',headers:{...getAuthHeader()}})
            let response=await responseObj.json()
            console.log("Search response",responseObj)
            let card=document.createElement('div')
            card.className='product-card'
            card.innerHTML=`<div class="product-info"><h3>${response.prodName}</h3><p># ${response.prodID}</p><div class="product-price">${response.prodPrice}<i class="fa-solid fa-bangladeshi-taka-sign"></i></div></div>`
            searchOverlay.appendChild(card)
        }
        catch(e){
            let card=document.createElement('div')
            card.className='product-card'
            card.innerHTML=`<div class="product-info"><h3>Product Not Found</h3></div>`
            searchOverlay.appendChild(card)
        }
        
        searchOverlay.classList.add('show')

        searchOverlay.addEventListener('click',()=>{
            searchOverlay.classList.remove('show')
            searchOverlay.innerHTML=``
        })
    })
}








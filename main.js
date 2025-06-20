let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let addMenu = document.getElementById('Input');
let ToBlur = document.getElementById('toBlur');
let mood = 'create';
let temp;
//get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background='#040';
    }
    else{
        total.innerHTML = '';
        total.style.background='#961010';
    }
}
function openAddMenu(){
    addMenu.style.opacity = '1';
    addMenu.style.transform = 'translate(-50%, -50%) scale(1)';
    addMenu.style.zIndex = '5';
    ToBlur.style.filter = 'blur(5px)';
    ToBlur.style.opacity = '0.5';
}

function closeAddMenu(){
    addMenu.style.opacity = '0';
    addMenu.style.zIndex = '-1';
    addMenu.style.transform = 'translate(-50%, -50%) scale(0.8)';
    ToBlur.style.filter = 'blur(0)';
    ToBlur.style.opacity = '1';
}

//create product
let datapro;
if(localStorage.product != null){
    datapro=JSON.parse(localStorage.product);
}
else{
    datapro=[];
}
submit.onclick=function(){
    let newproduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        total:total.innerHTML,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != ''&& category.value != ''&& count.value <= 100){
        if(mood === 'create'){
            datapro.push(newproduct);
        }
        else{
            datapro[temp] = newproduct;
            mood = 'create';
            submit.innerHTML='Create';
            count.style.display='block';
            closeAddMenu();
        }
        clearData();
    }
    localStorage.setItem('product',JSON.stringify(datapro));
    showproducts();
}

//clear inputs
function clearData(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';
}
//show data

function showproducts(){
    getTotal()
    let tableRow='';
    for(let i = 0; i<datapro.length;i++){
        tableRow+=
        `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].count}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
        </tr>    
        `
    }
    document.getElementById('tbody').innerHTML=tableRow;
    let btndeleateAll = document.getElementById('deleteAll');
    if(datapro.length>0){
        btndeleateAll.innerHTML=`
        <button onclick="deleteAll()" id="delete">Delete All (${datapro.length})</button>
        `
    }
    else{
        btndeleateAll.innerHTML='';
    }
}
showproducts();

//delete item
function deleteItem(i){
    datapro.splice(i,1);
    localStorage.product=JSON.stringify(datapro);
    showproducts();
}
//delete all
function deleteAll(){
    localStorage.clear;
    datapro.splice(0);
    showproducts();
}
//update
function updateData(i){
    openAddMenu();
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal();
    count.style.display='none';
    submit.innerHTML='Update'
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior:'smooth',
    })
}
//search mood
let varSearchMood = "title";
function searchMood(id){
    let search = document.getElementById('search');
    if (id == 'searchTitle'){
        varSearchMood = 'title';
        search.placeholder = 'Search by Title';
    }
    else{
        varSearchMood = 'category';
        search.placeholder = 'Search by Category';
    }
    search.focus();
    search.value = '';
}

//search on data
function searchData(value){
    let table = '';
    if(varSearchMood == 'title'){
        for (let i = 0; i < datapro.length; i++) {
            if(datapro[i].title.includes(value.toLowerCase())){
                table+=`
                <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
            </tr>    
            `
            }    
        }

    }
    else{
        for (let i = 0; i < datapro.length; i++) {
            if(datapro[i].category.includes(value.toLowerCase())){
                table+=`
                <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
            </tr>    
            `
            }    
        }
    }
    document.getElementById('tbody').innerHTML=table;
}
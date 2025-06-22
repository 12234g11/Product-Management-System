// Variables
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
let sellMenu = document.getElementById('Sell');
let ToBlur = document.getElementById('toBlur');
let showProduct = document.getElementById('showData');
let hideData = document.getElementById('hideData');
let data = document.getElementById('output');
let mood = 'create';
let temp;
let datapro = localStorage.product ? JSON.parse(localStorage.product) : [];

function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = '#961010';
  }
}
showProduct.addEventListener( 'click' , ()=>{
  data.classList.remove('hide');
});
hideData.addEventListener( 'click' , ()=>{
  data.classList.add('hide');
});

function openSellMenu() {
  closeAddMenu();
  sellMenu.style.opacity = '1';
  sellMenu.style.transform = 'translate(-50%, -50%) scale(1)';
  sellMenu.style.zIndex = '5';
  ToBlur.style.filter = 'blur(5px)';
  ToBlur.style.opacity = '0.5';
  sellInput.value = '';
  categoryInput.value = '';
  countInput.value = '';
  totalLapel.innerHTML = '';
  drop.innerHTML = '';
  drop.classList.remove('active');
}

function closeSellMenu() {
  sellMenu.style.opacity = '0';
  sellMenu.style.zIndex = '-1';
  sellMenu.style.transform = 'translate(-50%, -50%) scale(0.8)';
  ToBlur.style.filter = 'blur(0)';
  ToBlur.style.opacity = '1';
}

function openAddMenu() {
  closeSellMenu();
  addMenu.style.opacity = '1';
  addMenu.style.transform = 'translate(-50%, -50%) scale(1)';
  addMenu.style.zIndex = '5';
  ToBlur.style.filter = 'blur(5px)';
  ToBlur.style.opacity = '0.5';
}

function closeAddMenu() {
  addMenu.style.opacity = '0';
  addMenu.style.zIndex = '-1';
  addMenu.style.transform = 'translate(-50%, -50%) scale(0.8)';
  ToBlur.style.filter = 'blur(0)';
  ToBlur.style.opacity = '1';
  mood = 'create';
  submit.innerHTML = 'Create The Product';
  total.style.background = '#961010';
  clearData();
}

submit.onclick = function () {
  let newproduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
  };

  if (title.value && price.value && category.value && count.value) {
    if (mood === 'create') {
      datapro.push(newproduct);
    } else {
      datapro[temp] = newproduct;
      mood = 'create';
      submit.innerHTML = 'Create The Product';
      closeAddMenu();
    }
    clearData();
  } else {
    window.alert('You Must Enter the Title and the category and the price and Count of this Product.');
  }

  localStorage.setItem('product', JSON.stringify(datapro));
  showproducts();
};

function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

function showproducts() {
  getTotal();
  let tableRow = '';
  for (let i = 0; i < datapro.length; i++) {
    let countColor = datapro[i].count <= 3 ? 'style="color: red; font-weight: bold;"' : '';
    tableRow += `
      <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td ${countColor}>${datapro[i].count}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete" style="background-color: #b90000; color: white;">Delete</button></td>
      </tr>`;
  }

  document.getElementById('tbody').innerHTML = tableRow;

  let btndeleateAll = document.getElementById('deleteAll');
  if (datapro.length > 0) {
    btndeleateAll.innerHTML = `<button onclick="deleteAll()" id="delete" style="background-color: #b90000; color: white;">Delete All (${datapro.length})</button>`;
  } else {
    btndeleateAll.innerHTML = '';
  }
  
  let tableRow2 = '';
  for (let i = 0; i < datapro.length; i++) {
    if(datapro[i].count<4){
      let countColor = datapro[i].count <= 3 ? 'style="color: red; font-weight: bold;"' : '';
      tableRow2 += `
        <tr>
          <td>${i + 1}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].total}</td>
          <td ${countColor}>${datapro[i].count}</td>
          <td>${datapro[i].category}</td>
        </tr>`;
    }

  }
  document.getElementById('tbody2').innerHTML = tableRow2;
}

showproducts();

function deleteItem(i) {
  if (window.confirm("Are you sure you want to delete this product?")) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showproducts();
  }
}

function deleteAll() {
  if (window.confirm("Are you sure you want to delete ALL products?")) {
    localStorage.clear();
    datapro.splice(0);
    showproducts();
  }
}

function updateData(i) {
  openAddMenu();
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  count.value = datapro[i].count;
  category.value = datapro[i].category;
  getTotal();
  submit.innerHTML = 'Update';
  mood = 'update';
  temp = i;
  scroll({ top: 0, behavior: 'smooth' });
}

let varSearchMood = 'title';
function searchMood(id) {
  let search = document.getElementById('search');
  if (id == 'searchTitle') {
    varSearchMood = 'title';
    search.placeholder = 'Search by Title';
  } else {
    varSearchMood = 'category';
    search.placeholder = 'Search by Category';
  }
  search.focus();
  search.value = '';
}

function searchData(value) {
  let table = '';
  let filterFn = varSearchMood == 'title' ? d => d.title.includes(value.toLowerCase()) : d => d.category.includes(value.toLowerCase());

  datapro.forEach((d, i) => {
    if (filterFn(d)) {
      table += `
        <tr>
          <td>${i + 1}</td>
          <td>${d.title}</td>
          <td>${d.price}</td>
          <td>${d.taxes}</td>
          <td>${d.ads}</td>
          <td>${d.discount}</td>
          <td>${d.total}</td>
          <td>${d.count}</td>
          <td>${d.category}</td>
          <td><button onclick="updateData(${i})" id="update">Update</button></td>
          <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
        </tr>`;
    }
  });

  document.getElementById('tbody').innerHTML = table;
}

// Selling Suggestions and Autocomplete
let sellInput = document.getElementById('titlesell'),
  drop = document.getElementById('drop'),
  categoryInput = document.getElementById('categorysell'),
  countInput = document.getElementById('countsell'),
  totalLapel = document.getElementById('total-sell');

let current_object = null;

sellInput.addEventListener('input', (e) => {
    datapro = JSON.parse(localStorage.product || "[]");
    const value = e.target.value.toLowerCase().trim();
    drop.innerHTML = '';
    current_object = null;

    if (value.length === 0) {
      drop.classList.remove('active');
      return;
    }

    const final_data = datapro.filter(data => data.title.includes(value));
    const shownTitles = new Set();

    if (final_data.length > 0) {
      drop.classList.add('active');
      final_data.forEach(d => {
        if (!shownTitles.has(d.title)) {
          let li = document.createElement('li');
          li.innerText = d.title;
          li.addEventListener('click', () => {
            sellInput.value = d.title;
            categoryInput.value = d.category;
            drop.classList.remove('active');
            current_object = d;
          });
          drop.appendChild(li);
          shownTitles.add(d.title);
        }
      });
    } else {
      let li = document.createElement('li');
      li.innerText = 'No match found';
      drop.appendChild(li);
      drop.classList.add('active');
    }
});

countInput.addEventListener('input', (e) => {
  let enteredCount = Number(e.target.value);
  let availableCount = Number(current_object?.count || 0);

  totalLapel.innerHTML = '';
  totalLapel.style.background = '#961010';
  if (e.target.value.trim() === '') {
    return;
  }
  else if(countInput.value > 0){
    totalLapel.innerHTML = enteredCount * Number(current_object.total);
    totalLapel.style.background = '#040';
    ecount = enteredCount;
    flag = 1;
  }

});



function sold() {
  let enteredCount = Number(countInput.value);
  let availableCount = Number(current_object?.count);
  if (!sellInput.value) {
    window.alert('Enter the Name of Product First');
    return;
  }
  if (countInput.value === '') {
    window.alert('Enter the Amount of Product To sell');
    return;
  }
  if (enteredCount <= 0) {
    window.alert('Enter Amount Greater than 0');
    return;
  }
  if (enteredCount > availableCount) {
    window.alert('The Maximum Available Amount is ' + availableCount);
    return;
  }
  current_object.count -= enteredCount;
  localStorage.setItem('product', JSON.stringify(datapro));
  showproducts();
  sellInput.value = '';
  categoryInput.value = '';
  countInput.value = '';
  totalLapel.innerHTML = '';
  totalLapel.style.background = '#961010';
  drop.innerHTML = '';
}


// Dark , light 
let modeButton = document.getElementById('toggleMode');

modeButton.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    modeButton.innerText = 'Switch to Dark Mode';
    totalLapel.classList.add('total-light');
    total.classList.add('total-light');
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    modeButton.innerText = 'Switch to Light Mode';
  }
});

// Set default mode on page load
window.addEventListener('load', () => {
  document.body.classList.add('dark-mode');
  data.classList.add('hide');
  modeButton.innerText = 'Switch to Light Mode';
});

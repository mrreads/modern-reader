dataBook = JSON.parse(localStorage.getItem('dataBook'));

document.querySelector("#titleStatus").textContent = dataBook.name;
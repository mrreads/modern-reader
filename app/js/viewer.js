const content = document.querySelector("#viewer .content");

dataBook = JSON.parse(localStorage.getItem('dataBook'));

document.querySelector("#titleStatus").textContent = dataBook.name;

if (dataBook.ext == '.txt')
{
    textBook = fs.readFileSync(dataBook.path, 'utf8');
    content.textContent = textBook;
}
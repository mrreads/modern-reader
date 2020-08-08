module.exports = {
    updateLibrary: function () 
    {
        if (!document.querySelector('#content .books'))
        {
            booksElement = document.createElement('div');
            booksElement.classList.add('books');
            document.querySelector("#content").appendChild(booksElement);
        }
        else
        {
            booksElement = document.querySelector('#content .books');
        }

        books = JSON.parse(fs.readFileSync(dataBooksPath, 'utf8'));
        
        booksElement.innerHTML = '';
        books.forEach(book => {
            booksElement.innerHTML += `
            <div class="book">
                ${book.name}
            </div>`;
        });
    },
};
  
  
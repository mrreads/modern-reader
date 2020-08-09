module.exports = {
    updateLibrary: function () 
    {
        if (document.querySelector('#content[data-type=book]'))
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
            books.forEach(book => 
            {

                tempBook = document.createElement('div');
                tempBook.classList.add('book');

                if (book.ext == '.txt')
                {
                    tempBook.innerHTML += `
                        <p class="name">${book.name}</p>
    
                        <div class="info">
                            <p>Format: ${book.ext}</p>
                            <p>Strings: ${book.strings}</p>
                        </div>`;
                }

                tempBook.addEventListener('click', () => {
                    localStorage.setItem('path', book.path);
                    window.location = './viewer.html';
                });
                booksElement.appendChild(tempBook);
            });
        }
    },

    updateNotes: function()
    {
        
    }
};
  
  
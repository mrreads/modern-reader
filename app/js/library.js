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

                if (!fs.existsSync(book.path)) { tempBook.classList.add('error') }

                if (book.ext == '.txt')
                {
                    tempBook.innerHTML += `
                        <p class="name"> <strong>${book.name}</strong> </p>
    
                        <div class="info">
                            <p class="format">Format: <i>${book.ext}</i> </p>
                            <p>Strings: <i>${book.strings}</i> </p>
                        </div>`;
                }

                tempBook.addEventListener('click', () => {
                    dataBook = JSON.stringify(book);
                    localStorage.setItem('dataBook', dataBook);
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
  
  
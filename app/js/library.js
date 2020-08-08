module.exports = {
    updateLibrary: function () 
    {
        books = JSON.parse(fs.readFileSync(dataBooksPath, 'utf8'));

        books.forEach(book => {
            console.log(book)
        });
    },
};
  
  
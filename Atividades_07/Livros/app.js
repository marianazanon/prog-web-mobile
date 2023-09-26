document.addEventListener("DOMContentLoaded", () => {
    const getInfoButton = document.getElementById("getInfoButton");
    getInfoButton.addEventListener("click", getBookInfo);

    function getBookInfo() {
        const isbn = "ISBN:0451526538";

        
        const apiUrl = `https://openlibrary.org/api/books?bibkeys=${isbn}&jscmd=data&format=json`;

    
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const bookData = data[isbn];
                displayBookInfo(bookData);
            })
            .catch((error) => {
                console.error("Error fetching book data:", error);
            });
    }

    function displayBookInfo(bookData) {
        const bookInfoDiv = document.getElementById("bookInfo");

        if (bookData) {
            
            const title = bookData.title;
            const authors = bookData.authors.map((author) => author.name).join(", ");
            const publishDate = bookData.publish_date;
            const description = bookData.description;

            const bookInfoHTML = `
                <h2>${title}</h2>
                <p><strong>Authors:</strong> ${authors}</p>
                <p><strong>Publish Date:</strong> ${publishDate}</p>
                <p><strong>Description:</strong> ${description}</p>
            `;

            bookInfoDiv.innerHTML = bookInfoHTML;
        } else {
            bookInfoDiv.innerHTML = "<p>Book not found.</p>";
        }
    }
});

// Function to make API request and display results
function searchBirdSounds() {
    var query = document.getElementById("search").value;
    var apiUrl = `https://xeno-canto.org/api/2/recordings?query=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => {
            alert("Error fetching data from Xeno-canto API.");
        });
}

// Function to display search results
function displayResults(data) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (data.numRecordings === "0") {
        resultsDiv.innerHTML = "No results found.";
        return;
    }

    var recordings = data.recordings;
    for (var i = 0; i < recordings.length; i++) {
        var recording = recordings[i];
        var recordingDiv = document.createElement("div");
        recordingDiv.innerHTML = `
            <h2>${recording.en}</h2>
            <p>Recorded by: ${recording.rec}</p>
            <p>Location: ${recording.loc}</p>
            <p>Date: ${recording.date}</p>
            <audio controls>
                <source src="${recording.file}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        resultsDiv.appendChild(recordingDiv);
    }
}

// Attach event listener to the search button
document.getElementById("searchButton").addEventListener("click", searchBirdSounds);
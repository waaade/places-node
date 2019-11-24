function displayAll() {
    fetch('/seeall', {method: 'GET'})
    .then(function(response) {
        if(response.ok) {
            return response.json();
            console.log("Hi");
        }
        throw new Error('Request failed.');
    })
    .then(function(data) {
        document.getElementById('allplaces').innerHTML = data[0];
    })
    .catch(function(error) {
        console.log(error);
    });
}
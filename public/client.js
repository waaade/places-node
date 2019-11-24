function displayAll() {
    fetch('/seeall', {method: 'GET'})
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Request failed.');
    })
    .then(function(data) {
        document.getElementById('allplaces').innerHTML = data;
    })
    .catch(function(error) {
        console.log(error);
    });
}
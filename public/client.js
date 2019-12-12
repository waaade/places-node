function displayAll() {
    $.get("/seeall", function(data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            $("#allplaces").append("<li>" + item.name + "</li>");
        }
        
    })
}

function nameSearch() {
    var name = $("#placename").val();
    $("#nameresults").empty();
    $.get("/searchbyname", {name:name}, function(data) {
        if (data.length == 0) {
            $("#nameresults").append("<h4>No Results!</h4>");
        }
        else {
            $("#nameresults").append("<h4>Search Results</h4>");
            for (var i = 0; i < data.length; i++) {
            var item = data[i];
            $("#nameresults").append(item.name + "<br>" + item.address + "<br>");
            if (item.phone) {
                $("#nameresults").append(item.phone + "<br>");
                }
            }
            $("#nameresults").append("<a href='reviews/?id=" + item.places_id + "'>Reviews</a>");
        }
    })
}
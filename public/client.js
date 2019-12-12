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
    $.get("/searchbyname", {name:name}, function(data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            $("#nameresults").append("<li>" + item.name + "</li>");
        }
    })
}
function displayAll() {
    $.get("/seeall", function(data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            $("#allplaces").append("<li>" + item.name + "</li>");
        }
        
    })
}
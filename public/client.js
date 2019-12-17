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
    $("#results").empty();
    $("#review").hide();
    $.get("/searchbyname", {name:name}, function(data) {
        if (data.length == 0) {
            $("#results").append("<h4>No Results!</h4>");
        }
        else {
            $("#results").append("<h2>Search Results</h2>");
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                $("#results").append(item.name + "<br>" + item.address + "<br>");
                if (item.phone) {
                    $("#results").append(item.phone + "<br>");
                }
                var buttonEvent = "displayReviews(" + item.places_id + ",'" + item.name.replace(/\s+/g, '_') + "')";
                //Note: spaces are removed because errors result in the generated button otherwise.
                $("#results").append("<button onclick=" + buttonEvent + ">Reviews</button><br>");
            }
        }
    })
}

function typeSearch() {
    var type = $("#type").val();
    $("#results").empty();
    $.get("/searchbytype", {type:type}, function(data) {
        if (data.length == 0) {
            $("#results").append("<h4>No Results!</h4>");
        }
        else {
            $("#results").append("<h2>Search Results</h2>");
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                $("#results").append(item.name + "<br>" + item.address + "<br>");
                if (item.phone) {
                    $("#results").append(item.phone + "<br>");
                }
                var buttonEvent = "displayReviews(" + item.places_id + ",'" + item.name.replace(/\s+/g, '_') + "')";
                //Note: spaces are removed because errors result in the generated button otherwise.
                $("#results").append("<button onclick=" + buttonEvent + ">Reviews</button><br>");
            }
        }
    })
}


function displayReviews(id, name) {
    $("#results").empty();
    name = name.replace('_', ' '); //Replace any underscores with spaces.
    $.get("/reviews", {id:id}, function(data) {
        if (data.length == 0) {
            $("#results").append("<h4>There are no reviews for " + name + " yet.</h4>");
        }
        else {
            $("#results").append("<h3>Reviews for " + name + "</h3>");
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                $("#results").append("<div class='review'>Date: " + item.reviews_date + 
                "<br>Score: " + item.score + "/5<br>" + item.comment + "<br></div>")
            }
        }
        $("#results").append("<br><button onclick='readyReviewForm(" + id + ")'>Leave a Review of " + name + "</button><br>");
    })
}

function submitPlace() {
    const name = $("#name").val();
    const address = $("#address").val();
    var phone = $("#phone").val();
    var type = $("#type").val();
    $.get("/addplace", {name:name, type:type, address:address, phone:phone, type:type}, function(data) {
        
    });
}

function readyReviewForm(id) {
    $("#review").show();
    $("#placeid").val(id);
}

function submitReview() {
    const score = $("#score").val();
    const placeid = $("#placeid").val();
    const comment = $("#comment").val();
    $.get("/addreview", {score:score, placeid:placeid, comment:comment}, function(data){

    });
}
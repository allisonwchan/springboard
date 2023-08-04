$(function() {
    // get rid of bullet points on ul
    $("ul").css("list-style", "none");

    // add items to ul
    $("#submit-button").on('click', function(e) {
        e.preventDefault();

        let movieTitle = $("#movie-title").val();
        let rating = $("#rating").val();
        let newLi = $("<li>", {text: `${movieTitle}, ${rating}`});
        let removeBtn = $("<input>", {type: "submit", value: "Remove", class: "remove-btn"})

        if (rating < 0 || rating > 10) {
            alert('Movie rating must be between 0 and 10!');    
        } 
        
        if (movieTitle.length < 2) {
            alert('Movie title must have at least 2 characters!')

        } else {
            $("ul").append(newLi);
            newLi.append(removeBtn);

            removeBtn.on('click', function(e) {
                e.preventDefault();
                
                $(e.target.parentElement).remove();
            })
        } 
    })
})
        

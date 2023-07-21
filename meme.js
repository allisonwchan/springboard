document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#meme-form");
    let imageURL = document.querySelector("#meme-image");
    let topTextInput = document.querySelector("#top-text-input");
    let btmTextInput = document.querySelector("#btm-text-input");

    const memes = document.querySelector("#generated-memes");
    // let topText = document.querySelector(".top");
    // let btmText = document.querySelector(".btm");

    // handling form submission
    form.addEventListener("submit", function(e) {

        e.preventDefault();

        // check if field is empty
        if (imageURL.value.length === 0 || topTextInput.value.length === 0 || btmTextInput.value.length === 0) {
            alert("Missing section!");
        } else {
            let meme = document.createElement("div"); // this holds image, text, remove button
            let img = document.createElement("img");
            let topText = document.createElement("div");
            let btmText = document.createElement("div");
            let removeButton = document.createElement("button");

            meme.className = "meme-container";
            img.src = imageURL.value;
            removeButton.innerText = "x";

            topText.innerText = topTextInput.value;
            topText.className = "top-text";
            btmText.innerText = btmTextInput.value;
            btmText.className = "btm-text";

            meme.appendChild(topText);
            meme.appendChild(img);
            meme.appendChild(btmText);
            meme.appendChild(removeButton);
            memes.appendChild(meme);

            // removing meme
            removeButton.addEventListener("click", function(e) {
                if (e.target.tagName === 'BUTTON') {
                    // console.log(e.target.parentElement);
                    e.target.parentElement.remove();
                }
    })
        }

        form.reset();
        
    })

    

    
});
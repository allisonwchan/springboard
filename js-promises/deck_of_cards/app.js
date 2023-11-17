const baseURL = "https://deckofcardsapi.com/api";

// part 1
$(function() {
    async function part1() {
        let data = await $.getJSON(`${baseURL}/deck/new/draw/?count=1`);
        let value = data.cards[0].value;
        let suit = data.cards[0].suit;
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }

    // part 2
    async function part2() {
        let firstCardData = await $.getJSON(`${baseURL}/deck/new/draw/?count=1`);
        let deckId = firstCardData.deck_id;
        let secondCardData = await $.getJSON(`${baseURL}/deck/${deckId}/draw/?count=1`);
        [firstCardData, secondCardData].forEach(data => {
            let value = data.cards[0].value;
            let suit = data.cards[0].suit;
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        });
    }

    // part 3
    async function setup() {
        let $btn = $('button');
        let $cardArea = $('#card-area');
    
        let deckData = await $.getJSON(`${baseURL}/deck/new/shuffle/`);
        $btn.show().on('click', async function() {
          let cardData = await $.getJSON(`${baseURL}/deck/${deckData.deck_id}/draw/`);
          let cardSrc = cardData.cards[0].image;
          let angle = Math.random() * 90 - 45;
          let randomX = Math.random() * 40 - 20;
          let randomY = Math.random() * 40 - 20;
          $cardArea.append(
            $('<img>', {
              src: cardSrc,
              css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
              }
            })
          );
          if (cardData.remaining === 0) $btn.remove();
        });
      }
      setup();
})
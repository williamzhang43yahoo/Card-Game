// Define the thirteen ranks (2 to A) and four suits (Clubs, Diamond, Hearts and Spades)
let suits = ['D', 'C', 'H', 'S'];
let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

const CARD_VALUE_MAP = {
    "2D": 2,
    "3D": 3,
    "4D": 4,
    "5D": 5,
    "6D": 6,
    "7D": 7,
    "8D": 8,
    "9D": 9,
    TD: 10,
    JD: 11,
    QD: 12,
    KD: 13,
    AD: 14,
    "2C": 22,
    "3C": 23,
    "4C": 24,
    "5C": 25,
    "6C": 26,
    "7C": 27,
    "8C": 28,
    "9C": 29,
    TC: 30,
    JC: 31,
    QC: 32,
    KC: 33,
    AC: 34,
    "2H": 42,
    "3H": 43,
    "4H": 44,
    "5H": 45,
    "6H": 46,
    "7H": 47,
    "8H": 48,
    "9H": 49,
    TH: 50,
    JH: 51,
    QH: 52,
    KH: 53,
    AH: 54,
    "2S": 62,
    "3S": 63,
    "4S": 64,
    "5S": 65,
    "6S": 66,
    "7S": 67,
    "8S": 68,
    "9S": 69,
    TS: 70,
    JS: 71,
    QS: 72,
    KS: 73,
    AS: 74,
}

// get element DOM for dynamically updating the values
const deck1StartElement = document.querySelector(".deck1-start")
const deck2StartElement = document.querySelector(".deck2-start")
const deck1FinishedElement = document.querySelector(".deck1-end")
const deck2FinishedElement = document.querySelector(".deck2-end")
const text = document.querySelector(".text")
const oneDeckBtn = document.querySelector(".one-deck-card")
const twoDeckBtn = document.querySelector(".two-deck-card")

let deck1, deck2
let deckArr = []

// Create an original deck of 52 cards has thirteen ranks and four suits, and generate numbers of deck as the game needed;
const creatDeck = (numOfDecks) => {
    for (let n = 0; n < numOfDecks; n++) {
        let originalDeck = [];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                originalDeck.push(ranks[j] + suits[i])
            }
        }
        // console.log('originalDeck is: ', originalDeck)
        deckArr = deckArr.concat(originalDeck)
    }
    // console.log('deckArr is: ', deckArr)
    return deckArr
}

// Create the event handlers to play the games by using one set of deck cards or two set of deck cards
const oneDeckPlay = () => {
    deckArr = creatDeck(1);
    startGame()
    deckArr = []
}

const twoDeckPlay = () => {
    deckArr = creatDeck(2);
    startGame()
    deckArr = []
}

oneDeckBtn.onclick = oneDeckPlay;
twoDeckBtn.onclick = twoDeckPlay;

// shuffle the cards in the deck to make a random order of deck
const shuffleDeck = (deck) => {
    const newArr = deck.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        // Pick a random card from original deck, and excludes it from the next shuffle.
        const randIndex = Math.floor(Math.random() * (i + 1))

        // Swap the picked card with the current card, then pick the next random card from the remainder.
        let temp = newArr[i];
        newArr[i] = newArr[randIndex];
        newArr[randIndex] = temp;
    }
    return newArr
}

// Start to play game by using only one deck of cards with two players evenly splitting the deck of cards;
const startGame = () => {
    let deck = shuffleDeck(deckArr)
    // console.log('randDeck is: ', deck)

    const deckMid = Math.ceil(deck.length / 2)
    deck1 = deck.slice(0, deckMid)
    deck2 = deck.slice(deckMid, deck.length)

    deck1StartElement.innerHTML = JSON.stringify(deck1).replaceAll(",", " ")
    deck2StartElement.innerHTML = JSON.stringify(deck2).replaceAll(",", " ")
    console.log('deck1 is: ', deck1)
    console.log('deck2 is: ', deck2)

    for (let i = 0; i < 10000; i++) {
        const currCard1 = deck1.pop()
        const currCard2 = deck2.pop()

        if (CARD_VALUE_MAP[currCard1] > CARD_VALUE_MAP[currCard2]) {
            deck1.push(currCard1)
            deck1.push(currCard2)

        } else if (CARD_VALUE_MAP[currCard2] > CARD_VALUE_MAP[currCard1]) {
            deck2.push(currCard1)
            deck2.push(currCard2)

        } else {
            deck1.push(currCard1)
            deck1 = shuffleDeck(deck1)
            deck2.push(currCard2)
            deck2 = shuffleDeck(deck2)
        }

        if (deck1.length === 0) {
            deck1FinishedElement.innerHTML = JSON.stringify(deck1).replaceAll(",", " ")
            deck2FinishedElement.innerHTML = JSON.stringify(deck2).replaceAll(",", " ")
            text.innerText = "Deck 2 Win!"
            break
        } else if (deck2.length === 0) {
            deck1FinishedElement.innerHTML = JSON.stringify(deck1).replaceAll(",", " ")
            deck2FinishedElement.innerHTML = JSON.stringify(deck2).replaceAll(",", " ")
            text.innerText = "Deck 1 Win!"
            break
        } else if (i === 9999) {
            deck1FinishedElement.innerHTML = JSON.stringify(deck1).replaceAll(",", " ")
            deck2FinishedElement.innerHTML = JSON.stringify(deck2).replaceAll(",", " ")
            text.innerText = "Game is a Draw"
        }
    }
}
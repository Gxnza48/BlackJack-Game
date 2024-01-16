// Define card suits and values
const suits = ["Hearts", "Diamond", "Clubs", "Spades"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

// Function to create a deck of cards
function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

// Function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function to calculate the score of a hand
function calculateScore(hand) {
    let score = 0;
    let hasAce = false;

    for (let card of hand) {
        if (card.value === "A") {
            hasAce = true;
        }
        score += cardValue(card.value);
    }

    if (hasAce && score + 10 <= 21) {
        score += 10;
    }

    return score;
}

// Function to convert card value to numeric value
function cardValue(value) {
    if (value === "K" || value === "Q" || value === "J") {
        return 10;
    } else if (value === "A") {
        return 1;
    } else {
        return parseInt(value);
    }
}

// Global variables
let deck = [];
let playerHand = [];
let dealerHand = [];

// Function to start a new game
function deal() {
    deck = createDeck();
    shuffleDeck(deck);

    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];

    updateUI();
}

// Function to draw a card from the deck
function drawCard() {
    return deck.pop();
}

// Function to handle the "Hit" button click
function hit() {
    playerHand.push(drawCard());

    updateUI();

    if (calculateScore(playerHand) > 21) {
        endGame("You busted! Dealer wins.");
    }
}

// Function to handle the "Stand" button click
function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(drawCard());
    }

    updateUI();

    if (calculateScore(dealerHand) > 21 || calculateScore(playerHand) > calculateScore(dealerHand)) {
        endGame("You win!");
    } else if (calculateScore(playerHand) < calculateScore(dealerHand)) {
        endGame("Dealer wins.");
    } else {
        endGame("It's a tie!");
    }
}

// Function to update the UI with current game state
function updateUI() {
    displayHand(playerHand, "player-cards", "player-score");
    displayHand(dealerHand, "dealer-cards", "dealer-score");
}

// Function to display a hand in the UI
function displayHand(hand, containerId, scoreId) {
    const container = document.getElementById(containerId);
    const scoreElement = document.getElementById(scoreId);

    container.innerHTML = "";
    for (let card of hand) {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        
        const iconElement = document.createElement("i");
        iconElement.className = `icon ${card.suit}-icon`;

        cardElement.appendChild(iconElement);
        cardElement.innerHTML += `${card.value}`;
        container.appendChild(cardElement);
    }

    scoreElement.textContent = `Score: ${calculateScore(hand)}`;
}


// Function to end the game and display the result
function endGame(message) {
    document.getElementById("result").textContent = message;
    document.getElementById("buttons").style.display = "none";
}


// Variables para el manejo de las apuestas
let saldo = parseInt(localStorage.getItem("saldo")) || 10000;
let apuesta = 0;

function placeBet(amount) {
    if (amount > saldo) {
        alert("No tienes suficiente saldo.");
        return;
    }
    apuesta += amount;
    saldo -= amount;
    updateSaldo();
    updateApuesta();
    updateUI();
}

function clearBet() {
    saldo += apuesta;
    apuesta = 0;
    updateSaldo();
    updateApuesta();
    updateUI();
}

function repeatBet() {
    if (saldo < apuesta) {
        alert("No tienes suficiente saldo para repetir la apuesta.");
        return;
    }
    saldo -= apuesta;
    apuesta *= 2; // Duplicar la apuesta al repetirla
    updateSaldo();
    updateApuesta();
    updateUI();
}

function updateSaldo() {
    localStorage.setItem("saldo", saldo);
    document.getElementById("current-saldo").textContent = `${saldo}$`;
}

function updateApuesta() {
    document.getElementById("current-apuesta").textContent = `${apuesta}$`;
}
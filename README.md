# Blackjack CLI (Node.js + TypeScript + Vitest)

A CLI that plays one round of Blackjack per the brief: you vs Dealer, with automatic rules (player draws to 17+, dealer draws until higher than player or bust). It fetches the deck from a URL (or a default), prints the result in the exact format, and includes tests.

## Install
npm i

## Development
npm run dev

## Production (build → run)
npm run build
npm start

## Docker
### Build image: 
npm run docker:build
### Run container:
npm run docker: run


## CLI usage (summary)

Interactive (TTY): prompts for Name, Deck URL, Mode.
Non-interactive (no TTY):
Name = PLAYER_NAME env or default "Player"
URL = DECK_URL env or provided URL arg or default
Mode = automatic unless --manual is passed

## Test
npm test

## Rules (from the brief)

Two players: You and the Dealer

Deck

Fetched from a URL given on the command line. If not provided, default:
https://sandbox.getunleash.io/blackjack/shuffle

Card JSON shape: {"suit":"HEARTS","value":"5"}

Suits: HEARTS | CLUBS | SPADES | DIAMONDS

Values: 2,3,4,5,6,7,8,9,10,J,Q,K,A

Values

J, Q, K = 10

A = 11

Number cards = their number

Gameplay (one round)

Player draws two cards.

Dealer draws two cards.

If either has Blackjack (21 with 2 cards) after the initial draw:

If both have Blackjack → Dealer wins

Else the one with Blackjack wins

If no opening Blackjack:

Player draws until score ≥ 17. If > 21 → player busts → Dealer wins.

If player didn’t bust, Dealer draws until strictly higher than player’s score or busts (> 21).

If Dealer busts → Player wins; otherwise Dealer stopped because score > player → Dealer wins.

Further clarification

If player busts, player loses (regardless of dealer).

“Blackjack” only counts with exactly 2 cards totaling 21.

Output

Suit letters: H | S | C | D

Value string is the same as received.

Print:

Winner: <name>

Dealer | <score> | S7,S10,CJ
<PlayerName> | <score> | D2,H2,C6,H9

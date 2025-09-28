# Blackjack CLI (Node.js + TypeScript + Docker)

A command-line Blackjack app that plays a single round exactly as specified—you vs. Dealer. It auto-plays by the rules (player draws to 17+, dealer draws until strictly higher or bust), fetches a deck from a URL (or a default), prints the result in the required format, and includes tests. An optional UI is also available.

## Requirements
Node.js 22.x (recommended).
OS- Windows 10/11, macOS 12+, or Linux.

## Install
git clone https://github.com/laniyan88/blackjack-task.git
cd blackjack-task
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

## Test
npm test


## CLI usage (summary)

Interactive (TTY): prompts for Name, Deck URL, Mode.
Non-interactive (no TTY):
Name = PLAYER_NAME env or default "Player"
URL = DECK_URL env or provided URL arg or default
Mode = automatic unless --manual is passed


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

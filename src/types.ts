export type Suit = "HEARTS" | "CLUBS" | "SPADES" | "DIAMONDS";
export type FaceValue = "J" | "Q" | "K" | "A";
export type NumValue = "2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10";
export type Value = NumValue | FaceValue;


export interface Card { suit: Suit; value: Value; hidden?: boolean }


export interface HandState {
name: string;
cards: Card[];
hideHole?: boolean
}


export interface GameResult {
winner: string; 
dealer: HandState;
player: HandState; 
}
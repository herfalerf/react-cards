import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [cards, setCards] = useState([]);

  const add = (cardsObj) => {
    setCards((cards) => [...cards, cardsObj]);
  };

  useEffect(() => {
    async function loadDeck() {
      const deckRes = await axios.get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      );
      setDeck(deckRes.data.deck_id);
      console.log(deckRes.data);
    }

    loadDeck();
  }, [setDeck]);

  console.log(`this is the deck code: ${deck}`);

  const getCard = async function getCard() {
    let cardRes = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
    );
    console.log(cardRes.data.cards[0]);
    const card = cardRes.data.cards[0];
    setCards((c) => [
      ...c,
      { id: card.code, name: card.value + " of " + card.suit },
    ]);
  };
  console.log(cards);
  const cardsList = cards.map((c) => <Card key={c.id} name={c.name} />);

  return (
    <>
      <button onClick={getCard}>Get Card</button>
      <ul>
        <div>{cardsList}</div>
      </ul>
    </>
  );
};

export default Deck;

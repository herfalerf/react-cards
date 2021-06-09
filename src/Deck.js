import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    async function loadDeck() {
      const deckRes = await axios.get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      );
      setDeck(deckRes.data);
    }

    loadDeck();
  }, [setDeck]);

  const getCard = async function getCard() {
    try {
      let cardRes = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );
      if (cardRes.data.remaining === 0) {
        stopTimer();
        throw new Error("no cards remaining!");
      }

      const card = cardRes.data.cards[0];
      setCards((c) => [
        ...c,
        { id: card.code, name: card.value + " of " + card.suit },
      ]);
    } catch (err) {
      alert(err);
    }
  };

  const timerId = useRef();

  useEffect(() => {
    if (draw === true) {
      timerId.current = setInterval(() => {
        getCard();
      }, 1000);

      return () => {
        clearInterval(timerId.current);
      };
    } else {
      stopTimer();
    }
  });

  const stopTimer = () => {
    clearInterval(timerId.current);
  };

  const toggleDraw = () => {
    setDraw(!draw);
  };

  const cardsList = cards.map((c) => <Card key={c.id} name={c.name} />);

  return (
    <>
      <button onClick={toggleDraw}>
        {draw ? "Stop Drawing" : "Start Drawing"}
      </button>
      <ul>
        <div>{cardsList}</div>
      </ul>
    </>
  );
};

export default Deck;

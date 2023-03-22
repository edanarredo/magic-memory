import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {

  // Game state
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);


  // This function will get ran each game restart.
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    // Update card state with shuffled cards.
    setCards(shuffledCards)
    setTurns(0)
  }

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // Pass in a function and a dependency array
  useEffect(() => {
    if (choiceOne && choiceTwo) {

      // If we have a match, update card state
      if (choiceOne.src === choiceTwo.src)  {

        // Take previous card states to update state.
        setCards(prevCards => {

          // Return a new array of cards with the marked match
          return prevCards.map(card => {

            // Find the matching card and update it.
            if (card.src === choiceOne.src)
              return {...card, matched: true}
            else  
              return card;
          })
        })
      }
      else 
        console.log("no match.");

      resetTurn();
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice} 
          />
        ))}
      </div>
    </div>
  );
}

export default App
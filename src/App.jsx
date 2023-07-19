//REACT
import { useState, useEffect, useCallback } from 'react'

//CSS
import './App.css'

//COMPONENTS
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

//DATA
import { wordsList } from '../src/data/words'


const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'gameOver' }
]


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [pickedCategory, setPickedCategory] = useState('')
  const [pickedWord, setPickedWord] = useState('')
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickCategoryAndWord = () => {
    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]

    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {category, word}
  }

  //start the game
  const startGame = () => {
    //pick category and word
    const {category, word} = pickCategoryAndWord()
    console.log(category, word)

    //create a array of letters
    let wordLetters = word.split('')
    wordLetters.map(l => l.toLowerCase())
    console.log(wordLetters)

    //fill states
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  //process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //restart the game
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className='app'>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} category={pickedCategory} word={pickedWord} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gameStage === 'gameOver' && <GameOver retry={retry} />}
    </div>
  )
}

export default App

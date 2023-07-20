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
  let [guesses, setGuesses] = useState(3)
  let [score, setScore] = useState(0)

  const pickCategoryAndWord = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]

    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {category, word}
  }, [words])

  //start the game
  const startGame = useCallback(() => {
    //pick category and word
    const {category, word} = pickCategoryAndWord()

    //create a array of letters
    let wordLetters = word.split('')
    wordLetters = wordLetters.map(l => l.toLowerCase())    

    //fill states
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)

    setGuessedLetters([])
    setWrongLetters([])

    setGameStage(stages[1].name)
  }, [pickCategoryAndWord])

  //process the letter input
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()

    //check if letter has already been utilized
    if (guessedLetters?.includes(normalizedLetter) || wrongLetters?.includes(normalizedLetter)) {
      return
    }

    //push guessed letter or remove a chance
    letters.includes(normalizedLetter) ? (setGuessedLetters([...guessedLetters, normalizedLetter])) : (setWrongLetters([...wrongLetters, normalizedLetter]), setGuesses(guesses -1))
  }
  
  //change the game stage
  useEffect( () => {
    if(guesses <= 0) {
      setGuessedLetters([])
      setWrongLetters([])
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //check win condition
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]

    //win condition
    if(guessedLetters.length === uniqueLetters.length) {
      //add score
      setScore(score += 100)
      
      //start a new game
      startGame()
    }

  }, [guessedLetters])

  //restart the game
  const retry = () => {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  }

  return (
    <div className='app'>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} category={pickedCategory} pickedWord={pickedWord} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {gameStage === 'gameOver' && <GameOver retry={retry} score={score}/>}
    </div>
  )
}

export default App

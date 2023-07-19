import './Game.css'

const Game = ({ verifyLetter, category, word, letters, guessedLetter, wrongLetters, guesses, score }) => {
  return (
    <div className='game'>
      <p>Pontuação: <span>{score}</span></p>
      <h2>Advinhe a palavra</h2>
      <h3 className='tip'>Dica sobre a palavra: <span>{category}</span></h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className="word_container">
        {letters.map((letter, i) =>
        (guessedLetter?.includes(letter) ?
          (<span className='letter' key={i}>{letter}</span>) :
          (<span className='blank_square' key={i}></span>)
        ))}
      </div>
      <div className="letter_container">
        <p>Tente adivinhar uma letra da palavra</p>
        <form>
          <input type='text' maxLength={1} required />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrong_letters">
        <p>Letras já utilizadas: </p>
        {wrongLetters.map((wrong, i) => (
          <span key={i}>{wrong}, </span>
        ))}
      </div>
      <p>OBS: Algumas palavras contem acentuação, e caso percebar que a palavra contenha, envie a letra com acentuação</p>
    </div>
  )
}

export default Game
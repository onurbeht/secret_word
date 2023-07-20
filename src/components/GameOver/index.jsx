import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div className='game_over'>
      <h1>GameOver!</h1>
      <p>A sua pontuação foi: <span>{score}</span></p>
      <button onClick={retry}>Começar denovo</button>
    </div>
  )
}

export default GameOver
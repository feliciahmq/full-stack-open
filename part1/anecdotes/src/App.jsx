import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = (props) => {
  return (
    <div>
      <div>{props.anecdote}</div>
      <div>has {props.vote} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0));

  const nextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteClick = () => {
    const newVote = [...voted];
    newVote[selected] += 1;
    setVoted(newVote);
  }

  const max = Math.max(...voted);
  const maxAnecdote = voted.indexOf(max);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={voted[selected]} />
      <p>
        <Button handleClick={voteClick} text='vote' />
        <Button handleClick={nextClick} text='next anecdote' />
      </p>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[maxAnecdote]} vote={max} />
    </div>
  )
}

export default App
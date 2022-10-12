import { useState } from 'react'

const MostVotedAnecdote = ({ anecdotes, votes }) => {

  const getTopAnecdote = () => {
    let maxValue = -1;
    let index;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > maxValue) {
        maxValue = votes[i]
        index = i;
      }
    }
    return anecdotes[index];
  }

  return (
    <div>
      <h2>Eniten äänestetty anekdootti</h2>
      <p>{getTopAnecdote()}</p>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  let votesCopy
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => setSelected((Math.random() * (anecdotes.length - 1)).toFixed(0))

  const vote = () => {
    votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Ääniä: {votes[selected]}</p>
      <button onClick={vote}>Äänestä</button>
      <button onClick={nextAnecdote}>Seuraava anekdootti</button>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App

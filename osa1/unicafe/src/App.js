import { useState } from 'react'

const Header = () => (
  <h1>Anna palautetta</h1>
)

const FeedbackButton = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = ({good, neutral, bad}) => (
  <div>
    <h2>Tilastot</h2>
    <p>Hyvä: {good}</p>
    <p>Neutraali: {neutral}</p>
    <p>Huono: {bad}</p>
    <p>Arvosteluja saatu: {good + neutral + bad} kpl</p>
    <p>Arvostelujen keskiarvo: {(good + -bad) / (good + bad)}</p>
    <p>Positiivisia palautteita: {(1 / ((good + bad + neutral) / good)) * 100} %</p>
  </div>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Header />
      <FeedbackButton 
        handleClick={incrementGood}
        text="hyvä"
      />
      <FeedbackButton 
        handleClick={incrementNeutral}
        text="neutraali"
      />
      <FeedbackButton 
        handleClick={incrementBad}
        text="huono"
      />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
      />
    </div>
  )
}

export default App

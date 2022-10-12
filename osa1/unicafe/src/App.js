import { useState } from 'react'

const Header = () => (
  <h1>Anna palautetta</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <p>{text}: {value}</p>
)

const Statistics = ({ good, neutral, bad }) => (
  <div>
    <h2>Tilastot</h2>
    {good + neutral + bad > 0
      ? <>
          <StatisticLine text="Hyvä" value={good} />
          <StatisticLine text="Neutraali" value={neutral} />
          <StatisticLine text="Huono" value={bad} />
          <StatisticLine text="Arvosteluja saatu" value={good + neutral + bad} />
          <StatisticLine text="Arvostelujen keskiarvo" value={(good + -bad) / (good + bad)} />
          <StatisticLine text="Positiivisia palautteita" value={((1 / ((good + bad + neutral) / good)) * 100) + " %"} />
        </>
      : <p>Palautetta ei olla vielä vastaanotettu.</p>
    }
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
      <Button 
        handleClick={incrementGood}
        text="hyvä"
      />
      <Button 
        handleClick={incrementNeutral}
        text="neutraali"
      />
      <Button 
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

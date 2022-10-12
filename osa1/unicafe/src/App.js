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
    { good + neutral + bad > 0
      ? <table>
          <tbody>
            <tr>
              <td>Hyvä</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutraali</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Huono</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>Arvosteluja saatu</td>
              <td>{good + neutral + bad}</td>
            </tr>
            <tr>
              <td>Arvostelujen keskiarvo</td>
              <td>{(good + -bad) / (good + bad)}</td>
            </tr>
            <tr>
              <td>Positiivisia palautteita</td>
              <td>{((1 / ((good + bad + neutral) / good)) * 100) + " %"}</td>
            </tr>
          </tbody>
        </table>
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

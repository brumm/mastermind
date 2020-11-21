import React from 'react'
import 'modern-normalize'

const colors = ['red', 'green', 'blue', 'pink', 'yellow', 'gray']

const makeRandomPattern = (repeating = true) => {
  const pattern = []

  while (pattern.length < columns) {
    const colorIndex = Math.floor(Math.random() * colors.length)
    const color = colors[colorIndex]

    if (repeating === false && pattern.includes(color)) {
      continue
    }

    pattern.push(color)
  }

  return pattern
}

const columns = 4
const rows = 8

const patternToBeGuessed = makeRandomPattern()

const getResult = (patternToBeGuessed, playerPattern) => {
  return playerPattern
    .map((pattern, index) => {
      if (patternToBeGuessed[index] === pattern) {
        return 'black'
      } else if (patternToBeGuessed.includes(pattern)) {
        return 'white'
      }
    })
    .filter(Boolean)
    .sort()
}

export default function App() {
  const visibleColumns = columns + 2
  const visibleRows = rows + 1
  const [guesses, setGuesses] = React.useState([makeRandomPattern()])
  const results = guesses.map((guess) => getResult(patternToBeGuessed, guess))

  return (
    <div
      style={{
        display: 'grid',
        width: '100vw',
        height: '100vh',
        gridTemplateColumns: `repeat(${visibleColumns}, 50px)`,
        gridTemplateRows: `repeat(${visibleRows}, 50px)`,
        gridGap: 5,
      }}
    >
      <div
        style={{
          display: 'contents',
        }}
      >
        <div></div>
        <div></div>
        {patternToBeGuessed.map((thing) => (
          <div
            style={{
              backgroundColor: thing,
            }}
          ></div>
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIndex, { length }) => (
        <div
          style={{
            display: 'contents',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {length - rowIndex}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(2, 1fr)`,
              gridTemplateRows: `repeat(2, 1fr)`,
              backgroundColor: 'gray',
              gridGap: 5,
              padding: 5,
            }}
          >
            {results[length - rowIndex - 1] &&
              results[length - rowIndex - 1].map((result) => (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: result,
                  }}
                />
              ))}
          </div>

          {Array.from({ length: columns }).map((_, columnIndex) => (
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor:
                  guesses[length - rowIndex - 1] &&
                  guesses[length - rowIndex - 1][columnIndex],
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}

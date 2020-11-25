import React from 'react'
import 'modern-normalize'

import { generatePattern, getResult, colors } from './utils'

const Game = ({ columns, rows, secretPattern }) => {
  const [guesses, setGuesses] = React.useState([])

  const results = guesses.map((guess) => getResult(secretPattern, guess))

  return (
    <div
      style={{
        '--slot-size': '100px',
        display: 'inline-grid',
        gridTemplateColumns: `var(--slot-size) repeat(${columns}, var(--slot-size)) var(--slot-size)`,
        gridTemplateRows: `var(--slot-size) repeat(${rows}, var(--slot-size)) var(--slot-size)`,
        gridGap: 10,
        padding: 20,
      }}
    >
      <div
        style={{
          display: 'contents',
        }}
      >
        <div />
        {secretPattern.map((value, index) => (
          <div
            style={{
              gridColumnStart: index + 2,
              backgroundColor: colors[value],
              borderRadius: '50%',
            }}
          />
        ))}
        <div />
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
              fontSize: 'calc(var(--slot-size) * 0.6)',
              fontWeight: 'bold',
              color: '#faecd7',
            }}
          >
            {length - rowIndex}
          </div>

          {Array.from({ length: columns }).map((_, columnIndex) => {
            const value =
              guesses[length - rowIndex - 1] &&
              guesses[length - rowIndex - 1][columnIndex]

            return (
              <div
                style={{
                  borderRadius: '50%',
                  backgroundColor: colors[value] || '#faecd7',
                }}
              ></div>
            )
          })}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns / 2}, 1fr)`,
              gridTemplateRows: `repeat(${columns / 2}, 1fr)`,
              backgroundColor: '#faecd7',
              borderRadius: 5,
              gridGap: 7,
              padding: 7,
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
                    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.15) inset',
                  }}
                />
              ))}
          </div>
        </div>
      ))}

      <div />
      {colors.map((color) => (
        <div style={{ backgroundColor: color, borderRadius: '50%' }} />
      ))}
    </div>
  )
}

const App = () => {
  const columns = 4
  return <Game columns={columns} rows={6} secretPattern={[1, 2, 3, 4]} />
}

export default App

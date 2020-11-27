import React, { Fragment, useState } from "react";
import { createPortal } from "react-dom";

import "modern-normalize";

import { generatePattern, getResult, colors } from "./utils";

const SpecialCell = ({ columnIndex }) => {
  const [activeCell, setActiveCell] = useState(0);
  const [position, setPosition] = useState(null);
  const [cellBackgroundColor, setCellBackgroundColor] = useState("#faecd7");
  const ref = React.useRef(null);

  const setColor = (color) => {
    setCellBackgroundColor(color);
  };

  const openColorPicker = (index) => {
    setActiveCell(index);
    setPosition((pos) => {
      if (position === null) {
        return ref.current.getBoundingClientRect();
      }
      return null;
    });

    return;
  };

  return (
    <Fragment>
      <div
        style={{
          borderRadius: "50%",
          backgroundColor: cellBackgroundColor,
          textAlign: "center",
          position: "relative",
        }}
        ref={ref}
        id={columnIndex}
        key={columnIndex}
        onClick={() => openColorPicker(columnIndex)}
      ></div>
      {position !== null &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: position.top + position.height - 110,
              left: position.left + 110,
              width: position.width + 25,
              backgroundColor: "white",
              boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
              padding: 10,
              margin: 0,
              zIndex: 1,
              textAlign: "left",
            }}
          >
            <Fragment>
              <button
                style={{
                  backgroundColor: "crimson",
                  borderRadius: "100%",
                  height: "40px",
                  width: "40px",
                  display: "inline-block",
                  margin: "5px",
                }}
                onClick={() => setColor("crimson")}
              ></button>
              <button
                style={{
                  backgroundColor: "olivedrab",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  display: "inline-block",
                  margin: "5px",
                }}
                onClick={() => setColor("olivedrab")}
              ></button>
              <button
                style={{
                  backgroundColor: "dodgerblue",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  display: "inline-block",
                  margin: "5px",
                }}
                onClick={() => setColor("dodgerblue")}
              ></button>
              <button
                style={{
                  backgroundColor: "deeppink",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  display: "inline-block",
                  margin: "5px",
                }}
                onClick={() => setColor("deeppink")}
              ></button>
              <button
                style={{
                  backgroundColor: "gold",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  display: "inline-block",
                  margin: "5px",
                }}
                onClick={() => setColor("gold")}
              ></button>
            </Fragment>
          </div>,
          document.getElementById("specialCellContainer")
        )}
    </Fragment>
  );
};

const UserInput = () => {
  return (
    <div style={{ display: "contents" }}>
      <SpecialCell columnIndex={0} />
      <SpecialCell columnIndex={1} />
      <SpecialCell columnIndex={2} />
      <SpecialCell columnIndex={3} />
    </div>
  );
};

const Game = ({ columns, rows, secretPattern }) => {
  const [guesses, setGuesses] = React.useState([]);
  const results = guesses.map((guess) => getResult(secretPattern, guess));
  const hasWon = results.some(
    (result) =>
      result.length === columns && result.every((pin) => pin === "black")
  );

  // if (hasWon) {
  //   return <div>you won! 🎉</div>
  // }

  return (
    <Fragment>
      <div
        style={{
          display: "inline-grid",
          "--slot-size": "100px",
          gridTemplateColumns: `var(--slot-size) repeat(${columns}, var(--slot-size)) var(--slot-size)`,
          gridTemplateRows: `var(--slot-size) repeat(${rows}, var(--slot-size)) var(--slot-size)`,
          gridGap: 10,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "contents",
          }}
        >
          <div />
          {secretPattern.map((value, index) => (
            <div
              style={{
                gridColumnStart: index + 2,
                backgroundColor: colors[value],
                borderRadius: "50%",
              }}
            />
          ))}
          <div />
        </div>

        {Array.from({ length: rows }).map((_, rowIndex, { length }) => (
          <div
            id={"specialCellContainer"}
            style={{
              display: "contents",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "calc(var(--slot-size) * 0.6)",
                fontWeight: "bold",
                color:
                  guesses.length === length - rowIndex - 1 ? "red" : "#faecd7",
              }}
            >
              {length - rowIndex}
            </div>

            {guesses.length === length - rowIndex - 1 ? (
              <UserInput />
            ) : (
              <Fragment>
                {Array.from({ length: columns }).map((_, columnIndex) => {
                  const value =
                    guesses[length - rowIndex - 1] &&
                    guesses[length - rowIndex - 1][columnIndex];

                  return (
                    <div
                      style={{
                        borderRadius: "50%",
                        backgroundColor: colors[value] || "#faecd7",
                      }}
                    ></div>
                  );
                })}
              </Fragment>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns / 2}, 1fr)`,
                gridTemplateRows: `repeat(${columns / 2}, 1fr)`,
                backgroundColor: "#faecd7",
                borderRadius: 5,
                gridGap: 7,
                padding: 7,
              }}
            >
              {results[length - rowIndex - 1] &&
                results[length - rowIndex - 1].map((result) => (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      backgroundColor: result,
                    }}
                  />
                ))}
            </div>
          </div>
        ))}

        <div />
        {colors.map((color) => (
          <div style={{ backgroundColor: color, borderRadius: "50%" }} />
        ))}
      </div>
    </Fragment>
  );
};

const App = () => {
  const columns = 4;

  return (
    <Game columns={columns} rows={6} secretPattern={generatePattern(columns)} />
  );
};

export default App;

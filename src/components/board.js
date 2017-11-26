import React from 'react';
import Square from "./square";

const Board = ({ onClick, squares, winningLine }) => {
        const side = Math.sqrt(squares.length);
        let counter = 0;

        const rows = [...Array(side)].map((_, row) => {
            const cells = [...Array(side)].map((_, column) => {
                const idx = counter;
                const squareStyle = winningLine && winningLine.includes(idx) ? {color: "white", background: "red"} : {};
                counter++;

                return (
                    <Square
                        key={idx}
                        value={squares[idx]}
                        onClick={() => onClick(idx, row, column)}
                        squareStyle={squareStyle}
                    />
                );
            });
            return (
                <div key={row} className="board-row">
                    {cells}
                </div>
            );
        });

        return rows;
}

export default Board;

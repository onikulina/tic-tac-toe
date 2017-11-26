import React from 'react';
import { $, merge } from "glamor";
import { calculateWinner } from '../helpers/helpers';
import Board from "./board";

export class Game extends React.Component {
    
    styles = merge(
        {
            font: "14px Century Gothic, Futura, sans-serif",
            margin: "20px"
        },
        $(" ol, ul", {
            paddingLeft: "30px",
        }),
        $(" .board-row:after", {
            clear: "both",
            content: "",
            display: "table"
        }),
        $(" .status", {
            marginBottom: "10px"
        }),
        $(" .square", {
            background: "#fff",
            border: "1px solid #999",
            borderRadius: "0px",
            float: "left",
            fontSize: "35px",
            fontWeight: "bold",
            lineHeight: "34px",
            height: "75px",
            marginRight: "-1px",
            marginTop: "-1px",
            padding: "0",
            textAlign: "center",
            width: "75px"
        }),
        $(" .square:focus", {
            outline: "none"
        }),
        $(" .game", {
            display: "flex",
            flexDirection: "row"
        }),
        $(" .move", {
            border: "none"
        }),
        $(" .game-info", {
            marginLeft: "20px"
        }),
    );
    
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                position: {
                    column: null,
                    row: null,
                },
                squares: Array(9).fill(null),
            }],
            locked: false,
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i, r, c) {
        const { locked, stepNumber, xIsNext } = this.state;
        const history = this.state.history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i] || locked) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                position: {
                    column: c,
                    row: r,
                },
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !xIsNext,
        });
    }

    handleJumpTo(step) {
        const { history } = this.state;
        this.setState({
            locked: (history.length - 1) !== step,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const { history, stepNumber, xIsNext } = this.state;
        const current = history[stepNumber];
        const winningLine = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const { position } = step;
            const desc = move ? `Go to move #${move} at row ${position.row} and column ${position.column}` : "Go to game start";
            const buttonStyle = {
                fontWeight: stepNumber === move ? "bold" : "normal",
            };
            return (
                <li key={move}>
                    <button className="move" style={buttonStyle} onClick={() => this.handleJumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;

        if (winningLine) {
            status = `Winner: ${current.squares[winningLine[0]]}`;
        } else if (history.length === 10) {
            status = `It's a tie`;
        } else {
            status = `Next players: ${xIsNext ? "X" : "O"}`;
        }

        return (
            <div {...this.styles}>
                <div className="game">
                    <div className="game-board">
                        <Board 
                            squares={current.squares}
                            onClick={(i, r, c) => this.handleClick(i, r, c)}
                            winningLine={winningLine}
                        />
                    </div>
                    <div className="game-info">
                        <div className="status">{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

import React from 'react';

const Square = ({ onClick, squareStyle, value }) => {
    return (
        <button className="square" onClick={() => onClick()} style={squareStyle}>
            {value}
        </button>
    );
}

export default Square;

import { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions";

const Cell = styled(Grid)`
  cursor: pointer;
  width: 16px;
  height: 16px;
  display: flex;
  border-radius: 4px;
  border: 1px solid;
  align-items: center;
  justify-content: center;
  border-color: ${({ status }) => {
    return { died: "red", open: "grey", success: "blue" }[status];
  }};
  background-color: ${({ highlighted }) => {
    return highlighted ? "yellow" : "white";
  }};
`;

const Container = styled("div")`
  margin: 24px;
`;

//component to render mine field and each cell status

const Map = ({ data }) => {
  const dispatch = useDispatch();
  const [highlight, setHighlight] = useState(null);
  const handleCellClick = (x, y) => {
    dispatch(sendMessage(`open ${x} ${y}`));
  };
  if (data) {
    return (
      <Container>
        {data.map((row, rowIndex) => (
          <Grid container key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Cell
                item
                key={cellIndex}
                onClick={() =>
                  cell === "□" && handleCellClick(cellIndex, rowIndex)
                }
                onMouseDown={() => {
                  setHighlight({ x: cellIndex, y: rowIndex });
                }}
                onMouseUp={() => setHighlight(null)}
                status={
                  cell === "*" ? "died" : cell === "□" ? "open" : "success"
                }
                highlighted={
                  highlight &&
                  Math.abs(highlight.x - cellIndex) < 2 &&
                  Math.abs(highlight.y - rowIndex) < 2
                }
              >
                {cell !== "□" && cell}
              </Cell>
            ))}
          </Grid>
        ))}
      </Container>
    );
  }
  return <div>No Map Data Available</div>;
};

export default Map;

import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Typography } from "@mui/material";

import Map from "./Map";
import Status from "./Status";
import { sendMessage } from "./actions";

const App = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.mineField.log);
  const map = useSelector((state) => state.mineField.map);

  const handleStart = () => {
    const level = prompt("Put your level here (1-4)");

    if (level && parseInt(level) > 0 && parseInt(level) < 5) {
      dispatch(sendMessage(`new ${level}`));
      return;
    }
    alert("You have to select valid level");
    return;
  };

  return (
    <Container>
      <Status log={log} onStart={handleStart} />
      <Map data={map} />
    </Container>
  );
};

export default App;

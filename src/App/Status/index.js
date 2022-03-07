import { Button, Container, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";

// component to render app status and initiate new game

const Status = ({ log, onStart }) => {
  useEffect(() => {
    if (log.startsWith("open: You win")) {
      alert(log);
      return;
    }
  }, [log]);
  const statusText = useMemo(() => {
    if (log === "new: OK") {
      return "Game Started";
    }
    if (log === "open: You lose") {
      return "Game Failed! Start Again";
    }
    if (log.startsWith("open: You win")) {
      return "You won!";
    }
    return "Waiting for your command";
  }, [log]);
  return (
    <Container>
      <Typography variant="body1" component="h2">
        {statusText}
      </Typography>
      <Button variant="contained" onClick={onStart}>
        Start
      </Button>
    </Container>
  );
};

export default Status;

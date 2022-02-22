import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function NotFound() {
  const [easterEgg, setEasterEgg] = useState(false);

  return (
    <Box sx={{ margin: '10vmin' }}>
      <Typography variant="h1">
        404
      </Typography>
      <Typography variant="h3" onClick={() => setEasterEgg(true)}>
        {easterEgg &&
          <>🦐 You found the easter egg!</>
        }
        {!easterEgg &&
          <>Not found</>
        }
      </Typography>
    </Box>
  );
}

export default NotFound;

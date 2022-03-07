import { CloseRounded, PlayArrow } from '@mui/icons-material';
import { Button, Modal, Paper, TableCell, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { post } from '../../lib/superfetch';
import useUser from '../../lib/useUser';

const RunRow = (props: Run & {token: string | undefined}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [approved, setApproved] = useState(props.approved);

  // secs 🤨
  function secsToTime(secs: number) {
    return new Date(secs * 1000).toISOString().substring(11, 19);
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {props.runner.name}
      </TableCell>
      <TableCell component="th" scope="row">
        <PlayArrow onClick={() => setOpen(true)} />
      </TableCell>
      {approved && props.token && (
        <TableCell>
          <Button
            variant="contained"
            onClick={() => {
              setApproved(false);
              post(
                `/api/run/approve/${props.id}`,
                {
                  approved: false,
                },
                {
                  method: 'PATCH',
                  token: props.token,
                }
              );
            }}
            >
            Disapprove
          </Button>
        </TableCell>
      )}
      {!approved && props.token && (
        <TableCell>
          <Button
            variant="contained"
            onClick={() => {
              setApproved(true);
              post(
                `/api/run/approve/${props.id}`,
                {
                  approved: true,
                },
                {
                  method: 'PATCH',
                  token: props.token,
                }
              );
            }}
          >
            Approve
          </Button>
        </TableCell>
      )}
      <TableCell component="th" scope="row">
        {secsToTime(props.time)}
      </TableCell>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Box>
            <CloseRounded
              style={{
                width: '40',
                height: '40',
                float: 'right',
                marginBottom: '12px',
              }}
              onClick={() => setOpen(false)}
            />
          </Box>
          <video
            autoPlay
            controls
            style={{
              width: 'min(80vw, 700px, 70vh)',
            }}
          >
            <source src={props.videoUrl} />
          </video>
        </Paper>
      </Modal>
    </TableRow>
  );
};

export default RunRow;

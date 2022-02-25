import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Run } from '../../types/game';

type Props = {
  runs: Array<Run>;
};

const RunTable = (props: Props) => {
  // secs 🤨
  function secsToTime(secs: number) {
    return new Date(secs * 1000).toISOString().substring(11, 19);
  }

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Runner</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Video</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.runs.map((run, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {run.runner}
              </TableCell>
              <TableCell component="th" scope="row">
                {secsToTime(run.time)}
              </TableCell>
              <TableCell component="th" scope="row">
                <a href={run.video} target="_blank" rel="noopener noreferrer">
                  {run.video}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RunTable;

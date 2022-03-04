import { Fragment } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import RunRow from './RunRow';
import useUser from '../../lib/useUser';

type Props = {
  runs: Run[];
};

const RunTable = (props: Props) => {
  const { user, token } = useUser();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Runner</TableCell>
            <TableCell>Video</TableCell>
            {user?.admin && <TableCell>Approve</TableCell>}
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.runs.map((run, index) => (
            <Fragment key={index}>
              {(run.approved || user?.admin) && (
                <RunRow {...run} token={token} />
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RunTable;

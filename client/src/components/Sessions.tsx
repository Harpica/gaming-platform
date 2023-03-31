import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ViewChildProps } from '../utils/types';
import { observer } from 'mobx-react-lite';
import { MainVM } from '../viewModels/Main.VM';

function createData(name: string, game: string) {
    return { name, game };
}

const rows = [
    createData('Frozen yoghurt', 'Tic-Tac-Toe'),
    createData('Ice cream sandwich', 'Tic-Tac-Toe'),
    createData('Eclair', 'Tic-Tac-Toe'),
];

const Sessions: React.FC<ViewChildProps<MainVM>> = observer(({ vm }) => {
    useEffect(() => {
        vm.getSessions();
    }, []);
    return (
        <div className='bg-white rounded shadow-md p-3'>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sessions table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Host name</TableCell>
                            <TableCell align='center'>Game</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vm.sessions.map((session) => (
                            <TableRow
                                hover
                                sx={{ cursor: 'pointer' }}
                                key={session.host}
                                onClick={() => {
                                    vm.handleSessionChoice(session);
                                }}
                            >
                                <TableCell
                                    component='th'
                                    scope='row'
                                    align='center'
                                >
                                    {session.host}
                                </TableCell>
                                <TableCell align='center'>
                                    {session.game}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
});

export default Sessions;

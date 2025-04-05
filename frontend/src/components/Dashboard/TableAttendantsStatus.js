import React from "react";

import Paper from "@mui/joy/Paper";
import Table from '@mui/joy/Table';
import TableBody from '@mui/joy/TableBody';
import TableCell from '@mui/joy/TableCell';
import TableContainer from '@mui/joy/TableContainer';
import TableHead from '@mui/joy/TableHead';
import TableRow from '@mui/joy/TableRow';
import Skeleton from "@material-ui/lab/Skeleton";

import { makeStyles } from "@mui/joy/styles";
import { green, red } from '@mui/joy/colors';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import moment from 'moment';

import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
	on: {
		color: green[600],
		fontSize: '20px'
	},
	off: {
		color: red[600],
		fontSize: '20px'
	},
    pointer: {
        cursor: "pointer"
    }
}));

export function RatingBox ({ rating }) {
    const ratingTrunc = rating === null ? 0 : Math.trunc(rating);
    return <Rating
        defaultValue={ratingTrunc}
        max={3}
        readOnly
    />
}

export default function TableAttendantsStatus(props) {
    const { loading, attendants } = props
	const classes = useStyles();

    function renderList () {
        return attendants.map((a, k) => (
            <TableRow key={k}>
                <TableCell>{a.name}</TableCell>
                <TableCell align="center" title="1 - Insatisfeito, 2 - Satisfeito, 3 - Muito Satisfeito" className={classes.pointer}>
                    <RatingBox rating={a.rating} />
                </TableCell>
                <TableCell align="center">{formatTime(a.avgSupportTime, 2)}</TableCell>
                <TableCell align="center">
                    { a.online ?
                        <CheckCircleIcon className={classes.on} />
                        : <ErrorIcon className={classes.off} />
                    }
                </TableCell>
            </TableRow>
        ))
    }

	function formatTime(minutes){
		return moment().startOf('day').add(minutes, 'minutes').format('HH[h] mm[m]');
	}

    return ( !loading ?
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="center">Avaliações</TableCell>
                        <TableCell align="center">T.M. de Atendimento</TableCell>
                        <TableCell align="center">Status (Atual)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { renderList() }
                    {/* <TableRow>
                        <TableCell>Nome 4</TableCell>
                        <TableCell align="center">10</TableCell>
                        <TableCell align="center">10 minutos</TableCell>
                        <TableCell align="center">
                            <CheckCircleIcon className={classes.off} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Nome 5</TableCell>
                        <TableCell align="center">10</TableCell>
                        <TableCell align="center">10 minutos</TableCell>
                        <TableCell align="center">
                            <CheckCircleIcon className={classes.on} />
                        </TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </TableContainer>
        : <Skeleton variant="rect" height={150} />
    )
}
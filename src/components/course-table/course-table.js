import React from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, Tooltip
} from "@material-ui/core";

import CrudRow from "./course-row";

export function CourseTable(props) {
    const classes = props.useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {props.columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        size={column.size}
                                        className={`${classes.cell}
                                                    ${column.classes?.map(c => classes[c])}`}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell key="action" align="right"
                                           size="small" className={classes.cell}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.body}>
                            {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, ndx) => <CrudRow
                                    deleteRow={props.deleteRow}
                                    updateRow={props.updateRow}
                                    key={ndx}
                                    row={row}
                                    columns={props.columns}
                                    useStyles={props.useStyles}
                                />)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={props.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    )
}

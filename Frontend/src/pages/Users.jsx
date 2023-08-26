import { useQuery } from "@tanstack/react-query";
import { User_QK, getUsers } from "../api/users";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material";
import { ErrorMessage } from "../components/atom/ErrorMessage";
import { ApiError } from "../utils/globalErrors";
import { isEqual } from "lodash";
import { Badge, Delete, Edit, Email, ManageAccounts, Person, SupportAgent, Tag } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DialogForm from "../components/molecule/DialogForm";

const columns = [
    { id: 'id', label: <Tag />, minWidth: 60 },
    { id: 'name', label: <Box sx={{ display: "flex", alignItems: 'center' }}><Person /><Typography fontSize="12px">Nom</Typography> </Box>, minWidth: 170 },
    { id: 'email', label: <Box sx={{ display: "flex", alignItems: 'center' }}><Email /><Typography fontSize="12px">Email</Typography> </Box>, minWidth: 170 },
    { id: 'role', label: <Box sx={{ display: "flex", alignItems: 'center' }}><Badge /><Typography fontSize="12px">Role</Typography> </Box>, minWidth: 100, format: (value) => isEqual(value, 'admin') ? <SupportAgent /> : <Person /> },
    { id: 'editOrDelete', label: <ManageAccounts />, align: 'center', minWidth: 60 }
];

function UsersPage() {
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)
    const [rowOnPage, setRowOnPage] = useState(10)
    const [filter, setFilter] = useState('name')
    const [openEditId, setOpenEditId] = useState(null)

    const { data, isFetching, isError } = useQuery({
        queryKey: [User_QK, searchValue, rowOnPage, page],
        queryFn: () => getUsers(page, rowOnPage, searchValue, filter),
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        if (!isFetching && !isError && !!data) {
            setPage(data.current_page)
            setRowOnPage(data.per_page)
        }
    }, [isFetching, isError, data])

    const handlePageChange = (_, pageNumber) => {
        setPage(pageNumber + 1)
    }
    const handleChangeRows = (event) => {
        setRowOnPage(event.target.value)
    }
    const handleSearch = (event) => {
        setSearchValue(event.target.value)
    }

    const handleCloseEdit = () => {
        setOpenEditId(null)
    }

    return (<>

        <Paper sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Box component="form" noValidate sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl sx={{ mx: 1 }} variant="standard">
                        <TextField
                            margin="normal"
                            fullWidth
                            id="search"
                            label="search"
                            name="search"
                            autoComplete="search"
                            autoFocus
                            value={searchValue}
                            onChange={handleSearch}
                        />
                    </FormControl>
                    <FormControl sx={{ mx: 1 }} variant="standard">
                        <InputLabel id="demo-simple-select-label">filtres</InputLabel>
                        <Select
                            labelId="filter"
                            id="filter"
                            value={filter}
                            fullWidth
                            label="filter"
                            onChange={(event) => setFilter(event.target.value)}
                        >
                            <MenuItem value={'name'}>Nom</MenuItem>
                            <MenuItem value={'id'}>Id</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="outlined" color="secondary" >Ajouter un utilisateur </Button>
            </Box>
            <TableContainer sx={{ maxHeight: '65vh' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {isFetching &&
                                <TableRow>
                                    <TableCell colSpan={4} >
                                        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                            <CircularProgress color="primary" />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            }
                            {
                                isError &&
                                <TableRow>
                                    <TableCell colSpan={4} >
                                        <ErrorMessage>{ApiError.pleaseTryLater}</ErrorMessage>
                                    </TableCell>
                                </TableRow>
                            }
                            {!isFetching && !isError && data.data
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === 'editOrDelete' ? <>
                                                            <Button color="error"  >
                                                                <Delete />
                                                            </Button>
                                                            <Button color="secondary" onClick={() => setOpenEditId(row.id)} >
                                                                <Edit />
                                                            </Button>
                                                        </> : column.format
                                                            ? <Tooltip title={value}>{column.format(value)}</Tooltip>
                                                            : value}

                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data?.total || 0}
                rowsPerPage={rowOnPage}
                page={page - 1}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRows}
            />
        </Paper>
        <DialogForm id={openEditId} handleClose={handleCloseEdit} />
    </>);
}

export default UsersPage;
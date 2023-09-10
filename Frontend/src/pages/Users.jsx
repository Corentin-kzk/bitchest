import { useQuery } from '@tanstack/react-query'
import { User_QK, getUsers } from '../api/users'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { ErrorMessage } from '@components/atom/ErrorMessage'
import { ApiError } from '../utils/globalErrors'
import { isEqual } from 'lodash'
import {
  Badge,
  Delete,
  Edit,
  Email,
  ManageAccounts,
  Person,
  SupportAgent,
  Tag,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useDispatch } from 'react-redux'
import { showDialogAction } from '../reducers/dialogReducer'

const columns = [
  { id: 'id', label: <Tag />, align: 'center', minWidth: 60 },
  {
    id: 'name',
    label: (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Person />
        <Typography fontSize='12px'>Nom</Typography>{' '}
      </Box>
    ),
    minWidth: 170,
  },
  {
    id: 'email',
    label: (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Email />
        <Typography fontSize='12px'>Email</Typography>{' '}
      </Box>
    ),
    minWidth: 170,
  },
  {
    id: 'role',
    label: (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Badge />
        <Typography fontSize='12px'>Role</Typography>{' '}
      </Box>
    ),
    align: 'center',
    minWidth: 100,
    format: (value) =>
      isEqual(value, 'admin') ? <SupportAgent /> : <Person />,
  },
  {
    id: 'editOrDelete',
    label: <ManageAccounts />,
    align: 'center',
    minWidth: 60,
  },
]

function UsersPage() {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const [rowOnPage, setRowOnPage] = useState(10)
  const [filter, setFilter] = useState('name')

  const { data, isFetching, isError } = useQuery({
    queryKey: [User_QK, searchValue, rowOnPage, page],
    queryFn: () => getUsers(page, rowOnPage, searchValue, filter),
    refetchOnWindowFocus: false,
  })

  const dispatch = useDispatch()
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

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Box
            component='form'
            noValidate
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <FormControl sx={{ mx: 1 }} variant='standard'>
              <TextField
                margin='normal'
                fullWidth
                id='search'
                label='Rechercher'
                name='search'
                autoComplete='search'
                autoFocus
                value={searchValue}
                onChange={handleSearch}
              />
            </FormControl>
            <FormControl sx={{ mx: 1 }} variant='standard'>
              <InputLabel id='demo-simple-select-label'>Filtres</InputLabel>
              <Select
                labelId='filter'
                id='filter'
                value={filter}
                fullWidth
                label='filter'
                onChange={(event) => setFilter(event.target.value)}
              >
                <MenuItem value={'name'}>Nom</MenuItem>
                <MenuItem value={'email'}>Email</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() =>
              dispatch(
                showDialogAction({
                  formName: 'userForm',
                  dialogProps: { submitLabel: 'Ajouter un utilisateur' },
                  formProps: { id: null, isEdit: false },
                })
              )
            }
          >
            Ajouter un utilisateur{' '}
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: '65vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {isFetching && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CircularProgress color='primary' />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {isError && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <ErrorMessage>{ApiError.pleaseTryLater}</ErrorMessage>
                    </TableCell>
                  </TableRow>
                )}
                {!isFetching &&
                  !isError &&
                  data.data.map((row) => {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'editOrDelete' ? (
                                <>
                                  <Button
                                    color='secondary'
                                    onClick={() =>
                                      dispatch(
                                        showDialogAction({
                                          formName: 'userForm',
                                          formProps: {
                                            id: row.id,
                                            isEdit: true,
                                          },
                                          dialogProps: {
                                            submitLabel: 'Modifier',
                                          },
                                        })
                                      )
                                    }
                                  >
                                    <Edit />
                                  </Button>
                                  <Button
                                    color='error'
                                    onClick={() =>
                                      dispatch(
                                        showDialogAction({
                                          formName: 'deleteForm',
                                          dialogProps: {
                                            submitLabel: 'Supprimer',
                                          },
                                          formProps: {
                                            id: row.id,
                                          },
                                        })
                                      )
                                    }
                                  >
                                    <Delete />
                                  </Button>
                                </>
                              ) : column.format ? (
                                <Tooltip title={value}>
                                  {column.format(value)}
                                </Tooltip>
                              ) : (
                                value
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
              </>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={data?.total || 0}
          rowsPerPage={rowOnPage}
          page={page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRows}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from} - ${to} / ${
              count !== -1 ? count : `more than ${to}`
            }`
          }}
        />
      </Paper>
    </>
  )
}

export default UsersPage

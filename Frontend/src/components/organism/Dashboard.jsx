import * as React from 'react'
import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Outlet, useNavigate, useLocation } from 'react-router'
import {
  AccountCircle,
  AdminPanelSettings,
  Euro,
  Logout,
  Settings,
} from '@mui/icons-material'
import Image from '../atom/Image'
import axios from '@api/config'
import { useDispatch } from 'react-redux'
import { setUser } from '../../reducers/userReducer'
import { CircularProgress, Tooltip, Typography } from '@mui/material'
import { isEqual } from 'lodash'
import { useState } from 'react'
import { useSession } from '../../hooks/useSession'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MyUser_QK, getMyUser } from '@api/me'
import { useEffect } from 'react'
import { linkUrl } from '../../utils/linkUrl'
import { showDialogAction } from '../../reducers/dialogReducer'

const drawerWidth = 260

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

export default function Dashboard() {
  const [open, setOpen] = useState(false)
  const { destroySession } = useSession()

  const dispatch = useDispatch()
  const { data: user, isLoading } = useQuery({
    queryKey: [MyUser_QK],
    queryFn: () => getMyUser(),
  })

  useEffect(() => {
    dispatch(setUser(user))
  }, [user])

  const userMutation = useMutation({
    mutationFn: async () => await axios.post('/logout'),
  })
  const location = useLocation()
  const navigate = useNavigate()
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleLogOut = async () => {
    userMutation.mutateAsync('', {
      onSuccess: () => {
        destroySession()
        navigate('/')
      },
    })
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='absolute' open={open} color='secondary'>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box color='inherit' sx={{ position: 'relative', flexGrow: 1 }}>
              <Image
                src={'/bitchest_logo.png'}
                width={'100px'}
                height={'50px'}
              />
              {isEqual(user?.role, 'admin') && (
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '100px',
                    fontSize: '8px',
                  }}
                >
                  Admin
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Typography fontSize={10}>Solde :</Typography>
                {!isLoading && user?.wallet && (
                  <Typography
                    color={+user.wallet.balance < 20 ? 'error' : 'primary'}
                  >
                    {(+user.wallet.balance).toLocaleString('fr-FR')}
                  </Typography>
                )}
                {isLoading && <CircularProgress size={15} color='primary' />}
                <Euro fontSize='' />
              </Box>
              <Tooltip title='Mon compte'>
                <IconButton
                  color='inherit'
                  onClick={() =>
                    dispatch(
                      showDialogAction({
                        formName: 'userMeForm',
                        dialogProps: {
                          submitLabel: 'Modifier',
                        },
                      })
                    )
                  }
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </Box>

            <Tooltip title='Se déconncter'>
              <IconButton color='inherit' onClick={handleLogOut}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            <ListItemButton
              component='a'
              href={linkUrl.home}
              selected={location.pathname === linkUrl.home}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Liste des cryptomonaies' />
            </ListItemButton>
            <ListItemButton
              component='a'
              href={linkUrl.wallet}
              selected={location.pathname === linkUrl.wallet}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary='Portefeuille' />
            </ListItemButton>
            <ListItemButton
              onClick={() =>
                dispatch(
                  showDialogAction({
                    formName: 'userMeForm',
                    dialogProps: {
                      submitLabel: 'Modifier',
                    },
                  })
                )
              }
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary='Paramètre' />
            </ListItemButton>
            {isEqual(user?.role, 'admin') && (
              <ListItemButton
                component='a'
                href={linkUrl.users}
                selected={location.pathname === linkUrl.users}
              >
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary="Panneau d'administration" />
              </ListItemButton>
            )}
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </>
  )
}

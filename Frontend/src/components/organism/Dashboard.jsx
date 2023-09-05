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
import PeopleIcon from '@mui/icons-material/People'
import LayersIcon from '@mui/icons-material/Layers'
import { Outlet, useNavigate, useLocation } from 'react-router'
import { Euro, Logout } from '@mui/icons-material'
import Image from '../atom/Image'
import axios from '../../api/config'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/userReducer'
import { Typography } from '@mui/material'
import { isEqual } from 'lodash'
import { useState } from 'react'
import { useSession } from '../../hooks/useSession'
import { useMutation } from '@tanstack/react-query'

const drawerWidth = 240

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
  const user = useSelector(selectUser)
  const [open, setOpen] = useState(false)
  const { destroySession } = useSession()
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
              <Typography>Solde :</Typography>
              {user.wallet && (
                <Typography>
                  {(+user.wallet.balance).toLocaleString('fr-FR')}
                </Typography>
              )}
              <IconButton color='inherit'>
                <Euro />
              </IconButton>
            </Box>

            <IconButton color='inherit' onClick={handleLogOut}>
              <Logout />
            </IconButton>
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
            {isEqual(user?.role, 'admin') && (
              <ListItemButton
                component='a'
                href='/dashboard/admin/users'
                selected={location.pathname === '/dashboard/admin/users'}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary='Customers' />
              </ListItemButton>
            )}
            <ListItemButton
              component='a'
              href='/dashboard'
              selected={location.pathname === '/dashboard'}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary='Orders' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary='Wallet' />
            </ListItemButton>
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

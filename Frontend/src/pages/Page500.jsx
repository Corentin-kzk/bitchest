import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Page500 = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant='h1' color='primary'>
        Erreur 500
      </Typography>
      <Box>
        <Button onClick={() => navigate('/dashboard')}>
          Rafraichir la page
        </Button>
      </Box>
    </Box>
  )
}

import { Box, Button, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

export const Page404 = () => {
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
      <Typography variant='h1' color={red[500]}>
        Erreur 404
      </Typography>
      <Box>
        <Button onClick={() => navigate('/dashboard')}>
          Retour au dashboard
        </Button>
      </Box>
    </Box>
  )
}

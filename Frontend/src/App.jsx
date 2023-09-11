import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from './router/router'
import { RouterProvider } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/atom/Alert'
import { GlobalDialog } from './components/molecule/Dailog'
import { CssBaseline } from '@mui/material'

const customPalette = {
  primary: {
    main: '#01e119',
  },
  secondary: {
    main: '#312F2F',
    dark: '#b24d00',
    light: '#ff8b33',
    contrastText: '#fff',
  },
}
const defaultTheme = createTheme({
  palette: customPalette,
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h3: {
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    h4: {
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      '@media (max-width:600px)': {
        fontSize: '0.9rem',
      },
    },
    body2: {
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
    },
  },
})

const queryConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * (60 * 3),
      cacheTime: 1000 * (60 * 3),
      refetchOnMount: 'always',
      refetchOnReconnect: 'always',
      refetchOnWindowFocus: 'always',
      refetchInterval: 1000 * (60 * 2),
      refetchIntervalInBackground: true,
      suspense: false,
    },
    mutations: {
      retry: 1,
    },
  },
}

function App() {
  const queryClient = new QueryClient(queryConfig)
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <RouterProvider router={router} />
          <Alert />
          <GlobalDialog />
          <CssBaseline />
        </ThemeProvider>
      </Provider>
      {import.meta.env.APP_MODE === 'Development' && (
        <ReactQueryDevtools initialIsOpen={true} />
      )}
    </QueryClientProvider>
  )
}

export default App

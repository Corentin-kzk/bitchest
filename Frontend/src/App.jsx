import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from './router/router'
import { Link, RouterProvider } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import store from './store'
import { dark } from '@mui/material/styles/createPalette'
import Alert from './components/atom/Alert'
import { GlobalDialog } from './components/molecule/Dailog'

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
  },
})

const queryConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
      refetchOnMount: 'always',
      refetchOnReconnect: 'always',
      refetchOnWindowFocus: 'always',
      refetchInterval: 1000 * 120,
      refetchIntervalInBackground: true,
      suspense: false,
    },
    mutations: {
      retry: 2,
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
        </ThemeProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default App

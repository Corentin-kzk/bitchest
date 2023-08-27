import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from './router/router';
import {
  Link,
  RouterProvider,
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import store from './store';
import { dark } from '@mui/material/styles/createPalette';
import Alert from './components/atom/Alert';




const customPalette = {
  primary: {
    main: '#01e119',
  },
  secondary: {
    main: '#ff6f00',
    dark: '#b24d00',
    light: '#ff8b33',
    contrastText: '#000',
  }
};
const defaultTheme = createTheme({
  palette: customPalette,
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});


function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <RouterProvider router={router} />
          <Alert/>
        </ThemeProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default App

import { Alert } from "@mui/material"

export const ErrorMessage = ({children}) => {
    return <Alert severity="error">{children}</Alert>
}
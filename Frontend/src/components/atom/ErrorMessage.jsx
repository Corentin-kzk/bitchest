import styled from "styled-components"

const Error = styled.div`


`

const ErrorMessage = ({error}) => {
return <Error>
    {error}
</Error>
}
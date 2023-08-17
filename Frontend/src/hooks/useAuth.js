import axios from '../api/config'

export const useAuth =  () => {
    const csrf = async () => await axios.get('/sanctum/csrf-cookie');

    const login = async ( credentials ,setErrors, setSuccessResponse ) => {

        await csrf()
        axios
            .post('/login', credentials)
            .then((res) => {
                console.log(res);
                  setSuccessResponse();
                  navigate('/dashboard');
              })
            .catch(error => {
                setErrors(error.response.data.message)
            })
    }
    return {
        login
    }
}
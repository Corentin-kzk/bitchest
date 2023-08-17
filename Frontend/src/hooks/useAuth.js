import axios from 'axios'

export const useAuth = () => {

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const login = async ({ setErrors, setSuccessResponse }) => {
        await csrf()
        axios
            .post('/login', props)
            .then(() => {
                  setSuccessResponse();
                  navigate('/dashboard');
              })
            .catch(error => {
                setErrors(error);
            })
    }
    return {
        login
    }
}
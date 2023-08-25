import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Image from "../atom/Image";
import { useFormik } from "formik";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "../../api/config";
import { setUser } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { csrf } from "../../api/crsf";
import { globalError } from "../../utils/globalErrors";
import { red } from "@mui/material/colors";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: async (values, { setErrors }) => {
      
      await csrf();
      try {
        const res = await axios.post("/login", values);
        if (res?.data?.user) {
          sessionStorage.setItem("user", JSON.stringify(res?.data?.user))
          dispatch(setUser(res?.data?.user));
          navigate("/dashboard");
        }
      } catch (error) {
        setErrors({
          email: error?.response?.data?.message || globalError.pleaseTryLater,
        });
      }
    },
  });

  const { handleSubmit, errors } = formik;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <Image src={"/bitchest_logo.png"} width={"300px"} height={"150px"} />
        </div>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        {!!errors?.email && (
          <Box component="div" sx={{ mt: 1, backgroundColor: red[500], color: "white", width: "100%", height: "100%", padding: "15px", borderRadius: '5px' }}>
            Error : {errors.email}
          </Box>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Connexion
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
    </Container>
  );
}

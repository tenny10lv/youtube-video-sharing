import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Field, FormField } from "./typings";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Remitano
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const SignIn = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormField) => {
    setLoading(true);
    const user = await auth?.logIn(values[Field.EMAIL], values[Field.PASSWORD]);
    setLoading(false);
    if (user) {
      navigate("/");
    } else {
      setMessage("Email or password is not correct");
    }
  };

  const formik = useFormik<FormField>({
    initialValues: {
      [Field.EMAIL]: "",
      [Field.PASSWORD]: "",
    },
    validationSchema: signInSchema,
    onSubmit,
  });

  const getError = useCallback(
    (field: Field) => {
      return formik.touched[field] && formik.errors[field];
    },
    [formik]
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    formik.handleSubmit();
  };

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
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {message && (
          <Alert severity="error" sx={{ width: "100%", margin: "20px 0" }}>
            {message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            name={Field.EMAIL}
            label="Email Address *"
            margin="normal"
            fullWidth
            error={!!getError(Field.EMAIL)}
            helperText={getError(Field.EMAIL)}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            name={Field.PASSWORD}
            label="Password *"
            margin="normal"
            fullWidth
            type="password"
            error={!!getError(Field.PASSWORD)}
            helperText={getError(Field.PASSWORD)}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignIn;

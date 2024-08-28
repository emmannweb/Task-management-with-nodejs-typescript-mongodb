import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Box, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Loader from "../../components/Loader";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../../redux/slices/userApiSlice";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .min(3, "First name must have at least 3 characters")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .min(3, "last name must have at least 3 characters")
    .required("last name is required"),
  email: yup
    .string("Enter your e-mail")
    .email("Enter a valid e-mail")
    .required("E-mail is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password must have at least 6 characters")
    .required("password is required"),
});

const Register = () => {
  const { palette } = useTheme();
  const [register, { isLoading }] = useRegisterMutation();

  const createUserHandler = async (values) => {
    try {
      await register(values);
      toast.success("user created");
    } catch (error) {
      console.log(error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
   // isSubmitting,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      createUserHandler(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  // handle input show off password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //end of handle input show off password

  return (
    <>
      <Header />

      <Box
        sx={{
          bgcolor: "oklch(0.27642 0.055827 233.809)",
          minHeight: "calc(100vh - 140px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c1c1c1",
        }}
      >
        <Box
          sx={{
            bgcolor: palette.primary.main,
            p: "20px 40px",
            border: "1px solid oklch(0.382774 0.071686 233.169)",
            maxWidth: "500px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#c1c1c1",
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
              pb: 2,
            }}
          >
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              inputProps={{
                autoComplete: "off",
              }}
              FormHelperTextProps={{
                style: { backgroundColor: "transparent" },
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },

                input: {
                  background: "#eee",
                },
              }}
              fullWidth
              id="firstName"
              name="firstName"
              placeholder="First Name"
              autoFocus
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              inputProps={{
                autoComplete: "off",
              }}
              FormHelperTextProps={{
                style: { backgroundColor: "transparent" },
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },

                input: {
                  background: "#eee",
                },
              }}
              fullWidth
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
            <TextField
              inputProps={{
                autoComplete: "off",
              }}
              FormHelperTextProps={{
                style: { backgroundColor: "transparent" },
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },

                input: {
                  background: "#eee",
                },
              }}
              fullWidth
              id="email"
              name="email"
              placeholder="E-mail"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              FormHelperTextProps={{
                style: {
                  backgroundColor: palette.primary.main,
                  margin: 0,
                  paddingLeft: "15px",
                },
              }}
              sx={{
                background: "#eee",

                mb: 1,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },

                input: {
                  background: "#eee",
                },
              }}
              fullWidth
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                mb: 2,
                borderRadius: "10px",
                bgcolor: palette.yellow2,
                color: palette.primary.main,
                transition: "all ease 1s",
                "&:hover": { bgcolor: palette.yellow2, opacity: 0.8 },
              }}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Register"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/login"
                  variant="body2"
                  style={{
                    color: "oklch(0.382774 0.071686 233.169)",
                    textDecoration: "none",
                  }}
                >
                  {"Already have an account? Login"}
                </Link>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Register;

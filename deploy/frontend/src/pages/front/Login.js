import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Avatar, Box, Grid } from "@mui/material";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import { useLoginMutation } from "../../redux/slices/userApiSlice";
import { toast } from "react-toastify";
import { setUserInfo } from "../../redux/slices/authSlice";

const validationSchema = yup.object({
  email: yup
    .string("Enter your e-mail")
    .email("Enter a valid e-mail")
    .required("E-mail is required"),
  password: yup
    .string("Enter a password")
    .min(6, "Password must have at least six(6) characters")
    .required("Password is required"),
});

const Login = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [userInfo, navigate]);

  const loginMethod = async (values) => {
    try {
      const res = await login(values).unwrap();
      if (res?.success === true) {
        dispatch(setUserInfo(res));
      }
      //console.log("res", res);
      toast.success("Login successfully!");
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    //isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      loginMethod(values);
      // alert(JSON.stringify(values, null, 2));
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: palette.yellow2, mb: 3 }}>
              <LockClockOutlined sx={{ color: palette.primary.main }} />
            </Avatar>
          </Box>
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
              id="email"
              name="email"
              placeholder="E-mail"
              autoFocus
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
              {isLoading ? <Loader /> : "Enter"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/forget-password"
                  // variant="body2"
                  style={{
                    transition: "all ease 1s",
                    color: "oklch(0.382774 0.071686 233.169)",
                    // "&:hover": { color: "#c1c1c1!important" },
                    textDecoration: "none",
                  }}
                >
                  Forget password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="/register"
                  variant="body2"
                  style={{
                    color: "oklch(0.382774 0.071686 233.169)",
                    textDecoration: "none",
                  }}
                >
                  {"Don't have account? create"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Login;

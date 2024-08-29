import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
//import Loader from "../../components/Loader";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  password: yup
    .string()
    .required("Password required")
    .min(5, "password is too short.")
    .matches(/[a-zA-Z]/, "Password should have only latin letter"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password should be the same."),
});

const ResetPassword = () => {
  const { palette } = useTheme();
  const { token } = useParams();

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
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      //  alert(JSON.stringify(values, null, 2));
      resetPassword(values);
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

  // reset password method
  const resetPassword = async () => {
    if (token) {
      try {
        const { data } = await axios.put(`/api/users/resetpassword/${token}`, {
          password: values.password,
        });
        if (data.success === true) {
          toast.success("Password was reset, you can go to log in screen");
        }
        //console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.error);
      }
    }
  };

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
            variant="h5"
            sx={{
              color: "#c1c1c1",
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
              pb: 2,
            }}
          >
            Reset password
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
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
              placeholder="Senha"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
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
              id="confirmpassword"
              name="confirmpassword"
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
              placeholder="Confirm password"
              value={values.confirmpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmpassword && Boolean(errors.confirmpassword)}
              helperText={touched.confirmpassword && errors.confirmpassword}
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
              //disabled={loading}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default ResetPassword;

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Box, Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import Loader from "../../components/Loader";
import { useTheme } from "@emotion/react";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup
    .string("Enter your e-mail")
    .email("Enter a valid e-mail")
    .required("E-mail is required"),
});

const ForgetPassword = () => {
  const { palette } = useTheme();
  const [loading, setLoading] = useState(false);

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
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      sendEmail(values);
      // alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  // send email method
  const sendEmail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/forgetpassword", values);
      if (data.success === true) {
        toast.success(
          "An email has been sent to your email inbox to reset your password"
        );
      }
      setLoading(false);
      console.log(data);
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.error);
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
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: palette.yellow2, mb: 3 }}>
              <EmailIcon sx={{ color: palette.primary.main }} />
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
              disabled={loading}
            >
              {loading ? <Loader /> : "Send E-mail"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default ForgetPassword;

import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useProfileQuery } from "../../redux/slices/userApiSlice";

const validationSchema = yup.object({
  firstName: yup
    .string("Adicione um nome")
    .min(4, "o nome deve ter no mínimo 4 caracteres ")
    .required("nome obrigatório"),
  lastName: yup
    .string("Adicione sobrenome")
    .min(4, "o sobrenome do texto deve ter no mínimo 4 caracteres ")
    .required("sobrenome é obrigatório"),
  email: yup
    .string("Digite um e-mail")
    .email("Entre com um email válido")
    .required("O e-mail é obrigatório"),
});

const UserEditInfo = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { data, isLoading } = useProfileQuery();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        _id: data?.user?._id ? data?.user?._id : "",
        firstName: data?.user?.firstName ? data?.user?.firstName : "",
        lastName: data?.user?.lastName ? data?.user?.lastName : "",
        email: data?.user?.email ? data?.user?.email : "",
      },

      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: (values, actions) => {
        updateSingleUser(values);
        //alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      },
    });

  const updateSingleUser = async (values) => {
    try {
      const { data } = await axios.put(`/api/user/edit/${values._id}`, values);
      //console.log(data);
      if (data?.success === true) {
        setTimeout(() => {
          navigate("/user/dashboard");
        }, 1000);
      }
      toast.success("usuario atualizado");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: palette.secondary.main,
          p: { xs: "20px 15px", sm: "20px 50px", lg: "30px 150px" },
        }}
      >
        <Typography variant="h4" sx={{ pb: 4, color: "#c1c1c1" }}>
          {" "}
          Update Info{" "}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box component="span" sx={{ color: palette.yellow2 }}>
            *First Name
          </Box>
          <TextField
            inputProps={{
              autoComplete: "off",
            }}
            FormHelperTextProps={{
              style: { backgroundColor: "transparent" },
            }}
            sx={{
              mb: 3,
              mt: 1,
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
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <Box component="span" sx={{ color: palette.yellow2 }}>
            *Last Name
          </Box>
          <TextField
            inputProps={{
              autoComplete: "off",
            }}
            FormHelperTextProps={{
              style: { backgroundColor: "transparent" },
            }}
            sx={{
              mb: 3,
              mt: 1,
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

          <Box component="span" sx={{ color: palette.yellow2 }}>
            *Email
          </Box>
          <TextField
            inputProps={{
              autoComplete: "off",
            }}
            FormHelperTextProps={{
              style: { backgroundColor: "transparent" },
            }}
            sx={{
              mb: 3,
              mt: 1,
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            elevation={0}
            sx={{
              mt: 3,
              p: 1.5,
              mb: 2,
              borderRadius: "25px",
              bgcolor: palette.yellow2,
              color: palette.primary.main,
              "&:hover": { color: "white" },
            }}
            //disabled={loading}
          >
            Update user
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserEditInfo;

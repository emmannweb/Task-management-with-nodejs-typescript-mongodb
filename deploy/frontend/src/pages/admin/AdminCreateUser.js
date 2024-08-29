import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  firstName: yup
    .string("Adicione um nome")
    .min(4, "o nome deve ter no mínimo 4 caracteres ")
    .required("nome obrigatório"),
  lastName: yup
    .string("Adicione sobrenome")
    .min(4, "o sobrenome do texto deve ter no mínimo 4 caracteres ")
    .required("sobrenome é obrigatório"),
  password: yup
    .string("Coloque uma senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  email: yup
    .string("Digite um e-mail")
    .email("Entre com um email válido")
    .required("O e-mail é obrigatório"),
});

const AdminCreateUser = () => {
  const { palette } = useTheme();
  const { loading, setLoading } = useState(false);
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    //setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      active: false,
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      createNewUser(values);
      // alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const createNewUser = async (values) => {
    try {
      // setLoading(true);
      const { data } = await axios.post("/api/users/signup", values);
      //console.log(data);
      toast.success("User created");
      if (data?.success === true) {
        setTimeout(() => {
          navigate("/admin/users");
        }, 1000);
      }
      // setLoading(false);
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
          Create user{" "}
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

          <Box component="span" sx={{ color: palette.yellow2 }}>
            *Password
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
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <Box component="span" sx={{ color: palette.yellow2 }}>
            Activate user
          </Box>
          <Box sx={{ mb: 3, mt: 1, bgcolor: "#fafafa" }}>
            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                fullWidth
                labelId="active"
                id="demo-select-small"
                name="active"
                placeholder="Select address"
                //label="Prioridade"
                value={values.active}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.active && Boolean(errors.active)}
              >
                <MenuItem value="false">False</MenuItem>
                <MenuItem value="true">True</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
            disabled={loading}
          >
            Create user
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AdminCreateUser;

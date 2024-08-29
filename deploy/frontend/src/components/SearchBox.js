import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";

const validationSchema = yup.object({
  search: yup.string("Enter your search query").required("Field required"),
});

const SearchBox = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();

  const onSubmit = (values, actions) => {
    //alert(values.search);
    const { search } = values;
    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate("/");
    }
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    // handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      search: "",
    },

    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* <Search> */}

        <InputBase
          sx={{
            bgcolor: "#fafafa",
            padding: "10px",
            color: "rgba(0, 0, 0, 0.9)",
          }}
          fullWidth={true}
          id="search"
          name="search"
          label="search"
          placeholder="ex: Search a task..."
          value={values.search}
          onChange={handleChange}
          error={touched.search && Boolean(errors.search)}
          // helperText={touched.search && errors.search}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          elevation={0}
          sx={{
            bgcolor: palette.yellow2,
            transition: "all ease 1s",
            color: palette.secondary.main,
            "&:hover": { bgcolor: palette.yellow2, opacity: 0.9 },
          }}
        >
          <SearchIcon />
        </Button>
      </Box>
      <Box component="span" sx={{ color: "orange" }}>
        {touched.search && errors.search}
      </Box>
    </form>
  );
};

export default SearchBox;

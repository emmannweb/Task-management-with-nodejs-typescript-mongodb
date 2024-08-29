import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import {
  useEditSingleTaskMutation,
  useSingleTaskQuery,
} from "../../redux/slices/taskApiSlice";

const UserEditTask = () => {
  const { palette } = useTheme();
  const { taskId } = useParams();

  const [editSingleTask, { isLoading }] = useEditSingleTaskMutation();
  const { data: singleTask } = useSingleTaskQuery(taskId);

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
      _id: singleTask?.task && singleTask?.task._id ? singleTask?.task._id : "",
      stage:
        singleTask?.task && singleTask?.task.stage
          ? singleTask?.task.stage
          : "created",
    },

    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      updateTaskHandler(values);
      // alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const updateTaskHandler = async (val) => {
    try {
      await editSingleTask(val);
      toast.success("task updated");
    } catch (error) {
      console.log(error);
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
          Update task{" "}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box component="span" sx={{ color: palette.yellow2 }}>
            Choose task status
          </Box>
          <Box sx={{ mb: 3, mt: 1, bgcolor: "#fafafa" }}>
            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                fullWidth
                labelId="stage"
                id="demo-select-small"
                name="stage"
                value={values.stage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.stage && Boolean(errors.stage)}
              >
                <MenuItem value="created">Created</MenuItem>
                <MenuItem value="inProgress">In progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
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
            disabled={isLoading}
          >
            Update task status
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserEditTask;

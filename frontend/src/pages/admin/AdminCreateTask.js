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
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../../utils/moduleToolbar";
import { useTheme } from "@emotion/react";
import { useAllUsersQuery } from "../../redux/slices/userApiSlice";
import { useCreateTaskMutation } from "../../redux/slices/taskApiSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  title: yup
    .string("Add title task")
    .min(4, "Title must have at least 10 charaters")
    .required("required"),
  description: yup
    .string("Add content task")
    .min(10, "content must have at least 10 charaters")
    .required("required"),
  attributed: yup.string("Add someone to the task").required("required"),
});

const AdminCreateTask = () => {
  const { palette } = useTheme();
  const { data: resUsers } = useAllUsersQuery();
  const navigate = useNavigate();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "normal",
      stage: "created",
      attributed: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      createNewTask(values);
      //alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  const createNewTask = async (values) => {
    try {
      const res = await createTask(values).unwrap();
      if (res?.success === true) {
        setTimeout(() => {
          navigate("/admin/task");
        }, 500);
      }
      toast.success("Task created");
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
          Create Task{" "}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box component="span" sx={{ color: palette.yellow2 }}>
            *task title
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
            id="title"
            //label="título da tarefa"
            name="title"
            placeholder="task title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />

          <Box component="span" sx={{ color: palette.yellow2 }}>
            *task content
          </Box>
          <Box sx={{ mb: 3, mt: 1, bgcolor: "#fafafa" }}>
            <ReactQuill
              theme="snow"
              placeholder={"White task content..."}
              modules={modules}
              value={values.description}
              onChange={(e) => setFieldValue("description", e)}
            />
            <Box
              component="span"
              sx={{
                color: "#d32f2f",
                fontSize: "12px",
                pl: 2,
              }}
            >
              {touched.description && errors.description}
            </Box>
          </Box>

          <Box component="span" sx={{ color: palette.yellow2 }}>
            choose task priority
          </Box>
          <Box sx={{ mb: 3, mt: 1, bgcolor: "#fafafa" }}>
            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                fullWidth
                labelId="priority"
                id="demo-select-small"
                name="priority"
                placeholder="Select address"
                //label="Prioridade"
                value={values.priority}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.priority && Boolean(errors.priority)}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box component="span" sx={{ color: palette.yellow2 }}>
            Assign someone to the task
          </Box>
          <Box sx={{ mb: 3, mt: 1, bgcolor: "#fafafa" }}>
            <FormControl sx={{ minWidth: "100%" }}>
              <Select
                fullWidth
                labelId="attributed"
                id="demo-select-small"
                name="attributed"
                value={values.attributed}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.attributed && Boolean(errors.attributed)}
              >
                {resUsers?.users &&
                  resUsers?.users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {`${user.firstName} ${user.lastName}`}
                    </MenuItem>
                  ))}
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
            Create task
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AdminCreateTask;

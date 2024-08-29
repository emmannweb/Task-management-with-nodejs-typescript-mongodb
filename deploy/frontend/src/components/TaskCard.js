import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteTaskMutation } from "../redux/slices/taskApiSlice";

const TaskCard = ({ id, title, description, stage, priority, attributed }) => {
  const { palette } = useTheme();

  const [deleteTask] = useDeleteTaskMutation();

  const { userInfo } = useSelector((state) => state.auth);

  //delete single task
  const deleteMethod = async (id) => {
    try {
      await deleteTask(id);
      //refetch();
      toast.success("task deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskById = (id, title) => {
    if (id) {
      Swal.fire({
        title: "Do you want to remove task below?",
        html: `${title} `,
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
          title: "title-alert",
          // html: 'html-style'
        },
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMethod(id);
          console.log("event confirmed");
        } else if (result.isDismissed) {
          //Swal.fire('Changes are not saved', '', 'info')
          console.log("event canceled");
          return "";
        }
      });
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        mb: 2,
        mt: 2,
        bgcolor: palette.primary.main,
        border: "1px solid oklch(0.382774 0.071686 233.169)",
        position: "relative",
      }}
    >
      {userInfo && userInfo?.role === "admin" ? (
        <>
          <Box sx={{ position: "absolute", top: "10px", right: "30px" }}>
            <Link to={`/admin/edit/task/${id}`}>
              <IconButton aria-label="edit">
                <EditIcon sx={{ color: palette.yellow2 }} />
              </IconButton>
            </Link>
            <IconButton
              aria-label="deletar"
              onClick={() => deleteTaskById(id, title)}
            >
              <DeleteIcon sx={{ color: "red", ml: "10px" }} />
            </IconButton>
          </Box>
        </>
      ) : userInfo &&
        userInfo?.role === "user" &&
        userInfo?.id === attributed ? (
        <>
          <Box sx={{ position: "absolute", top: "10px", right: "30px" }}>
            <Link to={`/user/edit/task/${id}`}>
              <IconButton aria-label="edit">
                <EditIcon sx={{ color: palette.yellow2 }} />
              </IconButton>
            </Link>
          </Box>
        </>
      ) : (
        ""
      )}
      <CardContent>
        <Typography
          sx={{ fontSize: "12px", color: "#fafafa", fontWeight: 500 }}
          gutterBottom
        >
          Priority{" "}
          <IconButton>
            <FlagCircleIcon
              sx={{
                color:
                  priority && priority === "high"
                    ? "#ff0000"
                    : priority === "medium"
                    ? "#ff9900"
                    : priority === "normal"
                    ? palette.yellow1
                    : "#007fff",
                fontSize: 14,
              }}
            />
          </IconButton>
        </Typography>

        <Typography variant="h6" sx={{ color: "#00689d" }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: "#f5f5f5" }}>
          <Box
            component="span"
            dangerouslySetInnerHTML={{
              __html: description?.substring(0, 15),
            }}
          ></Box>
        </Typography>

        <Typography sx={{ color: palette.yellow2, fontSize: "12px" }}>
          <Box component="span" sx={{ color: "#fafafa" }}>
            Status:{" "}
          </Box>{" "}
          {stage && stage === "created"
            ? "Created"
            : stage === "inProgress"
            ? "In Progress"
            : "Completed"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Pagination, Stack } from "@mui/material";
import { useState } from "react";

import { useParams } from "react-router-dom";
import TaskCard from "../../components/TaskCard";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useGetTasksQuery } from "../../redux/slices/taskApiSlice";

const AdminShowTask = () => {
  const { palette } = useTheme();

  const { keyword } = useParams();
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState([]);
  const [priority, setPriority] = useState("all");

  const { data, isLoading, refetch } = useGetTasksQuery(
    {
      page,
      keyword: keyword ? keyword : "",
      checked,
      priority: priority === "all" ? "" : priority,
    },
    {
      // pollingInterval: 10000,
      // skipPollingIfUnfocused: true,
    }
  );

  return (
    <>
      <Box sx={{ bgcolor: palette.secondary.main, pt: 3, pb: 3, pr: 2, pl: 2 }}>
        <h1 style={{ color: "#fafafa" }}>Tasks list</h1>
        <Box sx={{ pb: 2, pr: 1, display: "flex", justifyContent: "right" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: palette.yellow2,
              color: palette.primary.main,
              transition: "all ease 1s",
              "&:hover": { bgcolor: palette.yellow2, opacity: 0.8 },
            }}
            startIcon={<AddIcon />}
          >
            {" "}
            <Link
              to="/admin/create/task"
              style={{ color: palette.primary.main, textDecoration: "none" }}
            >
              {" "}
              Create Task
            </Link>
          </Button>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          // columns={{ xs: 6, sm: 8, md: 12 }}
        >
          {isLoading ? (
            <Box
              sx={{
                minHeight: "500px",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : data?.tasks && data?.tasks.length === 0 ? (
            <>
              <Box
                sx={{
                  minHeight: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "#c1c1c1" }}>No result found!</h2>
              </Box>
            </>
          ) : (
            data?.tasks &&
            data?.tasks.map((task) => (
              <Grid item xs={12} sm={6} key={task._id}>
                <TaskCard
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  stage={task.stage}
                  priority={task.priority}
                  refetch={refetch}
                />
              </Grid>
            ))
          )}
        </Grid>

        <Stack spacing={2}>
          <Pagination
            sx={{ button: { color: palette.yellow2 } }}
            variant="outlined"
            page={!data?.page || data?.page <= 0 ? 1 : data?.page}
            count={!data?.pages || data?.pages <= 0 ? 1 : data?.pages}
            onChange={(event, value) => setPage(value)}
          />
        </Stack>
      </Box>
    </>
  );
};

export default AdminShowTask;

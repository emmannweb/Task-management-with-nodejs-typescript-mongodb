import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import TaskCard from "../../components/TaskCard";

const UserTask = () => {
  const [tasks, setTaks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();

  const showMyTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/mytask");
      setTaks(res?.data?.tasks);
      //console.log("my task", res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showMyTasks();
  }, []);

  return (
    <>
      <Box sx={{ bgcolor: palette.secondary.main, pt: 3, pb: 3, pr: 2, pl: 2 }}>
        <h1 style={{ color: "#fafafa" }}>My tasks</h1>

        <Grid container spacing={{ xs: 2, md: 2 }}>
          {loading ? (
            <Box
              sx={{
                minHeight: "500px",
              }}
            >
              <Loader />
            </Box>
          ) : tasks && tasks.length === 0 ? (
            <>
              <Box
                sx={{
                  minHeight: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "#c1c1c1", paddingLeft: "50px" }}>
                  No result found!
                </h2>
              </Box>
            </>
          ) : (
            tasks &&
            tasks.map((task) => (
              <Grid item xs={12} sm={6} key={task._id}>
                <TaskCard
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  stage={task.stage}
                  priority={task.priority}
                  attributed={task?.attributed?._id}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default UserTask;

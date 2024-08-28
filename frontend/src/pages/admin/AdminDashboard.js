import { Box, IconButton, Stack, Typography } from "@mui/material";
import StatComponent from "../../components/StatComponent";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useTheme } from "@emotion/react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
import moment from "moment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PieStat from "../../components/PieStat";
import Loader from "../../components/Loader";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useGetTasksQuery } from "../../redux/slices/taskApiSlice";
import { useParams } from "react-router-dom";
import { useAllUsersQuery } from "../../redux/slices/userApiSlice";

const AdminDashboard = () => {
  const [appStat, setAppStat] = useState([]);
  const [pieStat, setPieStat] = useState([]);
  const [checked, setCheked] = useState([]);
  const [page, setPage] = useState(1);
  const { palette } = useTheme();
  const { keyword } = useParams();
  const [priority, setPriority] = useState("all");

  const { data, isLoading } = useGetTasksQuery({
    page,
    keyword: keyword ? keyword : "",
    checked,
    priority: priority === "all" ? "" : priority,
  });

  const { data: usersRes } = useAllUsersQuery();
  //const dep = data?.stages && data?.stages.length > 0;

  useEffect(() => {
    const statFormat =
      data?.stages && data?.stages.length > 0
        ? data?.stages.map((e) => {
            return {
              x:
                e?._id && e?._id === "created"
                  ? "Created"
                  : e?._id === "inProgress"
                  ? "In Progress"
                  : e?._id === "completed"
                  ? "Completed"
                  : "",
              y: parseInt(e?.count),
            };
          })
        : [];

    const pieFormat =
      data?.stages && data?.stages.length > 0
        ? data?.stages.map((e) => {
            return {
              id: e?._id,
              label: e?._id,
              value: parseInt(e?.count),
              color:
                e?._id && e?._id === "created"
                  ? "hsl(173, 70%, 50%)"
                  : e?._id === "inProgress"
                  ? "hsl(86, 70%, 50%)"
                  : e?._id === "completed"
                  ? "hsl(137, 70%, 50%)"
                  : "",
            };
          })
        : [];

    setAppStat(statFormat);
    setPieStat(pieFormat);
  }, [data?.stages]);
  //console.log("piestat", pieStat);

  return (
    <>
      <h1 style={{ color: "#c1c1c1" }}>Admin Dashboard</h1>
      {isLoading ? (
        <>
          <Box
            sx={{
              minHeight: "calc(100vh - 210px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader />
          </Box>
        </>
      ) : (
        <>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <StatComponent
              value={data?.countStat ? data?.countStat : 0}
              icon={<AssignmentIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
              description="Tasks"
              money=""
            />
            <StatComponent
              value={usersRes?.users?.length}
              icon={<PeopleAltIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
              description="Users"
              money=""
            />
            <StatComponent
              value={2}
              icon={
                <MiscellaneousServicesIcon
                  sx={{ color: "#fafafa", fontSize: 30 }}
                />
              }
              description="Total Services"
              money=""
            />
            <PieStat>
              <IconButton sx={{ bgcolor: palette.primary.main }}>
                <BarChartIcon sx={{ color: "#fafafa", fontSize: 30 }} />
              </IconButton>
              <Box
                sx={{
                  height: "100px",
                  marginTop: "-35px",
                }}
              >
                <ResponsivePie
                  data={pieStat}
                  margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#fafafa"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  fill={[
                    {
                      match: {
                        id: "created",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "inProgress",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "completed",
                      },
                      id: "dots",
                    },
                  ]}
                  legends={
                    [
                      // {
                      //   anchor: "bottom",
                      //   direction: "row",
                      //   justify: false,
                      //   translateX: 0,
                      //   translateY: 56,
                      //   itemsSpacing: 0,
                      //   itemWidth: 100,
                      //   itemHeight: 18,
                      //   itemTextColor: "#999",
                      //   itemDirection: "left-to-right",
                      //   itemOpacity: 1,
                      //   symbolSize: 18,
                      //   symbolShape: "circle",
                      //   effects: [
                      //     {
                      //       on: "hover",
                      //       style: {
                      //         itemTextColor: "#000",
                      //       },
                      //     },
                      //   ],
                      // },
                    ]
                  }
                />
              </Box>
            </PieStat>
          </Stack>

          <Stack
            sx={{ mt: 4 }}
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 4 }}>
              <Box
                sx={{
                  bgcolor: palette.primary.main,
                  height: 300,
                  transition: "all ease .5s",
                }}
              >
                <ResponsiveLine
                  animate={false} // correct resize error
                  theme={{
                    axis: {
                      domain: {
                        line: {
                          stroke: palette.secondary.main,
                        },
                      },
                      legend: {
                        text: {
                          fill: palette.yellow2,
                        },
                      },
                      ticks: {
                        line: {
                          stroke: palette.primary.main,
                        },
                        text: {
                          fill: "#ffff00",
                        },
                      },
                    },
                    legends: {
                      text: {
                        fill: "#ffff00",
                        fontSize: "12",
                      },
                    },
                    tooltip: {
                      container: {
                        color: "#212121",
                      },
                    },
                  }}
                  colors={{ datum: "color" }}
                  data={[
                    {
                      id: "Tasks",
                      color: palette.yellow2,
                      data: appStat,
                    },
                  ]}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                  }}
                  yFormat=" >-.2f"
                  curve="catmullRom"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Tasks",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "count",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  enableGridX={false}
                  enableGridY={false}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      itemTextColor: palette.secondary.main, // legend color
                      anchor: "top-right",
                      direction: "column",
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                />
              </Box>
            </Box>

            {/* recent tasks */}
            <Box
              overflow="auto"
              sx={{
                flex: 3,
                bgcolor: palette.secondary.main,
                height: 300,
                transition: "all ease .5s",
                border: "1px solid oklch(0.382774 0.071686 233.169)",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid oklch(0.382774 0.071686 233.169)`}
                sx={{
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    background: palette.yellow1,
                    opacity: "0.2",
                    height: "65px",
                    width: "6px",
                    left: 0,
                    bottom: 0,
                  },
                }}
              >
                <Box
                  sx={{ bgcolor: palette.yellow1, opacity: 0.4, width: "100%" }}
                >
                  <Typography
                    p="15px"
                    color={"primary.main"}
                    variant="h6"
                    fontWeight="600"
                  >
                    Recent Tasks
                  </Typography>
                </Box>
              </Box>
              {data?.tasks?.map((task) => (
                <Box
                  key={`${task._id}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid oklch(0.382774 0.071686 233.169)`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: ".6rem",
                          sm: "17px",
                          display: "inline-flex",
                        },
                        color: palette.yellow2,
                        //fontSize: "17px",
                      }}
                    >
                      <AssignmentIcon
                        sx={{ mr: 1, fontSize: "21px", color: "#c1c1c1" }}
                      />{" "}
                      {`${task?.title.substring(0, 25)}...`}{" "}
                    </Typography>
                  </Box>

                  <Box
                    //component="span"
                    sx={{
                      color: "#c1c1c1",
                      pl: 2,
                      fontSize: {
                        xs: ".6rem",
                        sm: "17px",
                      },
                    }}
                  >
                    {`Created ${moment(task?.createdAt).format("DD/MM/YYYY")}`}
                  </Box>
                </Box>
              ))}
            </Box>
          </Stack>
        </>
      )}
    </>
  );
};

export default AdminDashboard;

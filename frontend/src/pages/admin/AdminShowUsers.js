import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@emotion/react";
import Swal from "sweetalert2";
import { useAllUsersQuery } from "../../redux/slices/userApiSlice";
import { useDeleteUserMutation } from "../../redux/slices/userApiSlice";
import { toast } from "react-toastify";

const AdminShowUsers = () => {
  const { palette } = useTheme();

  const { data: resUsers, refetch } = useAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  let data = [];
  data =
    resUsers?.users !== undefined && resUsers?.users?.length > 0
      ? resUsers?.users
      : [];

  // delete method from reducer
  const deleteMethod = async (id) => {
    try {
      await deleteUser(id);
      refetch();
      toast.success("deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserById = (e, id, name, lastName) => {
    if (id) {
      Swal.fire({
        title: "Do you want to remove user below?",
        html: `Name:${name} <br/> Lastname: ${lastName}`,
        icon: "warning",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        confirmButtonText: "Excluir",
        cancelButtonText: "Cancelar",
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

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 150,
      editable: true,
      headerClassName: "dg-header-style",
    },

    {
      field: "firstName",
      headerName: "Name",
      width: 150,
      headerClassName: "dg-header-style",
    },
    {
      field: "lastName",
      headerName: "LastName",
      width: 150,
      headerClassName: "dg-header-style",
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 150,
      headerClassName: "dg-header-style",
    },

    {
      field: "role",
      headerName: "User Status",
      headerClassName: "dg-header-style",
      width: 150,
      renderCell: (params) =>
        params.row.role === "admin" ? "Admin" : "Usuario",
    },
    {
      field: "active",
      headerName: "Active",
      headerClassName: "dg-header-style",
      width: 150,
      renderCell: (params) => (params.row.active === false ? "Não" : "Sim"),
    },

    {
      field: "createdAt",
      headerName: "Created date",
      width: 150,
      headerClassName: "dg-header-style",
      renderCell: (params) => moment(params.row.createdAt).format("DD/MM/YYYY"),
    },

    {
      field: "Update",
      width: 70,
      headerClassName: "dg-header-style",
      renderCell: (value) => (
        <Link to={`/admin/user/edit/${value.row._id}`}>
          <IconButton aria-label="edit">
            <EditIcon sx={{ color: palette.yellow2 }} />
          </IconButton>
        </Link>
      ),
    },
    {
      field: "Delete",
      width: 70,
      headerClassName: "dg-header-style",
      renderCell: (value) => (
        <IconButton
          aria-label="delete"
          onClick={(e) =>
            deleteUserById(
              e,
              value.row._id,
              value.row.firstName,
              value.row.lastName
            )
          }
        >
          <DeleteSweepIcon sx={{ color: "red" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          All users
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
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
              to="/admin/create/user"
              style={{ color: palette.primary.main, textDecoration: "none" }}
            >
              {" "}
              Create user
            </Link>
          </Button>
        </Box>
        <Paper sx={{ bgcolor: "secondary.main" }}>
          <Box sx={{ height: 400, width: "100%", bgcolor: "secondary.main" }}>
            <DataGrid
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "#c1c1c1",
                },
                "& .dg-header-style": {
                  backgroundColor: "secondary.main",
                },

                color: "#fafafa",
                [`& .${gridClasses.row}`]: {
                  bgcolor: "secondary.main",
                },
                button: {
                  color: "#fafafa",
                },
              }}
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default AdminShowUsers;

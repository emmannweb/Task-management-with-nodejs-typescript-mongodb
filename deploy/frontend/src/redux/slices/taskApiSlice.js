import { TASKS_URL } from "../constants/constants";
import { api } from "./apiSlice";

export const tasksApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (args) => {
        // Destructuring Object
        const { page, keyword, checked, priority } = args;
        return {
          url: `${TASKS_URL}/all?pageNumber=${page}&keyword=${keyword}&priority=${priority}&qstage=${checked?.join(
            ","
          )}`,
        };
      },
      // keepUnusedDataFor: 5,
      providesTags: ["Task"],
    }),

    singleTask: builder.query({
      query: (task_id) => ({
        url: `${TASKS_URL}/${task_id}`,
      }),
      providesTags: ["Task"],
      keepUnusedDataFor: 5,
    }),

    editSingleTask: builder.mutation({
      query: (task) => ({
        url: `${TASKS_URL}/admin/edit/${task._id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),

    createTask: builder.mutation({
      query: (task) => ({
        url: `${TASKS_URL}/create`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation({
      query: (task_id) => ({
        url: `${TASKS_URL}/delete/${task_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useSingleTaskQuery,
  useEditSingleTaskMutation,
  useDeleteTaskMutation,
  useCreateTaskMutation,
} = tasksApiSlice;

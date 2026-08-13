import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateTask from "../components/CreateTask";
import EditTask from "../components/EditTask";
import { useToast } from "../context/ToastContext";

function Tasks() {
  const { showToast } = useToast();

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const getTasks = async () => {
    try {
      const response = await api.get("/tasks", {
        params: {
          search: search,
          category: category,
        },
      });

      console.log("Tasks:", response.data);

      setTasks(response.data);
      setError("");
    } catch (error) {
      console.error("Tasks Error:", error);

      setError(
        error.response?.data?.message ||
          error.response?.data?.msg ||
          "Unable to load tasks",
      );
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((previousTasks) => {
      return [...previousTasks, newTask];
    });
  };

  const handleDelete = async () => {
    if (!deletingTask || deleteLoading) {
      return;
    }

    setDeleteLoading(true);

    try {
      await api.delete(`/tasks/${deletingTask.id}`);

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== deletingTask.id),
      );

      setDeletingTask(null);

      showToast("Task deleted successfully!", "success");
    } catch (error) {
      console.error("Delete Error:", error);

      showToast(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete task",
        "error",
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUpdate = async (taskId, updatedData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, updatedData);

      const updatedTask = response.data.task;

      setTasks((previousTasks) =>
        previousTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );

      setEditingTask(null);

      return true;
    } catch (error) {
      console.error("Update Error:", error);

      throw error;
    }
  };

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    }

    if (status === "In Progress") {
      return "bg-violet-500/10 text-violet-400 border border-violet-500/20";
    }

    return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-5 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 text-white">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
        <div>
          <p className="text-sm font-medium text-blue-400 mb-2">WORKSPACE</p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            My Tasks
          </h1>

          <p className="text-slate-400 mt-2">
            Organize your work and keep everything on track.
          </p>
        </div>

        <div className="self-start lg:self-auto px-4 py-2 rounded-xl bg-white/[0.035] border border-white/[0.07] text-sm text-slate-400">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </div>
      </div>

      {/* Search */}

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] backdrop-blur-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-500/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-blue-500/10"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="md:w-52 px-4 py-3 rounded-xl bg-[#111624] border border-white/[0.08] text-slate-300 outline-none cursor-pointer transition-all duration-300 focus:border-blue-500/50"
          >
            <option value="">All Categories</option>

            <option value="DevSecOps">DevSecOps</option>

            <option value="Web Development">Web Development</option>

            <option value="DSA">DSA</option>

            <option value="AI/ML">AI/ML</option>
          </select>

          <button
            onClick={getTasks}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
          >
            Search
          </button>
        </div>
      </div>

      {/* Create Task */}

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] backdrop-blur-xl p-6 mb-6 transition-all duration-300 hover:border-white/[0.12]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/10 flex items-center justify-center text-blue-400 text-xl">
            +
          </div>

          <div>
            <h2 className="font-semibold text-white">Create New Task</h2>

            <p className="text-xs text-slate-500">
              Add something to your workspace.
            </p>
          </div>
        </div>

        <CreateTask onTaskCreated={handleTaskCreated} />
      </div>

      {/* No Tasks */}

      {tasks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] p-14 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-2xl text-slate-500 mb-5">
            ✓
          </div>

          <h2 className="text-lg font-semibold text-slate-300">
            No tasks found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Create a task or adjust your search filters.
          </p>
        </div>
      )}

      {/* Task Grid */}

      {tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-blue-500/5"
            >
              {/* Glow */}

              <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-blue-500/[0.06] blur-3xl transition-all duration-500 group-hover:bg-blue-500/[0.12]" />

              {/* Task Information */}

              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-white truncate transition-colors duration-300 group-hover:text-blue-100">
                    {task.title}
                  </h2>

                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 min-h-[40px]">
                    {task.description || "No description"}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-slate-600">
                  #{task.id}
                </span>
              </div>

              {/* Category */}

              <div className="relative mt-5">
                <span className="inline-flex px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06] text-xs font-medium text-slate-400">
                  {task.category || "General"}
                </span>
              </div>

              {/* Status */}

              <div className="relative mt-4">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusClass(task.status)}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>

                  {task.status}
                </span>
              </div>

              {/* Buttons */}

              <div className="relative border-t border-white/[0.06] mt-6 pt-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500/20 hover:text-blue-300 hover:-translate-y-0.5 active:scale-95"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeletingTask(task)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/[0.05] border border-red-500/10 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-300 hover:-translate-y-0.5 active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Task */}

      <EditTask
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        handleUpdate={handleUpdate}
      />

      {/* ================= DELETE MODAL ================= */}

      {deletingTask && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            p-4
            bg-black/70
            backdrop-blur-md
        "
          onClick={() => {
            if (!deleteLoading) {
              setDeletingTask(null);
            }
          }}
        >
          <div
            className="
                relative
                w-full
                max-w-md
                rounded-3xl
                border
                border-white/[0.09]
                bg-[#0c101c]
                shadow-2xl
                shadow-black/50
                overflow-hidden
                p-6
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow */}

            <div
              className="
                absolute
                -top-24
                -right-24
                w-48
                h-48
                rounded-full
                bg-red-500/10
                blur-3xl
                pointer-events-none
            "
            />

            {/* Icon */}

            <div
              className="
                relative
                w-12
                h-12
                rounded-2xl
                bg-red-500/10
                border
                border-red-500/10
                flex
                items-center
                justify-center
                text-red-400
                text-xl
                mb-5
            "
            >
              !
            </div>

            {/* Heading */}

            <h2
              className="
                text-xl
                font-bold
                text-white
            "
            >
              Delete task?
            </h2>

            <p
              className="
                text-sm
                text-slate-400
                mt-2
                leading-6
            "
            >
              Are you sure you want to delete this task?
            </p>

            {/* Task Preview */}

            <div
              className="
                mt-5
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.03]
                p-4
            "
            >
              <p
                className="
                    text-sm
                    font-semibold
                    text-white
                    truncate
                "
              >
                {deletingTask.title}
              </p>

              {deletingTask.description && (
                <p
                  className="
                        text-xs
                        text-slate-500
                        mt-1
                        line-clamp-2
                    "
                >
                  {deletingTask.description}
                </p>
              )}
            </div>

            <p
              className="
                text-xs
                text-red-400/70
                mt-4
            "
            >
              This action cannot be undone.
            </p>

            {/* Actions */}

            <div
              className="
                flex
                gap-3
                mt-6
            "
            >
              {/* Cancel */}

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => setDeletingTask(null)}
                className="
                        flex-1
                        px-5
                        py-3
                        rounded-xl
                        bg-white/[0.04]
                        border
                        border-white/[0.08]
                        text-slate-300
                        font-medium
                        transition-all
                        duration-300
                        hover:bg-white/[0.08]
                        hover:border-white/[0.14]
                        hover:text-white
                        active:scale-95
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                    "
              >
                Cancel
              </button>

              {/* Delete */}

              <button
                type="button"
                disabled={deleteLoading}
                onClick={handleDelete}
                className="
                        flex-1
                        px-5
                        py-3
                        rounded-xl
                        bg-gradient-to-r
                        from-red-600
                        to-rose-600
                        text-white
                        font-semibold
                        shadow-lg
                        shadow-red-500/10
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-xl
                        hover:shadow-red-500/20
                        active:scale-95
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                    "
              >
                {deleteLoading ? (
                  <span
                    className="
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
                  >
                    <span
                      className="
                                w-4
                                h-4
                                rounded-full
                                border-2
                                border-white/30
                                border-t-white
                                animate-spin
                            "
                    />
                    Deleting...
                  </span>
                ) : (
                  "Delete Task"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;

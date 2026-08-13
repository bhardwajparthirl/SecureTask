import { useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";

function CreateTask({ onTaskCreated }) {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/tasks", formData);

      console.log("Created Task:", response.data);

      onTaskCreated(response.data.task);

      setFormData({
        title: "",
        description: "",
        category: "",
        status: "Pending",
      });

      showToast("Task created successfully!", "success");
    } catch (error) {
      console.error("Create Task Error:", error);

      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to create task";

      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
          Workspace
        </p>

        <h2 className="text-2xl font-bold text-white">Create New Task</h2>

        <p className="text-sm text-slate-500 mt-1">
          Add a new task to your workspace.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* TITLE */}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Task Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 outline-none transition duration-300 hover:border-white/[0.14] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
          />
        </div>

        {/* CATEGORY */}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>

          <input
            type="text"
            name="category"
            placeholder="e.g. DevSecOps"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 outline-none transition duration-300 hover:border-white/[0.14] focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 disabled:opacity-50"
          />
        </div>

        {/* DESCRIPTION */}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>

          <textarea
            name="description"
            placeholder="Describe what you need to accomplish..."
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            rows="4"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-600 outline-none resize-none transition duration-300 hover:border-white/[0.14] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
          />
        </div>

        {/* STATUS */}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-[#111624] border border-white/[0.08] text-slate-300 outline-none transition duration-300 hover:border-white/[0.14] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
          >
            <option value="Pending">Pending</option>

            <option value="In Progress">In Progress</option>

            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* BUTTON */}

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                Creating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl">+</span>
                Create Task
              </span>
            )}
          </button>
        </div>
      </form>

      {/* MESSAGE */}

      {message && success && (
        <div className="mt-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10 text-emerald-400 text-sm">
          <span className="font-bold">✓</span>

          <span>{message}</span>
        </div>
      )}

      {message && !success && (
        <div className="mt-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/[0.06] border border-red-500/10 text-red-400 text-sm">
          <span className="font-bold">!</span>

          <span>{message}</span>
        </div>
      )}
    </div>
  );
}

export default CreateTask;

import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";

function EditTask({ editingTask, setEditingTask, handleUpdate }) {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  /* ================= LOAD TASK ================= */

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        category: editingTask.category || "",
        status: editingTask.status || "Pending",
      });
    }
  }, [editingTask]);

  /* ================= CLOSE ================= */

  if (!editingTask) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    try {
      await handleUpdate(editingTask.id, formData);

      showToast("Task updated successfully!", "success");
    } catch (error) {
      console.error("Update Error:", error);

      showToast("Failed to update task", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) {
      return;
    }

    setEditingTask(null);
  };

  return (
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
      onClick={handleClose}
    >
      {/* ================= MODAL ================= */}

      <div
        className="
                    relative
                    w-full
                    max-w-lg
                    max-h-[90vh]
                    overflow-y-auto
                    rounded-3xl
                    border
                    border-white/[0.09]
                    bg-[#0c101c]
                    shadow-2xl
                    shadow-black/50
                    overflow-hidden
                    transition-all
                    duration-300
                "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= GLOW ================= */}

        <div
          className="
                    absolute
                    -top-32
                    -right-32
                    w-64
                    h-64
                    rounded-full
                    bg-blue-500/10
                    blur-3xl
                    pointer-events-none
                "
        />

        <div
          className="
                    absolute
                    -bottom-32
                    -left-32
                    w-64
                    h-64
                    rounded-full
                    bg-violet-500/10
                    blur-3xl
                    pointer-events-none
                "
        />

        {/* ================= HEADER ================= */}

        <div
          className="
                    relative
                    flex
                    items-center
                    justify-between
                    px-6
                    py-5
                    border-b
                    border-white/[0.07]
                "
        >
          <div>
            <p
              className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-blue-400
                            mb-1
                        "
            >
              Task Editor
            </p>

            <h2
              className="
                            text-xl
                            font-bold
                            text-white
                        "
            >
              Edit Task
            </h2>

            <p
              className="
                            text-xs
                            text-slate-500
                            mt-1
                        "
            >
              Update your task details.
            </p>
          </div>

          {/* Close */}

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-slate-500
                            bg-white/[0.04]
                            border
                            border-white/[0.07]
                            transition-all
                            duration-300
                            hover:text-white
                            hover:bg-white/[0.08]
                            hover:border-white/[0.14]
                            hover:rotate-90
                            active:scale-90
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                        "
          >
            ×
          </button>
        </div>

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit} className="relative p-6">
          {/* TITLE */}

          <div className="mb-5">
            <label
              className="
                            block
                            text-sm
                            font-medium
                            text-slate-300
                            mb-2
                        "
            >
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              required
              disabled={loading}
              className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                bg-white/[0.04]
                                border
                                border-white/[0.08]
                                text-white
                                placeholder:text-slate-600
                                outline-none
                                transition-all
                                duration-300
                                hover:border-white/[0.14]
                                focus:bg-white/[0.06]
                                focus:border-blue-500/50
                                focus:ring-4
                                focus:ring-blue-500/10
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
            />
          </div>

          {/* DESCRIPTION */}

          <div className="mb-5">
            <label
              className="
                            block
                            text-sm
                            font-medium
                            text-slate-300
                            mb-2
                        "
            >
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your task..."
              disabled={loading}
              className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                bg-white/[0.04]
                                border
                                border-white/[0.08]
                                text-white
                                placeholder:text-slate-600
                                outline-none
                                resize-none
                                transition-all
                                duration-300
                                hover:border-white/[0.14]
                                focus:bg-white/[0.06]
                                focus:border-blue-500/50
                                focus:ring-4
                                focus:ring-blue-500/10
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
            />
          </div>

          {/* CATEGORY + STATUS */}

          <div
            className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        gap-4
                        mb-6
                    "
          >
            {/* CATEGORY */}

            <div>
              <label
                className="
                                block
                                text-sm
                                font-medium
                                text-slate-300
                                mb-2
                            "
              >
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    bg-[#111624]
                                    border
                                    border-white/[0.08]
                                    text-slate-300
                                    outline-none
                                    cursor-pointer
                                    transition-all
                                    duration-300
                                    hover:border-white/[0.14]
                                    focus:border-blue-500/50
                                    focus:ring-4
                                    focus:ring-blue-500/10
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
              >
                <option value="">General</option>

                <option value="DevSecOps">DevSecOps</option>

                <option value="Web Development">Web Development</option>

                <option value="DSA">DSA</option>

                <option value="AI/ML">AI/ML</option>
              </select>
            </div>

            {/* STATUS */}

            <div>
              <label
                className="
                                block
                                text-sm
                                font-medium
                                text-slate-300
                                mb-2
                            "
              >
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    bg-[#111624]
                                    border
                                    border-white/[0.08]
                                    text-slate-300
                                    outline-none
                                    cursor-pointer
                                    transition-all
                                    duration-300
                                    hover:border-white/[0.14]
                                    focus:border-violet-500/50
                                    focus:ring-4
                                    focus:ring-violet-500/10
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
              >
                <option value="Pending">Pending</option>

                <option value="In Progress">In Progress</option>

                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* ================= ACTIONS ================= */}

          <div
            className="
                        flex
                        gap-3
                        pt-5
                        border-t
                        border-white/[0.07]
                    "
          >
            {/* CANCEL */}

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
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

            {/* SAVE */}

            <button
              type="submit"
              disabled={loading}
              className="
                                flex-1
                                px-5
                                py-3
                                rounded-xl
                                bg-gradient-to-r
                                from-blue-600
                                to-violet-600
                                text-white
                                font-semibold
                                shadow-lg
                                shadow-blue-500/10
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-xl
                                hover:shadow-blue-500/20
                                active:scale-95
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
            >
              {loading ? (
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
                  Saving...
                </span>
              ) : (
                <span
                  className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                >
                  Save Changes
                  <span>→</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;

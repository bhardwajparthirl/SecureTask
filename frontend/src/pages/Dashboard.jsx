import { useEffect, useState } from "react";
import api from "../api/axios";
import { useToast } from "../context/ToastContext";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const response = await api.get("/dashboard");

        console.log("Dashboard:", response.data);

        setDashboard(response.data);
      } catch (error) {
        console.error("Dashboard Error:", error);

        setError(
          error.response?.data?.message ||
            error.response?.data?.msg ||
            "Unable to load dashboard",
        );
      }
    };

    getDashboard();
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="min-h-screen p-6 md:p-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-400 mb-2">OVERVIEW</p>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Here's what's happening with your tasks today.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total */}
        <div
          className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border border-white/[0.07]
                bg-white/[0.035]
                p-6
                backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-1
                hover:border-blue-500/30
                hover:bg-white/[0.05]
                hover:shadow-xl
                hover:shadow-blue-500/5
            "
        >
          <div
            className="
                    absolute
                    -right-10
                    -top-10
                    w-28
                    h-28
                    rounded-full
                    bg-blue-500/10
                    blur-2xl
                    transition-all duration-500
                    group-hover:bg-blue-500/20
                "
          />

          <p className="text-sm text-slate-400">Total Tasks</p>

          <h2 className="text-4xl font-bold mt-3">{dashboard.total_tasks}</h2>

          <p className="text-xs text-slate-500 mt-2">All your tasks</p>
        </div>

        {/* Pending */}
        <div
          className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border border-white/[0.07]
                bg-white/[0.035]
                p-6
                backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-1
                hover:border-amber-500/30
                hover:bg-white/[0.05]
                hover:shadow-xl
                hover:shadow-amber-500/5
            "
        >
          <div
            className="
                    absolute
                    -right-10
                    -top-10
                    w-28
                    h-28
                    rounded-full
                    bg-amber-500/10
                    blur-2xl
                    transition-all duration-500
                    group-hover:bg-amber-500/20
                "
          />

          <p className="text-sm text-slate-400">Pending</p>

          <h2 className="text-4xl font-bold mt-3 text-amber-400">
            {dashboard.pending}
          </h2>

          <p className="text-xs text-slate-500 mt-2">Waiting to start</p>
        </div>

        {/* In Progress */}
        <div
          className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border border-white/[0.07]
                bg-white/[0.035]
                p-6
                backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-1
                hover:border-violet-500/30
                hover:bg-white/[0.05]
                hover:shadow-xl
                hover:shadow-violet-500/5
            "
        >
          <div
            className="
                    absolute
                    -right-10
                    -top-10
                    w-28
                    h-28
                    rounded-full
                    bg-violet-500/10
                    blur-2xl
                    transition-all duration-500
                    group-hover:bg-violet-500/20
                "
          />

          <p className="text-sm text-slate-400">In Progress</p>

          <h2 className="text-4xl font-bold mt-3 text-violet-400">
            {dashboard.in_progress}
          </h2>

          <p className="text-xs text-slate-500 mt-2">Currently working on</p>
        </div>

        {/* Completed */}
        <div
          className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border border-white/[0.07]
                bg-white/[0.035]
                p-6
                backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-1
                hover:border-emerald-500/30
                hover:bg-white/[0.05]
                hover:shadow-xl
                hover:shadow-emerald-500/5
            "
        >
          <div
            className="
                    absolute
                    -right-10
                    -top-10
                    w-28
                    h-28
                    rounded-full
                    bg-emerald-500/10
                    blur-2xl
                    transition-all duration-500
                    group-hover:bg-emerald-500/20
                "
          />

          <p className="text-sm text-slate-400">Completed</p>

          <h2 className="text-4xl font-bold mt-3 text-emerald-400">
            {dashboard.completed}
          </h2>

          <p className="text-xs text-slate-500 mt-2">Successfully finished</p>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {/* Completion */}
        <div
          className="
                rounded-2xl
                border border-white/[0.07]
                bg-white/[0.035]
                p-6
                backdrop-blur-xl
            "
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Completion Progress</h2>

              <p className="text-sm text-slate-500 mt-1">
                Your overall task completion.
              </p>
            </div>

            <div
              className="
                        px-3 py-1.5
                        rounded-full
                        bg-emerald-500/10
                        border border-emerald-500/10
                        text-emerald-400
                        text-sm font-semibold
                    "
            >
              {dashboard.total_tasks > 0
                ? Math.round(
                    (dashboard.completed / dashboard.total_tasks) * 100,
                  )
                : 0}
              %
            </div>
          </div>

          <div className="mt-8">
            <div
              className="
                        h-3
                        w-full
                        bg-white/[0.05]
                        rounded-full
                        overflow-hidden
                    "
            >
              <div
                className="
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-blue-500
                                via-violet-500
                                to-emerald-400
                                transition-all
                                duration-700
                            "
                style={{
                  width: `${
                    dashboard.total_tasks > 0
                      ? Math.round(
                          (dashboard.completed / dashboard.total_tasks) * 100,
                        )
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Distribution */}
        <div
          className="
                rounded-2xl
                border border-white/[0.07]
                bg-white/[0.035]
                p-6
                backdrop-blur-xl
            "
        >
          <h2 className="text-lg font-semibold">Task Distribution</h2>

          <p className="text-sm text-slate-500 mt-1">
            Current status of your tasks.
          </p>

          <div className="space-y-5 mt-7">
            {/* Pending */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Pending</span>

                <span className="text-sm font-medium text-amber-400">
                  {dashboard.pending}
                </span>
              </div>

              <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-700"
                  style={{
                    width: `${
                      dashboard.total_tasks > 0
                        ? (dashboard.pending / dashboard.total_tasks) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* In Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">In Progress</span>

                <span className="text-sm font-medium text-violet-400">
                  {dashboard.in_progress}
                </span>
              </div>

              <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${
                      dashboard.total_tasks > 0
                        ? (dashboard.in_progress / dashboard.total_tasks) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <button
    onClick={() => showToast("Toast system is working!")}
    className="px-4 py-2 bg-blue-600 text-white rounded-xl"
>
    Test Toast
</button>

            {/* Completed */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Completed</span>

                <span className="text-sm font-medium text-emerald-400">
                  {dashboard.completed}
                </span>
              </div>

              <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                  style={{
                    width: `${
                      dashboard.total_tasks > 0
                        ? (dashboard.completed / dashboard.total_tasks) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

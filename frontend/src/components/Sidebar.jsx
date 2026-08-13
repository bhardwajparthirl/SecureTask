import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar({ isOpen, setIsOpen }) {

    const { logout } = useAuth();

    const linkStyle = ({ isActive }) => `
        group
        relative
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        text-sm
        font-medium
        transition-all
        duration-300
        ${
            isActive
                ? `
                    bg-gradient-to-r
                    from-blue-600/20
                    to-violet-600/20
                    text-white
                    border
                    border-blue-500/20
                    shadow-lg
                    shadow-blue-500/5
                `
                : `
                    text-slate-400
                    border
                    border-transparent
                    hover:text-white
                    hover:bg-white/[0.04]
                    hover:border-white/[0.06]
                    hover:translate-x-1
                `
        }
    `;

    const handleNavigation = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }

        logout();
    };

    return (
        <aside
            className={`
                fixed
                left-0
                top-0
                z-50
                w-64
                h-screen
                flex
                flex-col
                p-5
                bg-[#0c101c]
                border-r
                border-white/[0.06]

                transition-transform
                duration-300
                ease-out

                md:translate-x-0

                ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
            `}
        >

            {/* ================= LOGO ================= */}

            <div className="mb-10">

                <div className="
                    flex
                    items-center
                    justify-between
                    px-3
                    py-2
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <div
                            className="
                                relative
                                w-10
                                h-10
                                rounded-xl
                                bg-gradient-to-br
                                from-blue-500
                                to-violet-600
                                flex
                                items-center
                                justify-center
                                text-white
                                shadow-lg
                                shadow-blue-500/20
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:rotate-2
                                hover:shadow-blue-500/40
                            "
                        >
                            <span className="text-lg font-bold">
                                ◈
                            </span>
                        </div>

                        <div>

                            <h1 className="
                                text-lg
                                font-bold
                                tracking-tight
                                text-white
                            ">
                                SecureTask
                            </h1>

                            <p className="
                                text-[10px]
                                text-slate-500
                                uppercase
                                tracking-[0.2em]
                            ">
                                Workspace
                            </p>

                        </div>

                    </div>


                    {/* Mobile Close */}

                    <button
                        onClick={() => setIsOpen(false)}
                        className="
                            md:hidden
                            w-9
                            h-9
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-slate-500
                            bg-white/[0.04]
                            border
                            border-white/[0.06]
                            transition-all
                            duration-300
                            hover:text-white
                            hover:bg-white/[0.08]
                            hover:rotate-90
                        "
                        aria-label="Close navigation"
                    >
                        ×
                    </button>

                </div>

            </div>


            {/* ================= NAVIGATION ================= */}

            <div className="flex-1">

                <p className="
                    px-4
                    mb-3
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-slate-600
                ">
                    Overview
                </p>


                <nav className="space-y-2">

                    {/* Dashboard */}

                    <NavLink
                        to="/dashboard"
                        onClick={handleNavigation}
                        className={linkStyle}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            left-0
                                            top-1/2
                                            -translate-y-1/2
                                            w-0.5
                                            h-7
                                            rounded-full
                                            bg-blue-500
                                            shadow-lg
                                            shadow-blue-500/60
                                        "
                                    />
                                )}

                                <span className="
                                    w-9
                                    h-9
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-base
                                    bg-white/[0.03]
                                    text-slate-500
                                    transition-all
                                    duration-300
                                    group-hover:bg-white/[0.07]
                                    group-hover:text-white
                                    group-hover:scale-105
                                ">
                                    ◉
                                </span>

                                <span>
                                    Dashboard
                                </span>
                            </>
                        )}
                    </NavLink>


                    {/* Workspace */}

                    <p className="
                        px-4
                        pt-6
                        pb-3
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-slate-600
                    ">
                        Workspace
                    </p>


                    {/* Tasks */}

                    <NavLink
                        to="/tasks"
                        onClick={handleNavigation}
                        className={linkStyle}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            left-0
                                            top-1/2
                                            -translate-y-1/2
                                            w-0.5
                                            h-7
                                            rounded-full
                                            bg-violet-500
                                            shadow-lg
                                            shadow-violet-500/60
                                        "
                                    />
                                )}

                                <span className="
                                    w-9
                                    h-9
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-base
                                    bg-white/[0.03]
                                    text-slate-500
                                    transition-all
                                    duration-300
                                    group-hover:bg-white/[0.07]
                                    group-hover:text-white
                                    group-hover:scale-105
                                ">
                                    ✓
                                </span>

                                <span>
                                    My Tasks
                                </span>
                            </>
                        )}
                    </NavLink>


                    {/* Account */}

                    <p className="
                        px-4
                        pt-6
                        pb-3
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-slate-600
                    ">
                        Account
                    </p>


                    {/* Profile */}

                    <NavLink
                        to="/profile"
                        onClick={handleNavigation}
                        className={linkStyle}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            left-0
                                            top-1/2
                                            -translate-y-1/2
                                            w-0.5
                                            h-7
                                            rounded-full
                                            bg-blue-500
                                            shadow-lg
                                            shadow-blue-500/60
                                        "
                                    />
                                )}

                                <span className="
                                    w-9
                                    h-9
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-base
                                    bg-white/[0.03]
                                    text-slate-500
                                    transition-all
                                    duration-300
                                    group-hover:bg-white/[0.07]
                                    group-hover:text-white
                                    group-hover:scale-105
                                ">
                                    ○
                                </span>

                                <span>
                                    Profile
                                </span>
                            </>
                        )}
                    </NavLink>

                </nav>

            </div>


            {/* ================= LOGOUT ================= */}

            <button
                onClick={handleLogout}
                className="
                    group
                    flex
                    items-center
                    gap-3
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    text-slate-400
                    border
                    border-transparent
                    transition-all
                    duration-300
                    hover:text-red-400
                    hover:bg-red-500/[0.06]
                    hover:border-red-500/10
                    hover:translate-x-1
                "
            >

                <span className="
                    w-9
                    h-9
                    rounded-lg
                    bg-white/[0.03]
                    flex
                    items-center
                    justify-center
                    text-slate-500
                    transition-all
                    duration-300
                    group-hover:bg-red-500/10
                    group-hover:text-red-400
                    group-hover:-translate-x-1
                ">
                    ↪
                </span>

                <span>
                    Logout
                </span>

            </button>

        </aside>
    );
}

export default Sidebar;
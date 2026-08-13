import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#080b14]">

            {/* Mobile Header */}

            <header className="
                md:hidden
                fixed
                top-0
                left-0
                right-0
                z-30
                h-16
                px-4
                flex
                items-center
                justify-between
                bg-[#0c101c]/95
                backdrop-blur-xl
                border-b
                border-white/[0.07]
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        w-9
                        h-9
                        rounded-xl
                        bg-gradient-to-br
                        from-blue-500
                        to-violet-600
                        flex
                        items-center
                        justify-center
                        text-white
                        font-bold
                        shadow-lg
                        shadow-blue-500/20
                    ">
                        ◈
                    </div>

                    <div>

                        <h1 className="
                            text-sm
                            font-bold
                            text-white
                        ">
                            SecureTask
                        </h1>

                        <p className="
                            text-[9px]
                            uppercase
                            tracking-widest
                            text-slate-600
                        ">
                            Workspace
                        </p>

                    </div>

                </div>


                {/* Hamburger */}

                <button
                    onClick={() => setSidebarOpen(true)}
                    className="
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        bg-white/[0.04]
                        border
                        border-white/[0.07]
                        text-slate-300
                        transition-all
                        duration-300
                        hover:bg-white/[0.08]
                        hover:text-white
                        active:scale-95
                    "
                    aria-label="Open navigation"
                >
                    ☰
                </button>

            </header>


            {/* Mobile Overlay */}

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="
                        md:hidden
                        fixed
                        inset-0
                        z-40
                        bg-black/60
                        backdrop-blur-sm
                    "
                />
            )}


            {/* Sidebar */}

            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />


            {/* Main Content */}

            <main className="
                md:ml-64
                min-h-screen
                pt-16
                md:pt-0
            ">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;
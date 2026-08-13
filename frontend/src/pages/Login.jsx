import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";

function Login() {

    const { login } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);


    /* ================= CHANGE INPUT ================= */

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    /* ================= LOGIN ================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                "/login",
                formData
            );

            const token = response.data.access_token;

            console.log("JWT Token:", token);

            /*
             * AuthContext handles:
             * 1. Saving JWT
             * 2. Updating authentication state
             * 3. Navigating to dashboard
             */

            login(token);

            showToast(
                "Welcome back!",
                "success"
            );

        } catch (error) {

            console.error(
                "Login Error:",
                error
            );

            const errorMessage =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Login failed";

            showToast(
                errorMessage,
                "error"
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="
            min-h-screen
            bg-[#080b14]
            flex
            items-center
            justify-center
            px-4
            py-8
        ">

            <div className="
                w-full
                max-w-md
            ">


                {/* ================= LOGO ================= */}

                <div className="
                    text-center
                    mb-8
                ">

                    <div className="
                        flex
                        justify-center
                        mb-5
                    ">

                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-gradient-to-br
                            from-blue-500
                            to-violet-600
                            flex
                            items-center
                            justify-center
                            text-white
                            text-2xl
                            shadow-xl
                            shadow-blue-500/20
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:rotate-2
                            hover:shadow-blue-500/40
                        ">
                            ◈
                        </div>

                    </div>


                    <h1 className="
                        text-3xl
                        font-bold
                        text-white
                        tracking-tight
                    ">
                        SecureTask
                    </h1>


                    <p className="
                        text-slate-500
                        mt-2
                    ">
                        Sign in to manage your tasks
                    </p>

                </div>


                {/* ================= LOGIN CARD ================= */}

                <div className="
                    relative
                    overflow-hidden
                    bg-white/[0.035]
                    backdrop-blur-xl
                    rounded-3xl
                    border
                    border-white/[0.08]
                    shadow-2xl
                    shadow-black/30
                    p-8
                ">


                    {/* Glow */}

                    <div className="
                        absolute
                        -top-24
                        -right-24
                        w-48
                        h-48
                        rounded-full
                        bg-blue-500/10
                        blur-3xl
                        pointer-events-none
                    " />

                    <div className="
                        absolute
                        -bottom-24
                        -left-24
                        w-48
                        h-48
                        rounded-full
                        bg-violet-500/10
                        blur-3xl
                        pointer-events-none
                    " />


                    {/* Heading */}

                    <div className="
                        relative
                        mb-7
                    ">

                        <p className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-blue-400
                            mb-2
                        ">
                            Welcome back
                        </p>

                        <h2 className="
                            text-2xl
                            font-bold
                            text-white
                        ">
                            Sign in
                        </h2>

                        <p className="
                            text-sm
                            text-slate-500
                            mt-1
                        ">
                            Enter your credentials to continue.
                        </p>

                    </div>


                    {/* ================= FORM ================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="relative"
                    >


                        {/* EMAIL */}

                        <div className="mb-5">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-300
                                mb-2
                            ">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="email"
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


                        {/* PASSWORD */}

                        <div className="mb-6">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-300
                                mb-2
                            ">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="current-password"
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
                                    focus:border-violet-500/50
                                    focus:ring-4
                                    focus:ring-violet-500/10
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            />

                        </div>


                        {/* ================= LOGIN BUTTON ================= */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                group
                                relative
                                overflow-hidden
                                w-full
                                px-6
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
                                active:scale-[0.98]
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                                disabled:hover:translate-y-0
                            "
                        >

                            <span className="
                                relative
                                z-10
                                flex
                                items-center
                                justify-center
                                gap-2
                            ">

                                {loading ? (

                                    <>
                                        <span className="
                                            w-4
                                            h-4
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
                                            animate-spin
                                        " />

                                        Signing in...
                                    </>

                                ) : (

                                    <>
                                        Sign In

                                        <span className="
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        ">
                                            →
                                        </span>
                                    </>

                                )}

                            </span>


                            {/* Shine effect */}

                            {!loading && (

                                <span className="
                                    absolute
                                    inset-0
                                    -translate-x-full
                                    bg-gradient-to-r
                                    from-transparent
                                    via-white/10
                                    to-transparent
                                    transition-transform
                                    duration-700
                                    group-hover:translate-x-full
                                " />

                            )}

                        </button>

                    </form>

                </div>


                {/* ================= REGISTER ================= */}

                <p className="
                    text-center
                    text-sm
                    text-slate-500
                    mt-6
                ">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="
                            text-blue-400
                            font-medium
                            transition-colors
                            duration-300
                            hover:text-violet-400
                            hover:underline
                        "
                    >
                        Create one
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;
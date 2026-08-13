import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function Register() {

    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        username: "",
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


    /* ================= REGISTER ================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                "/register",
                formData
            );

            console.log(
                "Registration Response:",
                response.data
            );

            showToast(
                response.data.message ||
                "Account created successfully!",
                "success"
            );

            // Clear form
            setFormData({
                username: "",
                email: "",
                password: ""
            });

        } catch (error) {

            console.error(
                "Registration Error:",
                error
            );

            const errorMessage =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Registration failed";

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
            relative
            overflow-hidden
            bg-[#080b14]
            flex
            items-center
            justify-center
            px-4
            py-10
        ">


            {/* ================= BACKGROUND GLOW ================= */}

            <div className="
                absolute
                -top-40
                -right-40
                w-96
                h-96
                rounded-full
                bg-violet-600/20
                blur-3xl
                pointer-events-none
            " />

            <div className="
                absolute
                -bottom-40
                -left-40
                w-96
                h-96
                rounded-full
                bg-blue-600/20
                blur-3xl
                pointer-events-none
            " />

            <div className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-72
                h-72
                rounded-full
                bg-violet-500/5
                blur-3xl
                pointer-events-none
            " />


            {/* ================= CONTENT ================= */}

            <div className="
                relative
                z-10
                w-full
                max-w-md
            ">


                {/* ================= BRAND ================= */}

                <div className="
                    text-center
                    mb-8
                ">

                    <div className="
                        inline-flex
                        items-center
                        justify-center
                        w-14
                        h-14
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-500
                        to-violet-600
                        text-white
                        text-2xl
                        shadow-xl
                        shadow-blue-500/20
                        mb-5
                        transition-all
                        duration-500
                        hover:scale-110
                        hover:rotate-3
                        hover:shadow-blue-500/40
                    ">
                        ◈
                    </div>

                    <h1 className="
                        text-3xl
                        font-bold
                        tracking-tight
                        text-white
                    ">
                        SecureTask
                    </h1>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-2
                    ">
                        Build your secure productivity workspace
                    </p>

                </div>


                {/* ================= REGISTER CARD ================= */}

                <div className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/[0.09]
                    bg-white/[0.035]
                    backdrop-blur-2xl
                    shadow-2xl
                    shadow-black/30
                    p-8
                    transition-all
                    duration-500
                    hover:border-white/[0.13]
                    hover:shadow-violet-500/5
                ">


                    {/* Card Glow */}

                    <div className="
                        absolute
                        -top-24
                        -left-24
                        w-48
                        h-48
                        rounded-full
                        bg-violet-500/10
                        blur-3xl
                        pointer-events-none
                    " />


                    {/* ================= HEADER ================= */}

                    <div className="
                        relative
                        mb-7
                    ">

                        <p className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-violet-400
                            mb-2
                        ">
                            Get started
                        </p>

                        <h2 className="
                            text-2xl
                            font-bold
                            text-white
                        ">
                            Create your account
                        </h2>

                        <p className="
                            text-sm
                            text-slate-500
                            mt-2
                        ">
                            Set up your workspace in a few seconds.
                        </p>

                    </div>


                    {/* ================= FORM ================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="relative"
                    >


                        {/* ================= USERNAME ================= */}

                        <div className="mb-5">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-300
                                mb-2
                            ">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="username"
                                className="
                                    w-full
                                    px-4
                                    py-3.5
                                    rounded-xl
                                    bg-white/[0.04]
                                    border
                                    border-white/[0.08]
                                    text-white
                                    placeholder:text-slate-600
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:bg-white/[0.06]
                                    focus:border-violet-500/50
                                    focus:ring-4
                                    focus:ring-violet-500/10
                                    hover:border-white/[0.14]
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            />

                        </div>


                        {/* ================= EMAIL ================= */}

                        <div className="mb-5">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-300
                                mb-2
                            ">
                                Email address
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
                                    py-3.5
                                    rounded-xl
                                    bg-white/[0.04]
                                    border
                                    border-white/[0.08]
                                    text-white
                                    placeholder:text-slate-600
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:bg-white/[0.06]
                                    focus:border-violet-500/50
                                    focus:ring-4
                                    focus:ring-violet-500/10
                                    hover:border-white/[0.14]
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            />

                        </div>


                        {/* ================= PASSWORD ================= */}

                        <div className="mb-7">

                            <div className="
                                flex
                                items-center
                                justify-between
                                mb-2
                            ">

                                <label className="
                                    text-sm
                                    font-medium
                                    text-slate-300
                                ">
                                    Password
                                </label>

                                <span className="
                                    text-xs
                                    text-slate-600
                                ">
                                    Keep it secure
                                </span>

                            </div>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                autoComplete="new-password"
                                className="
                                    w-full
                                    px-4
                                    py-3.5
                                    rounded-xl
                                    bg-white/[0.04]
                                    border
                                    border-white/[0.08]
                                    text-white
                                    placeholder:text-slate-600
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:bg-white/[0.06]
                                    focus:border-violet-500/50
                                    focus:ring-4
                                    focus:ring-violet-500/10
                                    hover:border-white/[0.14]
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            />

                        </div>


                        {/* ================= REGISTER BUTTON ================= */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                group
                                relative
                                w-full
                                overflow-hidden
                                py-3.5
                                rounded-xl
                                bg-gradient-to-r
                                from-violet-600
                                via-blue-600
                                to-blue-600
                                text-white
                                font-semibold
                                shadow-lg
                                shadow-violet-500/20
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-xl
                                hover:shadow-violet-500/30
                                active:translate-y-0
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

                                        Creating account...
                                    </>

                                ) : (

                                    <>
                                        Create Account

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


                            {/* Button shine */}

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


                {/* ================= LOGIN ================= */}

                <p className="
                    text-center
                    text-sm
                    text-slate-500
                    mt-7
                ">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="
                            text-blue-400
                            font-medium
                            transition-all
                            duration-300
                            hover:text-violet-400
                            hover:underline
                            underline-offset-4
                        "
                    >
                        Sign in
                    </Link>

                </p>


                {/* ================= SECURITY TEXT ================= */}

                <div className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    mt-5
                    text-[11px]
                    text-slate-700
                ">

                    <span>◈</span>

                    <span>
                        Your account is protected by SecureTask
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Register;
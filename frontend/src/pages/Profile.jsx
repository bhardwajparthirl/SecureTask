import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const getProfile = async () => {

            try {

                const response = await api.get("/profile");

                setProfile(response.data);

            } catch (error) {

                console.error("Profile Error:", error);

                setError(
                    error.response?.data?.message ||
                    error.response?.data?.msg ||
                    "Unable to load profile"
                );
            }
        };

        getProfile();

    }, []);


    /* ================= ERROR ================= */

    if (error) {
        return (
            <div className="
                min-h-screen
                flex
                items-center
                justify-center
                p-6
            ">

                <div className="
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-500/[0.05]
                    px-6
                    py-5
                    text-red-400
                ">
                    {error}
                </div>

            </div>
        );
    }


    /* ================= LOADING ================= */

    if (!profile) {
        return (
            <div className="
                min-h-screen
                flex
                items-center
                justify-center
            ">

                <div className="text-center">

                    <div className="
                        w-10
                        h-10
                        mx-auto
                        rounded-full
                        border-2
                        border-white/[0.08]
                        border-t-blue-500
                        animate-spin
                    " />

                    <p className="
                        text-sm
                        text-slate-500
                        mt-4
                    ">
                        Loading profile...
                    </p>

                </div>

            </div>
        );
    }


    /* ================= AVATAR ================= */

    const avatarLetter =
        profile.username?.charAt(0).toUpperCase() || "U";


    return (
        <div className="
            min-h-screen
            p-6
            md:p-8
            text-white
        ">


            {/* ================= HEADER ================= */}

            <div className="mb-8">

                <p className="
                    text-sm
                    font-medium
                    text-blue-400
                    mb-2
                ">
                    ACCOUNT
                </p>

                <h1 className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    tracking-tight
                ">
                    My Profile
                </h1>

                <p className="
                    text-slate-400
                    mt-2
                ">
                    Manage your account information.
                </p>

            </div>


            {/* ================= PROFILE CARD ================= */}

            <div className="
                max-w-4xl
                rounded-3xl
                border
                border-white/[0.07]
                bg-white/[0.035]
                backdrop-blur-xl
                overflow-hidden
                shadow-2xl
                shadow-black/10
            ">


                {/* ================= PROFILE HERO ================= */}

                <div className="
                    relative
                    overflow-hidden
                    p-8
                    md:p-10
                    bg-gradient-to-br
                    from-blue-600/20
                    via-blue-500/10
                    to-violet-600/20
                    border-b
                    border-white/[0.07]
                ">

                    {/* Background Glow */}

                    <div className="
                        absolute
                        -top-32
                        -right-32
                        w-72
                        h-72
                        rounded-full
                        bg-blue-500/15
                        blur-3xl
                        pointer-events-none
                    " />

                    <div className="
                        absolute
                        -bottom-32
                        -left-32
                        w-72
                        h-72
                        rounded-full
                        bg-violet-500/10
                        blur-3xl
                        pointer-events-none
                    " />


                    <div className="
                        relative
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        gap-6
                    ">


                        {/* Avatar */}

                        <div className="
                            relative
                            w-24
                            h-24
                            shrink-0
                            rounded-3xl
                            bg-gradient-to-br
                            from-blue-500
                            to-violet-600
                            flex
                            items-center
                            justify-center
                            text-4xl
                            font-bold
                            text-white
                            shadow-xl
                            shadow-blue-500/20
                            border
                            border-white/10
                            transition-all
                            duration-500
                            hover:scale-105
                            hover:rotate-2
                            hover:shadow-blue-500/40
                        ">

                            {avatarLetter}

                            {/* Online indicator */}

                            <span className="
                                absolute
                                right-1
                                bottom-1
                                w-4
                                h-4
                                rounded-full
                                bg-emerald-400
                                border-4
                                border-[#171b2a]
                                shadow-lg
                                shadow-emerald-500/30
                            " />

                        </div>


                        {/* User Info */}

                        <div>

                            <p className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-blue-300
                                mb-2
                            ">
                                Personal Account
                            </p>

                            <h2 className="
                                text-2xl
                                md:text-3xl
                                font-bold
                                text-white
                            ">
                                {profile.username}
                            </h2>

                            <p className="
                                text-slate-400
                                mt-1
                            ">
                                {profile.email}
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= ACCOUNT INFORMATION ================= */}

                <div className="p-8 md:p-10">

                    <div className="mb-6">

                        <h3 className="
                            text-lg
                            font-semibold
                            text-white
                        ">
                            Account Information
                        </h3>

                        <p className="
                            text-sm
                            text-slate-500
                            mt-1
                        ">
                            Your registered SecureTask account details.
                        </p>

                    </div>


                    {/* Information Grid */}

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-4
                    ">


                        {/* User ID */}

                        <div className="
                            group
                            rounded-2xl
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-5
                            transition-all
                            duration-300
                            hover:bg-white/[0.05]
                            hover:border-blue-500/20
                            hover:-translate-y-0.5
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                                mb-3
                            ">

                                <p className="
                                    text-xs
                                    uppercase
                                    tracking-wider
                                    text-slate-600
                                ">
                                    User ID
                                </p>

                                <span className="
                                    text-blue-400
                                    opacity-50
                                    group-hover:opacity-100
                                    transition-opacity
                                ">
                                    #
                                </span>

                            </div>

                            <p className="
                                text-lg
                                font-semibold
                                text-slate-200
                                break-all
                            ">
                                {profile.id}
                            </p>

                        </div>


                        {/* Username */}

                        <div className="
                            group
                            rounded-2xl
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-5
                            transition-all
                            duration-300
                            hover:bg-white/[0.05]
                            hover:border-violet-500/20
                            hover:-translate-y-0.5
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                                mb-3
                            ">

                                <p className="
                                    text-xs
                                    uppercase
                                    tracking-wider
                                    text-slate-600
                                ">
                                    Username
                                </p>

                                <span className="
                                    text-violet-400
                                    opacity-50
                                    group-hover:opacity-100
                                    transition-opacity
                                ">
                                    @
                                </span>

                            </div>

                            <p className="
                                text-lg
                                font-semibold
                                text-slate-200
                                break-all
                            ">
                                {profile.username}
                            </p>

                        </div>


                        {/* Email */}

                        <div className="
                            group
                            md:col-span-2
                            rounded-2xl
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-5
                            transition-all
                            duration-300
                            hover:bg-white/[0.05]
                            hover:border-blue-500/20
                            hover:-translate-y-0.5
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                                mb-3
                            ">

                                <p className="
                                    text-xs
                                    uppercase
                                    tracking-wider
                                    text-slate-600
                                ">
                                    Email Address
                                </p>

                                <span className="
                                    text-blue-400
                                    opacity-50
                                    group-hover:opacity-100
                                    transition-opacity
                                ">
                                    @
                                </span>

                            </div>

                            <p className="
                                text-lg
                                font-semibold
                                text-slate-200
                                break-all
                            ">
                                {profile.email}
                            </p>

                        </div>

                    </div>


                    {/* Security Status */}

                    <div className="
                        mt-6
                        rounded-2xl
                        border
                        border-emerald-500/10
                        bg-emerald-500/[0.04]
                        p-5
                    ">

                        <div className="
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-emerald-500/10
                                border
                                border-emerald-500/10
                                flex
                                items-center
                                justify-center
                                text-emerald-400
                            ">
                                ✓
                            </div>

                            <div>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-emerald-400
                                ">
                                    Account authenticated
                                </p>

                                <p className="
                                    text-xs
                                    text-slate-500
                                    mt-1
                                ">
                                    Your current session is secured.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;
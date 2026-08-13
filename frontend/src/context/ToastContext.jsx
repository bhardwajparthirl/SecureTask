import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {

    const [toast, setToast] = useState(null);


    const showToast = (
        message,
        type = "success"
    ) => {

        setToast({
            message,
            type
        });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };


    /* ==========================================
       SESSION EXPIRED EVENT
    ========================================== */

    useEffect(() => {

        const handleSessionExpired = () => {

            showToast(
                "Your session has expired. Please sign in again.",
                "error"
            );

        };


        window.addEventListener(
            "auth:expired",
            handleSessionExpired
        );


        return () => {

            window.removeEventListener(
                "auth:expired",
                handleSessionExpired
            );

        };

    }, []);


    return (
        <ToastContext.Provider
            value={{
                showToast
            }}
        >

            {children}


            {/* ================= TOAST ================= */}

            {toast && (

                <div
                    className={`
                        fixed
                        top-5
                        right-5
                        z-[9999]
                        flex
                        items-center
                        gap-3
                        min-w-[280px]
                        max-w-[380px]
                        px-4
                        py-3
                        rounded-2xl
                        border
                        backdrop-blur-xl
                        shadow-2xl
                        animate-[toastIn_0.3s_ease-out]

                        ${
                            toast.type === "success"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : "bg-red-500/10 border-red-500/20 text-red-400"
                        }
                    `}
                >

                    <div
                        className={`
                            w-8
                            h-8
                            shrink-0
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            font-bold

                            ${
                                toast.type === "success"
                                    ? "bg-emerald-500/10"
                                    : "bg-red-500/10"
                            }
                        `}
                    >
                        {toast.type === "success"
                            ? "✓"
                            : "!"}
                    </div>


                    <p className="
                        text-sm
                        font-medium
                    ">
                        {toast.message}
                    </p>

                </div>

            )}

        </ToastContext.Provider>
    );
}


export function useToast() {

    const context = useContext(
        ToastContext
    );

    if (!context) {

        throw new Error(
            "useToast must be used inside ToastProvider"
        );

    }

    return context;
}
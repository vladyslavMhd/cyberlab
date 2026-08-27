/* =========================================================
   CYBERLAB — AUTH
   js/auth.js
========================================================= */

(() => {
    "use strict";

    /* =====================================================
       SUPABASE
    ===================================================== */

    const SUPABASE_URL =
        "https://zmcngtcppgmxtngrvzon.supabase.co";

    const SUPABASE_ANON_KEY =
        "sb_publishable_6VIKlQsd9SxO5jEvm0wWCg_-wgdGLLo";

    let supabaseClient = null;

    if (
        window.supabase &&
        SUPABASE_URL &&
        SUPABASE_ANON_KEY
    ) {
        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_ANON_KEY
            );
    }


    /* =====================================================
       HELPERS
    ===================================================== */

    function toast(message) {

        if (
            typeof window.showToast === "function"
        ) {

            window.showToast(message);

        } else {

            console.log(message);

        }
    }


    function getAuthModal() {

        return document.getElementById(
            "authModal"
        );

    }


    function getProfileModal() {

        return document.getElementById(
            "profileModal"
        );

    }


    function getUsername(user) {

        if (!user) {
            return "User";
        }

        return (
            user.user_metadata?.username ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "User"
        );

    }


    /* =====================================================
       AUTH MODAL
    ===================================================== */

    function openAuth(mode = "login") {

        const modal =
            getAuthModal();

        if (!modal) {

            console.error(
                "authModal not found in index.html"
            );

            return;

        }


        modal.classList.add(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );


        showAuthScreen(mode);

    }


    function closeAuth() {

        const modal =
            getAuthModal();

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =====================================================
       AUTH SCREEN
    ===================================================== */

    function showAuthScreen(
        mode = "login"
    ) {

        const modal =
            getAuthModal();

        if (!modal) {
            return;
        }


        const box =
            modal.querySelector(
                ".modal-box"
            );

        if (!box) {
            return;
        }


        if (mode === "signup") {

            renderSignup(box);

            return;

        }


        if (mode === "forgot") {

            renderForgot(box);

            return;

        }


        renderLogin(box);

    }


    /* =====================================================
       LOGIN SCREEN
    ===================================================== */

    function renderLogin(box) {

        box.innerHTML = `

            <button
                type="button"
                class="modal-close"
                data-auth-action="close"
                aria-label="Close"
            >
                ×
            </button>


            <div class="auth-header">

                <span class="section-eyebrow">
                    CYBERLAB ACCOUNT
                </span>

                <h2>
                    Welcome back.
                </h2>

                <p>
                    Sign in to continue your
                    cybersecurity journey.
                </p>

            </div>


            <form
                class="auth-form"
                data-auth-form="login"
            >

                <label for="login-email">
                    Email
                </label>

                <input
                    id="login-email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                    required
                >


                <div class="auth-label-row">

                    <label for="login-password">
                        Password
                    </label>

                    <button
                        type="button"
                        class="auth-link"
                        data-auth-action="forgot"
                    >
                        Forgot password?
                    </button>

                </div>


                <input
                    id="login-password"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    placeholder="Enter your password"
                    required
                >


                <button
                    type="submit"
                    class="btn btn-primary modal-submit"
                >
                    Log in
                    <span>→</span>
                </button>

            </form>


            <div class="auth-divider">
                <span>OR</span>
            </div>


            <button
                type="button"
                class="btn auth-google"
                data-auth-action="google"
            >

                <span class="google-icon">
                    G
                </span>

                Continue with Google

            </button>


            <div class="auth-switch">

                <span>
                    Don't have an account?
                </span>

                <button
                    type="button"
                    class="auth-link"
                    data-auth-action="signup"
                >
                    Sign up
                </button>

            </div>

        `;

    }


    /* =====================================================
       SIGN UP SCREEN
    ===================================================== */

    function renderSignup(box) {

        box.innerHTML = `

            <button
                type="button"
                class="modal-close"
                data-auth-action="close"
                aria-label="Close"
            >
                ×
            </button>


            <div class="auth-header">

                <span class="section-eyebrow">
                    JOIN CYBERLAB
                </span>

                <h2>
                    Create account.
                </h2>

                <p>
                    Start learning cybersecurity
                    and track your progress.
                </p>

            </div>


            <form
                class="auth-form"
                data-auth-form="signup"
            >

                <label for="signup-name">
                    Username
                </label>

                <input
                    id="signup-name"
                    type="text"
                    name="username"
                    autocomplete="username"
                    placeholder="CyberHunter"
                    minlength="3"
                    maxlength="30"
                    required
                >


                <label for="signup-email">
                    Email
                </label>

                <input
                    id="signup-email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                    required
                >


                <label for="signup-password">
                    Password
                </label>

                <input
                    id="signup-password"
                    type="password"
                    name="password"
                    autocomplete="new-password"
                    placeholder="Create a strong password"
                    minlength="8"
                    required
                >


                <label for="signup-confirm">
                    Confirm password
                </label>

                <input
                    id="signup-confirm"
                    type="password"
                    name="confirm"
                    autocomplete="new-password"
                    placeholder="Repeat your password"
                    minlength="8"
                    required
                >


                <button
                    type="submit"
                    class="btn btn-primary modal-submit"
                >
                    Create account
                    <span>→</span>
                </button>

            </form>


            <div class="auth-divider">
                <span>OR</span>
            </div>


            <button
                type="button"
                class="btn auth-google"
                data-auth-action="google"
            >

                <span class="google-icon">
                    G
                </span>

                Continue with Google

            </button>


            <div class="auth-switch">

                <span>
                    Already have an account?
                </span>

                <button
                    type="button"
                    class="auth-link"
                    data-auth-action="login"
                >
                    Log in
                </button>

            </div>

        `;

    }


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    function renderForgot(box) {

        box.innerHTML = `

            <button
                type="button"
                class="modal-close"
                data-auth-action="close"
                aria-label="Close"
            >
                ×
            </button>


            <div class="auth-header">

                <span class="section-eyebrow">
                    ACCOUNT RECOVERY
                </span>

                <h2>
                    Forgot password?
                </h2>

                <p>
                    Enter your email and we'll
                    send you a reset link.
                </p>

            </div>


            <form
                class="auth-form"
                data-auth-form="forgot"
            >

                <label for="forgot-email">
                    Email
                </label>

                <input
                    id="forgot-email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                    required
                >


                <button
                    type="submit"
                    class="btn btn-primary modal-submit"
                >
                    Send reset link
                    <span>→</span>
                </button>

            </form>


            <div class="auth-switch">

                <button
                    type="button"
                    class="auth-link"
                    data-auth-action="login"
                >
                    ← Back to login
                </button>

            </div>

        `;

    }


    /* =====================================================
       LOGIN
    ===================================================== */

    async function login(
        email,
        password
    ) {

        if (!supabaseClient) {

            toast(
                "Supabase is not configured."
            );

            return false;

        }


        const {
            data,
            error
        } =
            await supabaseClient.auth
                .signInWithPassword({
                    email,
                    password
                });


        if (error) {

            console.error(
                "Login error:",
                error
            );

            toast(
                error.message
            );

            return false;

        }


        toast(
            "Welcome back 🔥"
        );


        closeAuth();


        updateUserUI(
            data.user
        );


        return true;

    }


    /* =====================================================
       SIGN UP
    ===================================================== */

    async function signup(
        username,
        email,
        password
    ) {

        if (!supabaseClient) {

            toast(
                "Supabase is not configured."
            );

            return false;

        }


        const {
            data,
            error
        } =
            await supabaseClient.auth
                .signUp({

                    email,

                    password,

                    options: {

                        data: {
                            username
                        }

                    }

                });


        if (error) {

            console.error(
                "Signup error:",
                error
            );

            toast(
                error.message
            );

            return false;

        }


        if (data.session) {

            toast(
                "Account created 🔥"
            );


            closeAuth();


            updateUserUI(
                data.user
            );

        } else {

            toast(
                "Account created. Check your email to verify it."
            );


            showAuthScreen(
                "login"
            );

        }


        return true;

    }


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    async function forgotPassword(
        email
    ) {

        if (!supabaseClient) {

            toast(
                "Supabase is not configured."
            );

            return false;

        }


        const redirectURL =
            window.location.origin +
            window.location.pathname;


        const {
            error
        } =
            await supabaseClient.auth
                .resetPasswordForEmail(
                    email,
                    {
                        redirectTo:
                            redirectURL
                    }
                );


        if (error) {

            console.error(
                "Password reset error:",
                error
            );

            toast(
                error.message
            );

            return false;

        }


        toast(
            "Password reset link sent 📩"
        );


        showAuthScreen(
            "login"
        );


        return true;

    }


    /* =====================================================
       GOOGLE LOGIN
    ===================================================== */

    async function loginWithGoogle() {

        if (!supabaseClient) {

            toast(
                "Supabase is not configured."
            );

            return;

        }


        const {
            error
        } =
            await supabaseClient.auth
                .signInWithOAuth({

                    provider: "google",

                    options: {

                        redirectTo:
                            window.location.origin +
                            window.location.pathname

                    }

                });


        if (error) {

            console.error(
                "Google login error:",
                error
            );

            toast(
                error.message
            );

        }

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    async function logout() {

        if (!supabaseClient) {

            toast(
                "Supabase is not configured."
            );

            return;

        }


        const {
            error
        } =
            await supabaseClient.auth
                .signOut();


        if (error) {

            console.error(
                "Logout error:",
                error
            );

            toast(
                error.message
            );

            return;

        }


        /*
         * IMPORTANT:
         * Close profile immediately.
         */

        closeProfile();


        /*
         * Update header immediately.
         */

        updateUserUI(
            null
        );


        toast(
            "Logged out 👋"
        );

    }


    /* =====================================================
       USER UI
    ===================================================== */

    function updateUserUI(
        user
    ) {

        /*
         * SIGN IN BUTTONS
         */

        const loginButtons =
            document.querySelectorAll(
                "[data-auth-login]"
            );


        /*
         * USERNAME
         */

        const userElements =
            document.querySelectorAll(
                "[data-auth-user]"
            );


        /*
         * PROFILE
         *
         * Supports both:
         *
         * data-auth-profile
         * auth-profile
         */

        const profileButtons =
            document.querySelectorAll(
                "[data-auth-profile], [auth-profile]"
            );


        /*
         * LOGOUT
         */

        const logoutButtons =
            document.querySelectorAll(
                "[data-auth-logout]"
            );


        /* =================================================
           LOGGED OUT
        ================================================= */

        if (!user) {

            loginButtons.forEach(
                element => {

                    element.hidden = false;

                }
            );


            profileButtons.forEach(
                element => {

                    element.hidden = true;

                }
            );


            userElements.forEach(
                element => {

                    element.hidden = true;

                    element.textContent =
                        "Guest";

                }
            );


            logoutButtons.forEach(
                element => {

                    element.hidden = true;

                }
            );


            return;

        }


        /* =================================================
           LOGGED IN
        ================================================= */

        const username =
            getUsername(user);


        loginButtons.forEach(
            element => {

                element.hidden = true;

            }
        );


        profileButtons.forEach(
            element => {

                element.hidden = false;

            }
        );


        userElements.forEach(
            element => {

                element.hidden = false;

                element.textContent =
                    username;

            }
        );


        logoutButtons.forEach(
            element => {

                element.hidden = false;

            }
        );


        /*
         * Avatar
         */

        document
            .querySelectorAll(
                ".user-avatar, .profile-avatar"
            )
            .forEach(
                avatar => {

                    avatar.textContent =
                        username
                            .charAt(0)
                            .toUpperCase();

                }
            );


        updateProfileUI(
            user
        );

    }


    /* =====================================================
       PROFILE UI
    ===================================================== */

    function updateProfileUI(
        user = null
    ) {

        const name =
            document.querySelector(
                "[data-profile-name]"
            );


        const xpElement =
            document.querySelector(
                "[data-profile-xp]"
            );


        const levelElement =
            document.querySelector(
                "[data-profile-level]"
            );


        const completedElement =
            document.querySelector(
                "[data-profile-completed]"
            );


        const username =
            getUsername(user);


        const xp =
            Number(
                localStorage.getItem(
                    "cyberlab_xp"
                )
            ) || 0;


        let completed = [];


        try {

            completed =
                JSON.parse(
                    localStorage.getItem(
                        "cyberlab_completed_labs"
                    )
                ) || [];

        } catch {

            completed = [];

        }


        const level =
            Math.floor(
                xp / 500
            ) + 1;


        if (name) {

            name.textContent =
                username;

        }


        if (xpElement) {

            xpElement.textContent =
                xp;

        }


        if (levelElement) {

            levelElement.textContent =
                level;

        }


        if (completedElement) {

            completedElement.textContent =
                completed.length;

        }

    }


    /* =====================================================
       OPEN PROFILE
    ===================================================== */

    async function openProfile() {

        const modal =
            getProfileModal();


        if (!modal) {

            console.error(
                "profileModal not found."
            );

            return;

        }


        /*
         * Get current logged-in user.
         */

        let user = null;


        if (supabaseClient) {

            const {
                data
            } =
                await supabaseClient.auth
                    .getUser();


            user =
                data?.user || null;

        }


        /*
         * Don't open profile
         * if user is logged out.
         */

        if (!user) {

            return;

        }


        updateProfileUI(
            user
        );


        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

    }


    /* =====================================================
       CLOSE PROFILE
    ===================================================== */

    function closeProfile() {

        const modal =
            getProfileModal();


        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =====================================================
       SESSION
    ===================================================== */

    async function checkSession() {

        if (!supabaseClient) {

            updateUserUI(
                null
            );

            return;

        }


        const {
            data,
            error
        } =
            await supabaseClient.auth
                .getSession();


        if (error) {

            console.error(
                "Session error:",
                error
            );

            updateUserUI(
                null
            );

            return;

        }


        updateUserUI(
            data.session?.user || null
        );


        /*
         * Supabase auth listener
         */

        supabaseClient.auth
            .onAuthStateChange(
                (_event, session) => {

                    updateUserUI(
                        session?.user || null
                    );

                }
            );

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function setupEvents() {

        /* =================================================
           ALL AUTH CLICKS
        ================================================= */

        document.addEventListener(
            "click",
            async event => {

                /*
                 * PROFILE BUTTON
                 */

                const profile =
                    event.target.closest(
                        "[data-auth-profile], [auth-profile]"
                    );


                if (profile) {

                    event.preventDefault();

                    await openProfile();

                    return;

                }


                /*
                 * LOGOUT BUTTON
                 *
                 * THIS IS THE IMPORTANT FIX.
                 */

                const logoutButton =
                    event.target.closest(
                        "[data-auth-logout]"
                    );


                if (logoutButton) {

                    event.preventDefault();

                    await logout();

                    return;

                }


                /*
                 * OTHER AUTH ACTIONS
                 */

                const action =
                    event.target.closest(
                        "[data-auth-action]"
                    );


                if (!action) {
                    return;
                }


                const value =
                    action.dataset.authAction;


                switch (value) {

                    case "close":

                        closeAuth();
                        closeProfile();

                        break;


                    case "login":

                        closeProfile();

                        openAuth(
                            "login"
                        );

                        break;


                    case "signup":

                        closeProfile();

                        openAuth(
                            "signup"
                        );

                        break;


                    case "forgot":

                        openAuth(
                            "forgot"
                        );

                        break;


                    case "google":

                        await loginWithGoogle();

                        break;

                }

            }
        );


        /* =================================================
           AUTH FORMS
        ================================================= */

        document.addEventListener(
            "submit",
            async event => {

                const form =
                    event.target.closest(
                        "[data-auth-form]"
                    );


                if (!form) {
                    return;
                }


                event.preventDefault();


                const type =
                    form.dataset.authForm;


                const submit =
                    form.querySelector(
                        "button[type='submit']"
                    );


                if (submit) {

                    submit.disabled =
                        true;

                }


                try {

                    /* -------------------------------------
                       LOGIN
                    ------------------------------------- */

                    if (
                        type === "login"
                    ) {

                        const email =
                            form.elements
                                .email
                                .value
                                .trim();


                        const password =
                            form.elements
                                .password
                                .value;


                        await login(
                            email,
                            password
                        );

                    }


                    /* -------------------------------------
                       SIGN UP
                    ------------------------------------- */

                    else if (
                        type === "signup"
                    ) {

                        const username =
                            form.elements
                                .username
                                .value
                                .trim();


                        const email =
                            form.elements
                                .email
                                .value
                                .trim();


                        const password =
                            form.elements
                                .password
                                .value;


                        const confirm =
                            form.elements
                                .confirm
                                .value;


                        if (
                            password !==
                            confirm
                        ) {

                            toast(
                                "Passwords do not match."
                            );

                            return;

                        }


                        await signup(
                            username,
                            email,
                            password
                        );

                    }


                    /* -------------------------------------
                       FORGOT PASSWORD
                    ------------------------------------- */

                    else if (
                        type === "forgot"
                    ) {

                        const email =
                            form.elements
                                .email
                                .value
                                .trim();


                        await forgotPassword(
                            email
                        );

                    }

                } catch (error) {

                    console.error(
                        "Auth error:",
                        error
                    );


                    toast(
                        "Something went wrong."
                    );

                } finally {

                    if (submit) {

                        submit.disabled =
                            false;

                    }

                }

            }
        );


        /* =================================================
           ESCAPE
        ================================================= */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !==
                    "Escape"
                ) {

                    return;

                }


                closeAuth();

                closeProfile();

            }
        );


        /* =================================================
           OVERLAY
        ================================================= */

        document.addEventListener(
            "click",
            event => {

                if (
                    event.target.matches(
                        "#authModal .modal-overlay"
                    )
                ) {

                    closeAuth();

                }


                if (
                    event.target.matches(
                        "#profileModal .modal-overlay"
                    )
                ) {

                    closeProfile();

                }

            }
        );

    }


    /* =====================================================
       INIT
    ===================================================== */

    function init() {

        setupEvents();

        checkSession();

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.CyberLabAuth = {

        init,

        open: openAuth,

        close: closeAuth,

        profile: openProfile,

        closeProfile,

        login,

        signup,

        forgotPassword,

        google:
            loginWithGoogle,

        logout,

        getClient:
            () =>
                supabaseClient

    };


    /* =====================================================
       START
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
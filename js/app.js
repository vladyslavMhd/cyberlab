/* =========================================================
   CYBERLAB — APP.JS
   Main application controller
========================================================= */

"use strict";


/* =========================================================
   CYBERLAB APP
========================================================= */

const CyberLab = {

    /* -----------------------------------------------------
       STATE
    ----------------------------------------------------- */

    state: {
        currentSection: "home",
        theme: "dark",
        initialized: false
    },


    /* -----------------------------------------------------
       INIT
    ----------------------------------------------------- */

    init() {

        if (this.state.initialized) {
            return;
        }

        this.setupNavigation();
        this.setupScrollSpy();
        this.setupMobileMenu();
        this.setupModalSystem();
        this.setupGlobalActions();
        this.setupSmoothScrolling();

        this.state.initialized = true;

        document.body.classList.add("app-ready");

        console.log("CyberLab initialized.");
    },


    /* =====================================================
       NAVIGATION
    ===================================================== */

    setupNavigation() {

        const navLinks = document.querySelectorAll(
            'a[href^="#"]'
        );

        navLinks.forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

    },


    /* =====================================================
       SCROLL SPY
    ===================================================== */

    setupScrollSpy() {

        const sections =
            document.querySelectorAll(
                "main section[id]"
            );

        const navLinks =
            document.querySelectorAll(
                ".nav-link"
            );

        if (!sections.length) {
            return;
        }

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        this.state.currentSection =
                            entry.target.id;

                        navLinks.forEach(link => {

                            const href =
                                link.getAttribute("href");

                            link.classList.toggle(
                                "active",
                                href ===
                                `#${entry.target.id}`
                            );

                        });

                    });

                },
                {
                    rootMargin: "-35% 0px -55% 0px",
                    threshold: 0
                }
            );

        sections.forEach(section => {
            observer.observe(section);
        });

    },


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    setupMobileMenu() {

        const button =
            document.getElementById(
                "mobileMenuButton"
            );

        const menu =
            document.getElementById(
                "mobileNav"
            );

        if (!button || !menu) {
            return;
        }

        button.addEventListener(
            "click",
            () => {

                const isOpen =
                    menu.classList.toggle("active");

                button.classList.toggle(
                    "active",
                    isOpen
                );

                button.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

            }
        );


        const links =
            menu.querySelectorAll(
                "a, button"
            );

        links.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove(
                        "active"
                    );

                    button.classList.remove(
                        "active"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        });

    },


    /* =====================================================
       MODALS
    ===================================================== */

    setupModalSystem() {

        const modals =
            document.querySelectorAll(
                "[data-modal]"
            );

        if (!modals.length) {
            return;
        }


        document.addEventListener(
            "click",
            event => {

                const closeButton =
                    event.target.closest(
                        "[data-action='close-modal'], [data-auth-close], [data-game-close]"
                    );

                if (closeButton) {

                    const modal =
                        closeButton.closest(
                            ".modal"
                        );

                    if (modal) {
                        this.closeModal(modal);
                    }

                    return;
                }


                if (
                    event.target.classList.contains(
                        "modal"
                    )
                ) {

                    this.closeModal(
                        event.target
                    );

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (event.key !== "Escape") {
                    return;
                }

                const openModal =
                    document.querySelector(
                        ".modal.active"
                    );

                if (openModal) {
                    this.closeModal(openModal);
                }

            }
        );

    },


    openModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.add("active");

        document.body.classList.add(
            "modal-open"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

    },


    closeModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        const otherModal =
            document.querySelector(
                ".modal.active"
            );

        if (!otherModal) {
            document.body.classList.remove(
                "modal-open"
            );
        }

    },


    closeAllModals() {

        document
            .querySelectorAll(".modal.active")
            .forEach(modal => {

                this.closeModal(modal);

            });

    },


    /* =====================================================
       GLOBAL ACTIONS
    ===================================================== */

    setupGlobalActions() {

        document.addEventListener(
            "click",
            event => {

                const action =
                    event.target.closest(
                        "[data-action]"
                    );

                if (!action) {
                    return;
                }

                const actionName =
                    action.dataset.action;

                this.handleAction(
                    actionName,
                    action
                );

            }
        );

    },


    handleAction(action, element) {

        switch (action) {

            case "close-modal":
                this.closeModal(
                    element.closest(".modal")
                );
                break;


            case "scroll-top":
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                break;


            default:
                console.warn(
                    `Unknown CyberLab action: ${action}`
                );

        }

    },


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    setupSmoothScrolling() {

        document.documentElement.style.scrollBehavior =
            "smooth";

    },


    /* =====================================================
       TOAST
    ===================================================== */

    toast(message, type = "info") {

        const container =
            document.getElementById(
                "toastContainer"
            );

        if (!container) {
            return;
        }

        const toast =
            document.createElement("div");

        toast.className =
            `toast toast-${type}`;

        toast.setAttribute(
            "role",
            "status"
        );

        toast.innerHTML = `
            <span class="toast-message">
                ${this.escapeHTML(message)}
            </span>

            <button
                class="toast-close"
                type="button"
                aria-label="Close notification"
            >
                ×
            </button>
        `;


        container.appendChild(toast);


        requestAnimationFrame(() => {

            toast.classList.add("show");

        });


        const removeToast = () => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        };


        toast
            .querySelector(".toast-close")
            ?.addEventListener(
                "click",
                removeToast
            );


        setTimeout(
            removeToast,
            4500
        );

    },


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            String(value ?? "");

        return div.innerHTML;

    },


    /* =====================================================
       DEBOUNCE
    ===================================================== */

    debounce(callback, delay = 300) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(
                () => callback(...args),
                delay
            );

        };

    },


    /* =====================================================
       LOCAL STORAGE HELPERS
    ===================================================== */

    getStorage(key, fallback = null) {

        try {

            const value =
                localStorage.getItem(key);

            if (value === null) {
                return fallback;
            }

            return JSON.parse(value);

        } catch (error) {

            console.warn(
                "CyberLab storage read error:",
                error
            );

            return fallback;

        }

    },


    setStorage(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.warn(
                "CyberLab storage write error:",
                error
            );

            return false;

        }

    },


    removeStorage(key) {

        try {

            localStorage.removeItem(key);

            return true;

        } catch (error) {

            console.warn(
                "CyberLab storage remove error:",
                error
            );

            return false;

        }

    },


    /* =====================================================
       DEVICE CHECK
    ===================================================== */

    isMobile() {

        return window.matchMedia(
            "(max-width: 700px)"
        ).matches;

    },


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    prefersReducedMotion() {

        return window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    }

};


/* =========================================================
   GLOBAL ACCESS
========================================================= */

window.CyberLab = CyberLab;


/* =========================================================
   START APP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        CyberLab.init();

    }
);
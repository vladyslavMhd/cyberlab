/* =========================================================
   CYBERLAB — LABS
   js/labs.js
========================================================= */

(() => {
    "use strict";

    let currentFilter = "all";
    let currentSearch = "";

    const container = document.querySelector("[data-labs-container]");
    const searchInput = document.querySelector("[data-lab-search]");
    const filterButtons = document.querySelectorAll("[data-lab-filter]");


    /* =====================================================
       DATA
    ===================================================== */

    function getLabs() {
        if (
            typeof window.cyberLabData !== "undefined" &&
            Array.isArray(window.cyberLabData.labs)
        ) {
            return window.cyberLabData.labs;
        }

        if (Array.isArray(window.labs)) {
            return window.labs;
        }

        return [];
    }


    /* =====================================================
       HELPERS
    ===================================================== */

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function normalize(value) {
        return String(value ?? "")
            .toLowerCase()
            .trim();
    }


    function normalizeAnswer(value) {
        return normalize(value)
            .replace(/\s+/g, " ")
            .replace(/`/g, "")
            .replace(/\.$/, "");
    }


    function difficultyClass(difficulty) {
        switch (normalize(difficulty)) {
            case "easy":
                return "difficulty-easy";

            case "medium":
                return "difficulty-medium";

            case "hard":
                return "difficulty-hard";

            case "expert":
                return "difficulty-expert";

            default:
                return "";
        }
    }


    function difficultyLabel(difficulty) {
        if (!difficulty) {
            return "Beginner";
        }

        const value = String(difficulty);

        return value.charAt(0).toUpperCase() +
            value.slice(1);
    }


    function getLabId(lab, index) {
        return String(
            lab.id ??
            lab.slug ??
            `lab-${index + 1}`
        );
    }


    function getCategoryIcon(category) {
        const value = normalize(category);

        const icons = {
            network: "⌁",
            web: "</>",
            linux: "◈",
            crypto: "#",
            cryptography: "#",
            forensics: "⌕",
            osint: "◎",
            malware: "⚠",
            security: "◆"
        };

        return icons[value] || "◆";
    }


    /* =====================================================
       COMPLETED LABS
    ===================================================== */

    function getCompletedLabs() {
        try {
            return JSON.parse(
                localStorage.getItem(
                    "cyberlab_completed_labs"
                )
            ) || [];
        } catch {
            return [];
        }
    }


    function isLabCompleted(id) {
        return getCompletedLabs()
            .includes(String(id));
    }


    /* =====================================================
       FILTER + SEARCH
    ===================================================== */

    function getFilteredLabs() {
        const labs = getLabs();

        return labs.filter(lab => {

            const category = normalize(
                lab.category ||
                lab.type ||
                lab.topic
            );

            const title = normalize(lab.title);

            const description = normalize(
                lab.description
            );

            const tags = Array.isArray(lab.tags)
                ? lab.tags.map(normalize).join(" ")
                : normalize(lab.tags);

            const searchContent =
                `${title} ${description} ${category} ${tags}`;

            const matchesFilter =
                currentFilter === "all" ||
                category === normalize(currentFilter);

            const matchesSearch =
                currentSearch === "" ||
                searchContent.includes(
                    normalize(currentSearch)
                );

            return matchesFilter && matchesSearch;
        });
    }


    /* =====================================================
       RENDER LABS
    ===================================================== */

    function renderLabs() {

        if (!container) {
            return;
        }

        const labs = getFilteredLabs();

        if (!labs.length) {

            container.innerHTML = `
                <div class="empty-state">

                    <div class="empty-state-icon">
                        ⌕
                    </div>

                    <h3>
                        No labs found
                    </h3>

                    <p>
                        Try another category or search term.
                    </p>

                </div>
            `;

            return;
        }


        container.innerHTML = labs.map((lab, index) => {

            const id = getLabId(lab, index);

            const title = escapeHTML(
                lab.title ||
                `Cyber Lab ${index + 1}`
            );

            const description = escapeHTML(
                lab.description ||
                "Practice cybersecurity skills in an interactive lab."
            );

            const category = escapeHTML(
                lab.category ||
                lab.type ||
                "General"
            );

            const difficulty =
                lab.difficulty || "Beginner";

            const xp =
                lab.xp ??
                lab.points ??
                100;

            const duration =
                lab.duration ||
                lab.time ||
                "10 min";

            const icon =
                lab.icon ||
                getCategoryIcon(category);

            const completed =
                isLabCompleted(id);


            return `
                <article
                    class="lab-card ${completed ? "completed" : ""}"
                    data-lab-id="${escapeHTML(id)}"
                >

                    <div class="lab-card-header">

                        <div class="lab-icon">
                            ${escapeHTML(icon)}
                        </div>

                        <span class="lab-difficulty ${difficultyClass(difficulty)}">
                            ${escapeHTML(
                                difficultyLabel(difficulty)
                            )}
                        </span>

                    </div>


                    <span class="lab-category">
                        ${category}
                    </span>


                    <h3 class="lab-title">
                        ${title}
                    </h3>


                    <p class="lab-description">
                        ${description}
                    </p>


                    <div class="lab-meta">

                        <span>
                            ◷ ${escapeHTML(duration)}
                        </span>

                        <span>
                            +${escapeHTML(xp)} XP
                        </span>

                    </div>


                    <div class="lab-card-footer">

                        <span class="lab-status">

                            <span class="status-dot"></span>

                            ${completed
                                ? "Completed"
                                : "Ready"}

                        </span>


                        <button
                            class="btn btn-small lab-start"
                            data-action="open-lab"
                            data-lab-id="${escapeHTML(id)}"
                        >
                            ${completed
                                ? "Review Lab"
                                : "Start Lab"}

                            <span>→</span>

                        </button>

                    </div>

                </article>
            `;
        }).join("");
    }


    /* =====================================================
       OPEN LAB
    ===================================================== */

    function openLab(id) {

        const labs = getLabs();

        const lab = labs.find(item =>
            String(
                item.id ??
                item.slug
            ) === String(id)
        );

        if (!lab) {
            showMessage("Lab not found.");
            return;
        }


        const modal =
            document.getElementById(
                "challengeModal"
            );

        if (!modal) {
            showMessage(
                "Lab interface is unavailable."
            );
            return;
        }


        const box =
            modal.querySelector(".modal-box");

        if (!box) {
            return;
        }


        const title = escapeHTML(
            lab.title ||
            "Cybersecurity Lab"
        );

        const description = escapeHTML(
            lab.description ||
            "Complete this interactive cybersecurity lab."
        );

        const category = escapeHTML(
            lab.category ||
            "General"
        );

        const difficulty = escapeHTML(
            difficultyLabel(
                lab.difficulty
            )
        );

        const xp =
            lab.xp ??
            lab.points ??
            100;

        const duration = escapeHTML(
            lab.duration ||
            lab.time ||
            "10 min"
        );

        const instructions = escapeHTML(
            lab.instructions ||
            lab.objective ||
            "Complete the objective below."
        );


        const question = escapeHTML(
            lab.question ||
            lab.task ||
            "Complete the task described above."
        );


        const completed =
            isLabCompleted(id);


        box.innerHTML = `

            <button
                class="modal-close"
                data-action="close-lab"
                aria-label="Close"
            >
                ×
            </button>


            <div class="lab-modal-content">


                <!-- META -->

                <div class="lab-modal-meta">

                    <span>
                        ${category}
                    </span>

                    <span>
                        ${difficulty}
                    </span>

                    <span>
                        ${duration}
                    </span>

                    <span>
                        +${escapeHTML(xp)} XP
                    </span>

                </div>


                <!-- TITLE -->

                <h2>
                    ${title}
                </h2>


                <p class="lab-modal-description">
                    ${description}
                </p>


                <!-- OBJECTIVE -->

                <div class="lab-info-box">

                    <span class="tool-label">
                        OBJECTIVE
                    </span>

                    <p>
                        ${instructions}
                    </p>

                </div>


                <!-- QUESTION -->

                <div class="lab-question-box">

                    <span class="tool-label">
                        QUESTION
                    </span>

                    <h3>
                        ${question}
                    </h3>

                </div>


                <!-- ANSWER -->

                <div class="lab-workspace">

                    <span class="tool-label">
                        YOUR ANSWER
                    </span>

                    <textarea
                        data-lab-answer
                        rows="6"
                        placeholder="Type your answer here..."
                        ${completed ? "disabled" : ""}
                    ></textarea>

                </div>


                <!-- ACTION -->

                <div class="lab-modal-actions">

                    ${
                        completed

                        ? `
                            <button
                                class="btn btn-secondary"
                                disabled
                            >
                                ✓ Already Completed
                            </button>
                        `

                        : `
                            <button
                                class="btn btn-primary"
                                data-action="complete-lab"
                                data-lab-id="${escapeHTML(id)}"
                            >
                                Check Answer
                                <span>→</span>
                            </button>
                        `
                    }

                </div>


                <!-- RESULT -->

                <div
                    class="lab-result"
                    data-lab-result
                    hidden
                ></div>


            </div>
        `;


        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );
    }


    /* =====================================================
       CHECK ANSWER
    ===================================================== */

    function completeLab(id) {

        const labs = getLabs();

        const lab = labs.find(item =>
            String(
                item.id ??
                item.slug
            ) === String(id)
        );

        if (!lab) {
            return;
        }


        /* Already completed */

        if (isLabCompleted(id)) {

            showMessage(
                "You already completed this lab."
            );

            return;
        }


        const answerInput =
            document.querySelector(
                "[data-lab-answer]"
            );

        const result =
            document.querySelector(
                "[data-lab-result]"
            );


        if (!answerInput) {
            return;
        }


        const userAnswer =
            normalizeAnswer(
                answerInput.value
            );


        if (!userAnswer) {

            showResult(
                result,
                false,
                "Please enter an answer first."
            );

            return;
        }


        /* =================================================
           CORRECT ANSWERS
        ================================================= */

        let correctAnswers =
            lab.answers ||
            lab.correctAnswers ||
            lab.answer;


        if (!Array.isArray(correctAnswers)) {
            correctAnswers = [
                correctAnswers
            ];
        }


        correctAnswers = correctAnswers
            .filter(Boolean)
            .map(normalizeAnswer);


        const isCorrect =
            correctAnswers.includes(
                userAnswer
            );


        /* =================================================
           WRONG ANSWER
        ================================================= */

        if (!isCorrect) {

            showResult(
                result,
                false,
                "Incorrect answer. Try again."
            );

            if (
                typeof window.showToast ===
                "function"
            ) {

                window.showToast(
                    "Incorrect answer ❌"
                );
            }

            return;
        }


        /* =================================================
           CORRECT
        ================================================= */

        const xp =
            Number(
                lab.xp ??
                lab.points ??
                100
            );


        saveCompletedLab(id);

        addXP(xp);


        showResult(
            result,
            true,
            `Correct! You earned +${xp} XP.`
        );


        answerInput.disabled = true;


        const completeButton =
            document.querySelector(
                "[data-action='complete-lab']"
            );


        if (completeButton) {

            completeButton.disabled = true;

            completeButton.innerHTML =
                `✓ Completed`;
        }


        const card =
            document.querySelector(
                `.lab-card[data-lab-id="${CSS.escape(String(id))}"]`
            );


        if (card) {

            card.classList.add(
                "completed"
            );

            const status =
                card.querySelector(
                    ".lab-status"
                );

            if (status) {

                status.innerHTML = `
                    <span class="status-dot"></span>
                    Completed
                `;
            }
        }


        document.dispatchEvent(
            new CustomEvent(
                "cyberlab:lab-completed",
                {
                    detail: {
                        lab,
                        xp
                    }
                }
            )
        );


        if (
            typeof window.showToast ===
            "function"
        ) {

            window.showToast(
                `Correct! +${xp} XP 🔥`
            );
        }
    }


    /* =====================================================
       RESULT
    ===================================================== */

    function showResult(
        result,
        success,
        message
    ) {

        if (!result) {
            return;
        }


        result.hidden = false;

        result.className =
            success
                ? "lab-result success"
                : "lab-result error";


        result.innerHTML = `

            <strong>
                ${success ? "✓ Correct!" : "✕ Not quite"}
            </strong>

            <p>
                ${escapeHTML(message)}
            </p>

        `;
    }


    /* =====================================================
       STORAGE
    ===================================================== */

    function saveCompletedLab(id) {

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


        const value = String(id);


        if (!completed.includes(value)) {

            completed.push(value);

            localStorage.setItem(
                "cyberlab_completed_labs",
                JSON.stringify(
                    completed
                )
            );
        }
    }


    /* =====================================================
       XP
    ===================================================== */

    function addXP(amount) {

        try {

            const current =
                Number(
                    localStorage.getItem(
                        "cyberlab_xp"
                    )
                ) || 0;

            localStorage.setItem(
                "cyberlab_xp",
                String(
                    current + amount
                )
            );

        } catch {
            // Ignore storage errors.
        }
    }


    /* =====================================================
       CLOSE LAB
    ===================================================== */

    function closeLab() {

        const modal =
            document.getElementById(
                "challengeModal"
            );

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
       MESSAGE
    ===================================================== */

    function showMessage(message) {

        if (
            typeof window.showToast ===
            "function"
        ) {

            window.showToast(message);

        } else {

            console.warn(message);
        }
    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function setupEvents() {

        /* FILTERS */

        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    filterButtons.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );

                    button.classList.add(
                        "active"
                    );

                    currentFilter =
                        button.dataset
                            .labFilter ||
                        "all";

                    renderLabs();
                }
            );
        });


        /* SEARCH */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                event => {

                    currentSearch =
                        event.target.value;

                    renderLabs();
                }
            );
        }


        /* BUTTONS */

        document.addEventListener(
            "click",
            event => {

                const startButton =
                    event.target.closest(
                        "[data-action='open-lab']"
                    );


                if (startButton) {

                    openLab(
                        startButton.dataset
                            .labId
                    );

                    return;
                }


                const completeButton =
                    event.target.closest(
                        "[data-action='complete-lab']"
                    );


                if (completeButton) {

                    completeLab(
                        completeButton.dataset
                            .labId
                    );

                    return;
                }


                const closeButton =
                    event.target.closest(
                        "[data-action='close-lab']"
                    );


                if (closeButton) {

                    closeLab();

                    return;
                }
            }
        );


        /* ESC */

        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {
                    closeLab();
                }

            }
        );
    }


    /* =====================================================
       INIT
    ===================================================== */

    function init() {

        setupEvents();

        renderLabs();
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.CyberLabLabs = {

        init,

        render: renderLabs,

        open: openLab,

        close: closeLab,

        complete: completeLab,

        getAll: getLabs,

        getCompleted: getCompletedLabs
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
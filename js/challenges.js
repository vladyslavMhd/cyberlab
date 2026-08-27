/* =========================================================
   CYBERLAB — CHALLENGES
   js/challenges.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.querySelector("[data-challenges-container]");

    const searchInput =
        document.querySelector("[data-challenge-search]");

    const filterButtons =
        document.querySelectorAll("[data-challenge-filter]");

    const modal =
        document.getElementById("challengeModal");

    if (!container) {
        return;
    }

    /* -----------------------------------------------------
       STATE
    ----------------------------------------------------- */

    let currentFilter = "all";
    let searchQuery = "";

    /* -----------------------------------------------------
       GET CHALLENGES
    ----------------------------------------------------- */

    function getChallenges() {

        if (
            typeof window.cyberLabData !== "undefined" &&
            Array.isArray(window.cyberLabData.challenges)
        ) {
            return window.cyberLabData.challenges;
        }

        if (
            typeof window.challenges !== "undefined" &&
            Array.isArray(window.challenges)
        ) {
            return window.challenges;
        }

        return [];
    }

    /* -----------------------------------------------------
       FILTER
    ----------------------------------------------------- */

    function getFilteredChallenges() {

        const challenges = getChallenges();

        return challenges.filter(challenge => {

            const category =
                String(
                    challenge.category ||
                    challenge.type ||
                    ""
                ).toLowerCase();

            const title =
                String(
                    challenge.title ||
                    challenge.name ||
                    ""
                ).toLowerCase();

            const description =
                String(
                    challenge.description ||
                    challenge.desc ||
                    ""
                ).toLowerCase();

            const searchText =
                `${title} ${description} ${category}`;

            const matchesFilter =
                currentFilter === "all" ||
                category === currentFilter;

            const matchesSearch =
                searchQuery === "" ||
                searchText.includes(searchQuery);

            return matchesFilter && matchesSearch;

        });

    }

    /* -----------------------------------------------------
       ESCAPE HTML
    ----------------------------------------------------- */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

    /* -----------------------------------------------------
       DIFFICULTY
    ----------------------------------------------------- */

    function getDifficultyClass(difficulty) {

        const value =
            String(difficulty || "easy")
                .toLowerCase();

        if (value.includes("hard")) {
            return "hard";
        }

        if (
            value.includes("medium") ||
            value.includes("intermediate")
        ) {
            return "medium";
        }

        return "easy";
    }

    /* -----------------------------------------------------
       RENDER
    ----------------------------------------------------- */

    function renderChallenges() {

        const challenges =
            getFilteredChallenges();

        if (challenges.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⌕</div>

                    <h3>No challenges found</h3>

                    <p>
                        Try another search or category.
                    </p>
                </div>
            `;

            return;
        }

        container.innerHTML =
            challenges
                .map((challenge, index) =>
                    createChallengeCard(
                        challenge,
                        index
                    )
                )
                .join("");

        attachChallengeEvents();

    }

    /* -----------------------------------------------------
       CARD
    ----------------------------------------------------- */

    function createChallengeCard(challenge, index) {

        const id =
            challenge.id ??
            `challenge-${index + 1}`;

        const title =
            challenge.title ||
            challenge.name ||
            "Untitled Challenge";

        const description =
            challenge.description ||
            challenge.desc ||
            "Test your cybersecurity knowledge.";

        const category =
            challenge.category ||
            challenge.type ||
            "General";

        const difficulty =
            challenge.difficulty ||
            "Easy";

        const points =
            challenge.points ??
            challenge.xp ??
            100;

        const difficultyClass =
            getDifficultyClass(difficulty);

        return `
            <article
                class="challenge-card"
                data-challenge-id="${escapeHTML(id)}"
            >

                <div class="challenge-card-top">

                    <span class="challenge-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <span class="challenge-category">
                        ${escapeHTML(category)}
                    </span>

                </div>


                <div class="challenge-card-content">

                    <h3>
                        ${escapeHTML(title)}
                    </h3>

                    <p>
                        ${escapeHTML(description)}
                    </p>

                </div>


                <div class="challenge-card-meta">

                    <span
                        class="challenge-difficulty ${difficultyClass}"
                    >
                        ${escapeHTML(difficulty)}
                    </span>

                    <span class="challenge-xp">
                        +${escapeHTML(points)} XP
                    </span>

                </div>


                <button
                    class="btn challenge-start"
                    type="button"
                    data-start-challenge="${escapeHTML(id)}"
                >
                    Start Challenge
                    <span>→</span>
                </button>

            </article>
        `;

    }

    /* -----------------------------------------------------
       EVENTS
    ----------------------------------------------------- */

    function attachChallengeEvents() {

        const buttons =
            container.querySelectorAll(
                "[data-start-challenge]"
            );

        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.startChallenge;

                    openChallenge(id);

                }
            );

        });

    }

    /* -----------------------------------------------------
       OPEN CHALLENGE
    ----------------------------------------------------- */

    function openChallenge(id) {

        const challenges =
            getChallenges();

        const challenge =
            challenges.find(
                item =>
                    String(item.id) === String(id)
            );

        if (!challenge) {

            showToast(
                "Challenge not found.",
                "error"
            );

            return;
        }

        if (!modal) {
            return;
        }

        const modalBox =
            modal.querySelector(".modal-box");

        if (!modalBox) {
            return;
        }

        const title =
            challenge.title ||
            challenge.name ||
            "Challenge";

        const description =
            challenge.description ||
            challenge.desc ||
            "";

        const question =
            challenge.question ||
            challenge.task ||
            "Complete the challenge.";

        const points =
            challenge.points ??
            challenge.xp ??
            100;

        const answer =
            challenge.answer ||
            challenge.correctAnswer ||
            "";

        modalBox.innerHTML = `

            <button
                class="modal-close"
                data-action="close-modal"
                aria-label="Close"
            >
                ×
            </button>


            <div class="challenge-modal-content">

                <span class="section-eyebrow">
                    CYBERLAB / CHALLENGE
                </span>

                <h2>
                    ${escapeHTML(title)}
                </h2>

                <p class="challenge-modal-description">
                    ${escapeHTML(description)}
                </p>


                <div class="challenge-question">

                    <span class="challenge-question-label">
                        TASK
                    </span>

                    <p>
                        ${escapeHTML(question)}
                    </p>

                </div>


                <div class="challenge-answer">

                    <label for="challengeAnswer">
                        Your answer
                    </label>

                    <textarea
                        id="challengeAnswer"
                        placeholder="Enter your answer..."
                        rows="5"
                        data-challenge-answer
                    ></textarea>

                </div>


                <div class="challenge-modal-footer">

                    <span>
                        Reward: +${escapeHTML(points)} XP
                    </span>

                    <button
                        class="btn btn-primary"
                        type="button"
                        data-submit-challenge
                    >
                        Submit Answer
                        <span>→</span>
                    </button>

                </div>

                <div
                    class="challenge-result"
                    data-challenge-result
                    hidden
                ></div>

            </div>
        `;

        modal.classList.add("active");
        document.body.classList.add("modal-open");

        const closeButton =
            modal.querySelector(
                '[data-action="close-modal"]'
            );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeChallenge
            );

        }

        const submitButton =
            modal.querySelector(
                "[data-submit-challenge]"
            );

        if (submitButton) {

            submitButton.addEventListener(
                "click",
                () => {

                    submitChallenge(
                        challenge
                    );

                }
            );

        }

    }

    /* -----------------------------------------------------
       SUBMIT
    ----------------------------------------------------- */

    function submitChallenge(challenge) {

        const input =
            modal.querySelector(
                "[data-challenge-answer]"
            );

        const result =
            modal.querySelector(
                "[data-challenge-result]"
            );

        if (!input || !result) {
            return;
        }

        const userAnswer =
            input.value.trim();

        if (!userAnswer) {

            result.hidden = false;

            result.className =
                "challenge-result error";

            result.textContent =
                "Enter an answer first.";

            return;
        }

        const correctAnswer =
            challenge.answer ||
            challenge.correctAnswer;

        if (!correctAnswer) {

            result.hidden = false;

            result.className =
                "challenge-result success";

            result.innerHTML =
                "Answer submitted successfully.";

            saveChallengeProgress(
                challenge
            );

            return;
        }

        const normalizedUser =
            userAnswer
                .toLowerCase()
                .trim();

        const normalizedCorrect =
            String(correctAnswer)
                .toLowerCase()
                .trim();

        if (
            normalizedUser ===
            normalizedCorrect
        ) {

            result.hidden = false;

            result.className =
                "challenge-result success";

            result.innerHTML = `
                <strong>Correct! 🔥</strong>
                <span>
                    You earned +
                    ${escapeHTML(
                        challenge.points ??
                        challenge.xp ??
                        100
                    )}
                    XP.
                </span>
            `;

            saveChallengeProgress(
                challenge
            );

        } else {

            result.hidden = false;

            result.className =
                "challenge-result error";

            result.innerHTML = `
                <strong>Not quite.</strong>
                <span>
                    Check your answer and try again.
                </span>
            `;

        }

    }

    /* -----------------------------------------------------
       SAVE PROGRESS
    ----------------------------------------------------- */

    function saveChallengeProgress(challenge) {

        const id =
            challenge.id ??
            challenge.title;

        try {

            const key =
                "cyberlab_completed_challenges";

            const stored =
                JSON.parse(
                    localStorage.getItem(key) ||
                    "[]"
                );

            if (!stored.includes(id)) {

                stored.push(id);

                localStorage.setItem(
                    key,
                    JSON.stringify(stored)
                );

            }

        } catch (error) {

            console.warn(
                "Could not save challenge progress.",
                error
            );

        }

        /* XP */

        const xp =
            Number(
                challenge.points ??
                challenge.xp ??
                100
            );

        try {

            const currentXP =
                Number(
                    localStorage.getItem(
                        "cyberlab_xp"
                    ) || 0
                );

            localStorage.setItem(
                "cyberlab_xp",
                String(currentXP + xp)
            );

        } catch (error) {

            console.warn(
                "Could not save XP.",
                error
            );

        }

        showToast(
            `Challenge completed! +${xp} XP`,
            "success"
        );

    }

    /* -----------------------------------------------------
       CLOSE
    ----------------------------------------------------- */

    function closeChallenge() {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        document.body.classList.remove(
            "modal-open"
        );

    }

    /* -----------------------------------------------------
       FILTER BUTTONS
    ----------------------------------------------------- */

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
                    button.dataset.challengeFilter ||
                    "all";

                renderChallenges();

            }
        );

    });

    /* -----------------------------------------------------
       SEARCH
    ----------------------------------------------------- */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            event => {

                searchQuery =
                    event.target.value
                        .toLowerCase()
                        .trim();

                renderChallenges();

            }
        );

    }

    /* -----------------------------------------------------
       MODAL BACKDROP
    ----------------------------------------------------- */

    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeChallenge();

                }

            }
        );

    }

    /* -----------------------------------------------------
       ESC KEY
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("active")
            ) {

                closeChallenge();

            }

        }
    );

    /* -----------------------------------------------------
       TOAST
    ----------------------------------------------------- */

    function showToast(message, type = "info") {

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

        toast.textContent =
            message;

        container.appendChild(
            toast
        );

        requestAnimationFrame(() => {

            toast.classList.add(
                "show"
            );

        });

        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    /* -----------------------------------------------------
       INIT
    ----------------------------------------------------- */

    renderChallenges();

});
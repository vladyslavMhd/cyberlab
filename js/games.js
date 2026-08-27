/* =========================================================
   CYBERLAB — GAMES
   js/games.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const container =
        document.querySelector("[data-games-container]");

    const modal =
        document.getElementById("gameModal");

    if (!container) {
        return;
    }

    /* =====================================================
       DATA
    ===================================================== */

    function getGames() {

        if (
            window.cyberLabData &&
            Array.isArray(window.cyberLabData.games)
        ) {
            return window.cyberLabData.games;
        }

        if (
            Array.isArray(window.games)
        ) {
            return window.games;
        }

        return [];
    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       DIFFICULTY CLASS
    ===================================================== */

    function difficultyClass(difficulty) {

        const value =
            String(difficulty || "")
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


    /* =====================================================
       RENDER GAMES
    ===================================================== */

    function renderGames() {

        const games = getGames();

        if (games.length === 0) {

            container.innerHTML = `
                <div class="empty-state">

                    <div class="empty-state-icon">
                        🎮
                    </div>

                    <h3>
                        No games available
                    </h3>

                    <p>
                        Games will appear here soon.
                    </p>

                </div>
            `;

            return;
        }


        container.innerHTML =
            games
                .map(
                    (game, index) =>
                        createGameCard(
                            game,
                            index
                        )
                )
                .join("");


        attachEvents();

    }


    /* =====================================================
       GAME CARD
    ===================================================== */

    function createGameCard(game, index) {

        const id =
            game.id ||
            `game-${index + 1}`;

        const title =
            game.title ||
            game.name ||
            "Cyber Game";

        const description =
            game.description ||
            game.desc ||
            "Test your cybersecurity skills.";

        const category =
            game.category ||
            "general";

        const difficulty =
            game.difficulty ||
            "Easy";

        const icon =
            game.icon ||
            "🎮";

        const xp =
            game.xp ??
            game.points ??
            100;


        return `
            <article
                class="game-card"
                data-game-id="${escapeHTML(id)}"
            >

                <div class="game-card-visual">

                    <div class="game-icon">
                        ${escapeHTML(icon)}
                    </div>

                    <span class="game-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                </div>


                <div class="game-card-content">

                    <span class="game-category">
                        ${escapeHTML(category)}
                    </span>

                    <h3>
                        ${escapeHTML(title)}
                    </h3>

                    <p>
                        ${escapeHTML(description)}
                    </p>

                </div>


                <div class="game-card-footer">

                    <span
                        class="game-difficulty ${difficultyClass(difficulty)}"
                    >
                        ${escapeHTML(difficulty)}
                    </span>

                    <span class="game-xp">
                        +${escapeHTML(xp)} XP
                    </span>

                </div>


                <button
                    type="button"
                    class="btn game-start"
                    data-start-game="${escapeHTML(id)}"
                >
                    Play Game
                    <span>→</span>
                </button>

            </article>
        `;

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function attachEvents() {

        const buttons =
            container.querySelectorAll(
                "[data-start-game]"
            );

        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.startGame;

                    openGame(id);

                }
            );

        });

    }


    /* =====================================================
       OPEN GAME
    ===================================================== */

    function openGame(id) {

        const games = getGames();

        const game =
            games.find(
                item =>
                    String(item.id) ===
                    String(id)
            );

        if (!game) {

            showToast(
                "Game not found.",
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
            game.title ||
            game.name ||
            "Cyber Game";

        const description =
            game.description ||
            game.desc ||
            "";

        const xp =
            game.xp ??
            game.points ??
            100;


        modalBox.innerHTML = `

            <button
                class="modal-close"
                data-game-close
                aria-label="Close"
            >
                ×
            </button>


            <div class="game-modal-content">

                <span class="section-eyebrow">
                    CYBERLAB / GAME
                </span>


                <div class="game-modal-icon">
                    ${escapeHTML(game.icon || "🎮")}
                </div>


                <h2>
                    ${escapeHTML(title)}
                </h2>


                <p>
                    ${escapeHTML(description)}
                </p>


                <div class="game-info">

                    <div>

                        <span>
                            CATEGORY
                        </span>

                        <strong>
                            ${escapeHTML(
                                game.category ||
                                "General"
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            DIFFICULTY
                        </span>

                        <strong>
                            ${escapeHTML(
                                game.difficulty ||
                                "Easy"
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            REWARD
                        </span>

                        <strong>
                            +${escapeHTML(xp)} XP
                        </strong>

                    </div>

                </div>


                <div
                    class="game-play-area"
                    data-game-play-area
                >

                    ${createGameContent(game)}

                </div>


            </div>
        `;


        modal.classList.add("active");

        document.body.classList.add(
            "modal-open"
        );


        const closeButton =
            modal.querySelector(
                "[data-game-close]"
            );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeGame
            );

        }


        initializeGame(
            game
        );

    }


    /* =====================================================
       GAME CONTENT
    ===================================================== */

    function createGameContent(game) {

        const id =
            String(game.id || "");


        /* -----------------------------------------------
           TERMINAL MASTER
        ----------------------------------------------- */

        if (id === "terminal-master") {

            return `

                <div class="mini-game">

                    <div class="mini-game-question">

                        <span>
                            QUESTION
                        </span>

                        <h3>
                            Which command lists files
                            in the current directory?
                        </h3>

                    </div>


                    <div
                        class="game-options"
                        data-game-options
                    >

                        <button data-answer="wrong">
                            cd
                        </button>

                        <button data-answer="correct">
                            ls
                        </button>

                        <button data-answer="wrong">
                            mkdir
                        </button>

                        <button data-answer="wrong">
                            rm
                        </button>

                    </div>


                    <div
                        class="game-result"
                        data-game-result
                        hidden
                    ></div>

                </div>

            `;

        }


        /* -----------------------------------------------
           CYBER QUIZ
        ----------------------------------------------- */

        if (id === "cyber-quiz") {

            return `

                <div class="mini-game">

                    <div class="mini-game-question">

                        <span>
                            QUESTION
                        </span>

                        <h3>
                            What does HTTPS provide?
                        </h3>

                    </div>


                    <div
                        class="game-options"
                        data-game-options
                    >

                        <button data-answer="wrong">
                            Faster internet
                        </button>

                        <button data-answer="correct">
                            Encrypted communication
                        </button>

                        <button data-answer="wrong">
                            More storage
                        </button>

                        <button data-answer="wrong">
                            A new IP address
                        </button>

                    </div>


                    <div
                        class="game-result"
                        data-game-result
                        hidden
                    ></div>

                </div>

            `;

        }


        /* -----------------------------------------------
           PACKET HUNTER
        ----------------------------------------------- */

        if (id === "packet-hunter") {

            return `

                <div class="mini-game">

                    <div class="mini-game-question">

                        <span>
                            NETWORK ANALYSIS
                        </span>

                        <h3>
                            Which port is commonly used
                            by HTTPS?
                        </h3>

                    </div>


                    <div
                        class="game-options"
                        data-game-options
                    >

                        <button data-answer="wrong">
                            21
                        </button>

                        <button data-answer="wrong">
                            22
                        </button>

                        <button data-answer="wrong">
                            80
                        </button>

                        <button data-answer="correct">
                            443
                        </button>

                    </div>


                    <div
                        class="game-result"
                        data-game-result
                        hidden
                    ></div>

                </div>

            `;

        }


        /* -----------------------------------------------
           HASH DETECTIVE
        ----------------------------------------------- */

        if (id === "hash-breaker") {

            return `

                <div class="mini-game">

                    <div class="mini-game-question">

                        <span>
                            CRYPTOGRAPHY
                        </span>

                        <h3>
                            Which algorithm is a
                            cryptographic hash function?
                        </h3>

                    </div>


                    <div
                        class="game-options"
                        data-game-options
                    >

                        <button data-answer="wrong">
                            HTTP
                        </button>

                        <button data-answer="correct">
                            SHA-256
                        </button>

                        <button data-answer="wrong">
                            FTP
                        </button>

                        <button data-answer="wrong">
                            SSH
                        </button>

                    </div>


                    <div
                        class="game-result"
                        data-game-result
                        hidden
                    ></div>

                </div>

            `;

        }


        /* -----------------------------------------------
           PHISHING DETECTIVE
        ----------------------------------------------- */

        if (id === "phishing-detective") {

            return `

                <div class="mini-game">

                    <div class="mini-game-question">

                        <span>
                            SOCIAL ENGINEERING
                        </span>

                        <h3>
                            Which sign can indicate
                            a phishing message?
                        </h3>

                    </div>


                    <div
                        class="game-options"
                        data-game-options
                    >

                        <button data-answer="correct">
                            Suspicious links
                        </button>

                        <button data-answer="wrong">
                            Expected message
                        </button>

                        <button data-answer="wrong">
                            Known sender
                        </button>

                        <button data-answer="wrong">
                            Normal greeting
                        </button>

                    </div>


                    <div
                        class="game-result"
                        data-game-result
                        hidden
                    ></div>

                </div>

            `;

        }


        /* -----------------------------------------------
           DEFAULT
        ----------------------------------------------- */

        return `

            <div class="mini-game">

                <h3>
                    Game ready.
                </h3>

                <p>
                    More gameplay is coming soon.
                </p>

            </div>

        `;

    }


    /* =====================================================
       INITIALIZE GAME
    ===================================================== */

    function initializeGame(game) {

        const options =
            modal.querySelectorAll(
                "[data-answer]"
            );

        const result =
            modal.querySelector(
                "[data-game-result]"
            );

        if (!options.length || !result) {
            return;
        }


        let completed = false;


        options.forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    if (completed) {
                        return;
                    }


                    const correct =
                        option.dataset.answer ===
                        "correct";


                    if (correct) {

                        completed = true;


                        options.forEach(
                            item => {
                                item.disabled = true;
                            }
                        );


                        result.hidden = false;

                        result.className =
                            "game-result success";

                        result.innerHTML = `
                            <strong>
                                Correct! 🔥
                            </strong>

                            <span>
                                Great job — you earned
                                +${escapeHTML(
                                    game.xp ??
                                    game.points ??
                                    100
                                )} XP.
                            </span>
                        `;


                        saveGameProgress(
                            game
                        );

                    } else {

                        result.hidden = false;

                        result.className =
                            "game-result error";

                        result.innerHTML = `
                            <strong>
                                Nope 😭
                            </strong>

                            <span>
                                Try again.
                            </span>
                        `;

                    }

                }
            );

        });

    }


    /* =====================================================
       SAVE GAME PROGRESS
    ===================================================== */

    function saveGameProgress(game) {

        const id =
            game.id ||
            game.title;

        const xp =
            Number(
                game.xp ??
                game.points ??
                100
            );


        try {

            const key =
                "cyberlab_completed_games";

            const completed =
                JSON.parse(
                    localStorage.getItem(key) ||
                    "[]"
                );


            if (!completed.includes(id)) {

                completed.push(id);

                localStorage.setItem(
                    key,
                    JSON.stringify(completed)
                );


                const currentXP =
                    Number(
                        localStorage.getItem(
                            "cyberlab_xp"
                        ) || 0
                    );


                localStorage.setItem(
                    "cyberlab_xp",
                    String(
                        currentXP + xp
                    )
                );

            }

        } catch (error) {

            console.warn(
                "Could not save game progress.",
                error
            );

        }


        showToast(
            `Game completed! +${xp} XP`,
            "success"
        );

    }


    /* =====================================================
       CLOSE GAME
    ===================================================== */

    function closeGame() {

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =====================================================
       BACKDROP
    ===================================================== */

    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeGame();

                }

            }
        );

    }


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("active")
            ) {

                closeGame();

            }

        }
    );


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(
        message,
        type = "info"
    ) {

        const toastContainer =
            document.getElementById(
                "toastContainer"
            );

        if (!toastContainer) {
            return;
        }


        const toast =
            document.createElement("div");

        toast.className =
            `toast toast-${type}`;

        toast.textContent =
            message;


        toastContainer.appendChild(
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


    /* =====================================================
       INIT
    ===================================================== */

    renderGames();

});
/* =========================================================
   CYBERLAB — TOOLS
   Password Strength / Base64 / Hash / Regex
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector) => document.querySelector(selector);

    const showToast = (message, type = "info") => {

        const container = $("#toastContainer");

        if (!container) return;

        const toast = document.createElement("div");

        toast.className = `toast toast-${type}`;

        toast.textContent = message;

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 300);

        }, 3000);
    };


    /* =====================================================
       PASSWORD STRENGTH
    ===================================================== */

    const passwordInput =
        $("[data-password-input]");

    const passwordStrength =
        $("[data-password-strength]");

    const passwordPercent =
        $("[data-password-percent]");

    const passwordBar =
        $("[data-password-bar]");


    function calculatePasswordStrength(password) {

        if (!password) {
            return {
                score: 0,
                label: "Enter a password"
            };
        }

        let score = 0;

        /* Length */

        if (password.length >= 8) {
            score += 20;
        }

        if (password.length >= 12) {
            score += 15;
        }

        if (password.length >= 16) {
            score += 10;
        }


        /* Lowercase */

        if (/[a-z]/.test(password)) {
            score += 10;
        }


        /* Uppercase */

        if (/[A-Z]/.test(password)) {
            score += 10;
        }


        /* Numbers */

        if (/[0-9]/.test(password)) {
            score += 10;
        }


        /* Special characters */

        if (/[^A-Za-z0-9]/.test(password)) {
            score += 15;
        }


        /* Variety */

        if (
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
        ) {
            score += 10;
        }


        score = Math.min(score, 100);


        let label = "Very weak";

        if (score >= 25) {
            label = "Weak";
        }

        if (score >= 45) {
            label = "Fair";
        }

        if (score >= 65) {
            label = "Strong";
        }

        if (score >= 85) {
            label = "Very strong";
        }


        return {
            score,
            label
        };
    }


    function updatePasswordStrength() {

        if (!passwordInput) return;

        const password =
            passwordInput.value;

        const result =
            calculatePasswordStrength(password);


        if (passwordStrength) {
            passwordStrength.textContent =
                result.label;
        }


        if (passwordPercent) {
            passwordPercent.textContent =
                `${result.score}%`;
        }


        if (passwordBar) {
            passwordBar.style.width =
                `${result.score}%`;
        }
    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            updatePasswordStrength
        );

    }


    /* =====================================================
       BASE64
    ===================================================== */

    const base64Input =
        $("[data-base64-input]");

    const base64Output =
        $("[data-base64-output]");

    const base64Encode =
        $("[data-base64-encode]");

    const base64Decode =
        $("[data-base64-decode]");


    function encodeBase64(text) {

        try {

            return btoa(
                unescape(
                    encodeURIComponent(text)
                )
            );

        } catch (error) {

            return null;

        }
    }


    function decodeBase64(text) {

        try {

            return decodeURIComponent(
                escape(
                    atob(text)
                )
            );

        } catch (error) {

            return null;

        }
    }


    if (base64Encode) {

        base64Encode.addEventListener(
            "click",
            () => {

                const text =
                    base64Input?.value || "";

                if (!text) {

                    showToast(
                        "Enter some text first.",
                        "warning"
                    );

                    return;
                }


                const result =
                    encodeBase64(text);


                if (result === null) {

                    showToast(
                        "Could not encode the text.",
                        "error"
                    );

                    return;
                }


                if (base64Output) {
                    base64Output.value =
                        result;
                }

            }
        );

    }


    if (base64Decode) {

        base64Decode.addEventListener(
            "click",
            () => {

                const text =
                    base64Input?.value.trim() || "";

                if (!text) {

                    showToast(
                        "Enter Base64 text first.",
                        "warning"
                    );

                    return;
                }


                const result =
                    decodeBase64(text);


                if (result === null) {

                    showToast(
                        "Invalid Base64 string.",
                        "error"
                    );

                    return;
                }


                if (base64Output) {
                    base64Output.value =
                        result;
                }

            }
        );

    }


    /* =====================================================
       HASH GENERATOR
    ===================================================== */

    const hashInput =
        $("[data-hash-input]");

    const hashAlgorithm =
        $("[data-hash-algorithm]");

    const hashGenerate =
        $("[data-hash-generate]");

    const hashOutput =
        $("[data-hash-output]");


    async function generateHash(text, algorithm) {

        const encoder =
            new TextEncoder();

        const data =
            encoder.encode(text);

        const hashBuffer =
            await crypto.subtle.digest(
                algorithm,
                data
            );


        const hashArray =
            Array.from(
                new Uint8Array(hashBuffer)
            );


        return hashArray
            .map(
                byte =>
                    byte
                        .toString(16)
                        .padStart(2, "0")
            )
            .join("");
    }


    if (hashGenerate) {

        hashGenerate.addEventListener(
            "click",
            async () => {

                const text =
                    hashInput?.value || "";

                const algorithm =
                    hashAlgorithm?.value ||
                    "SHA-256";


                if (!text) {

                    showToast(
                        "Enter text to hash.",
                        "warning"
                    );

                    return;
                }


                try {

                    if (hashOutput) {

                        hashOutput.value =
                            "Generating...";

                    }


                    const hash =
                        await generateHash(
                            text,
                            algorithm
                        );


                    if (hashOutput) {

                        hashOutput.value =
                            hash;

                    }

                } catch (error) {

                    console.error(
                        "Hash error:",
                        error
                    );


                    showToast(
                        "Hash generation failed.",
                        "error"
                    );

                }

            }
        );

    }


    /* =====================================================
       REGEX TESTER
    ===================================================== */

    const regexPattern =
        $("[data-regex-pattern]");

    const regexFlags =
        $("[data-regex-flags]");

    const regexInput =
        $("[data-regex-input]");

    const regexTest =
        $("[data-regex-test]");

    const regexOutput =
        $("[data-regex-output]");


    if (regexTest) {

        regexTest.addEventListener(
            "click",
            () => {

                const pattern =
                    regexPattern?.value || "";

                const flags =
                    regexFlags?.value || "";

                const text =
                    regexInput?.value || "";


                if (!pattern) {

                    showToast(
                        "Enter a regular expression.",
                        "warning"
                    );

                    return;
                }


                try {

                    const regex =
                        new RegExp(
                            pattern,
                            flags
                        );


                    const matches =
                        text.match(regex);


                    if (!text) {

                        if (regexOutput) {

                            regexOutput.innerHTML =
                                `
                                <div class="regex-result warning">
                                    Enter some text to test.
                                </div>
                                `;

                        }

                        return;
                    }


                    if (!matches) {

                        if (regexOutput) {

                            regexOutput.innerHTML =
                                `
                                <div class="regex-result error">
                                    No matches found.
                                </div>
                                `;

                        }

                        return;
                    }


                    const uniqueMatches =
                        [...matches];


                    if (regexOutput) {

                        regexOutput.innerHTML =
                            `
                            <div class="regex-result success">

                                <strong>
                                    ${uniqueMatches.length}
                                    match${uniqueMatches.length === 1 ? "" : "es"}
                                </strong>

                                <div class="regex-matches">

                                    ${uniqueMatches
                                        .map(
                                            match =>
                                                `<span>${escapeHTML(match)}</span>`
                                        )
                                        .join("")}

                                </div>

                            </div>
                            `;

                    }


                } catch (error) {

                    if (regexOutput) {

                        regexOutput.innerHTML =
                            `
                            <div class="regex-result error">
                                Invalid regular expression.
                            </div>
                            `;

                    }

                }

            }
        );

    }


    /* =====================================================
       HTML ESCAPE
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       ENTER KEY SUPPORT
    ===================================================== */

    if (base64Input) {

        base64Input.addEventListener(
            "keydown",
            event => {

                if (
                    event.ctrlKey &&
                    event.key === "Enter"
                ) {

                    base64Encode?.click();

                }

            }
        );

    }


    if (hashInput) {

        hashInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    hashGenerate?.click();

                }

            }
        );

    }


    /* =====================================================
       COPY OUTPUT
    ===================================================== */

    document.addEventListener(
        "click",
        async event => {

            const target =
                event.target.closest(
                    "[data-copy]"
                );


            if (!target) return;


            const selector =
                target.dataset.copy;


            const element =
                document.querySelector(
                    selector
                );


            if (!element) return;


            const value =
                element.value ||
                element.textContent ||
                "";


            if (!value.trim()) {

                showToast(
                    "Nothing to copy.",
                    "warning"
                );

                return;
            }


            try {

                await navigator.clipboard.writeText(
                    value
                );


                showToast(
                    "Copied to clipboard.",
                    "success"
                );

            } catch (error) {

                showToast(
                    "Could not copy.",
                    "error"
                );

            }

        }
    );


    /* =====================================================
       TOOL INITIALIZATION
    ===================================================== */

    updatePasswordStrength();

    console.log(
        "%cCyberLab Tools initialized ✓",
        "font-weight: bold;"
    );

});
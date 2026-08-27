/* =========================================================
   CYBERLAB — STORAGE
   js/storage.js
========================================================= */

(() => {
    "use strict";

    const PREFIX = "cyberlab_";


    /* =====================================================
       BASIC STORAGE
    ===================================================== */

    function set(key, value) {
        try {
            localStorage.setItem(
                PREFIX + key,
                JSON.stringify(value)
            );

            return true;
        } catch (error) {
            console.error(
                "CyberLab Storage Error:",
                error
            );

            return false;
        }
    }


    function get(key, fallback = null) {
        try {
            const value =
                localStorage.getItem(
                    PREFIX + key
                );

            if (value === null) {
                return fallback;
            }

            return JSON.parse(value);

        } catch (error) {
            console.error(
                "CyberLab Storage Error:",
                error
            );

            return fallback;
        }
    }


    function remove(key) {
        try {
            localStorage.removeItem(
                PREFIX + key
            );

            return true;

        } catch (error) {
            console.error(
                "CyberLab Storage Error:",
                error
            );

            return false;
        }
    }


    function has(key) {
        try {
            return localStorage.getItem(
                PREFIX + key
            ) !== null;

        } catch {
            return false;
        }
    }


    function clear() {
        try {

            Object.keys(localStorage)
                .filter(key =>
                    key.startsWith(PREFIX)
                )
                .forEach(key =>
                    localStorage.removeItem(key)
                );

            return true;

        } catch (error) {

            console.error(
                "CyberLab Storage Error:",
                error
            );

            return false;
        }
    }


    /* =====================================================
       USER
    ===================================================== */

    function saveUser(user) {
        return set("user", user);
    }


    function getUser() {
        return get("user", null);
    }


    function removeUser() {
        return remove("user");
    }


    function isLoggedIn() {
        return getUser() !== null;
    }


    /* =====================================================
       XP
    ===================================================== */

    function getXP() {
        return Number(
            get("xp", 0)
        ) || 0;
    }


    function addXP(amount) {

        const current = getXP();

        const value =
            Number(amount) || 0;

        const newXP =
            Math.max(
                0,
                current + value
            );

        set("xp", newXP);

        dispatchStorageEvent(
            "xp",
            newXP
        );

        return newXP;
    }


    function setXP(amount) {

        const value =
            Math.max(
                0,
                Number(amount) || 0
            );

        set("xp", value);

        dispatchStorageEvent(
            "xp",
            value
        );

        return value;
    }


    /* =====================================================
       LEVEL
    ===================================================== */

    function getLevel() {

        const xp = getXP();

        return Math.floor(
            xp / 1000
        ) + 1;
    }


    function getLevelProgress() {

        const xp = getXP();

        const currentLevelXP =
            xp % 1000;

        return {
            level: getLevel(),
            currentXP: currentLevelXP,
            requiredXP: 1000,
            percent:
                Math.min(
                    100,
                    (currentLevelXP / 1000) * 100
                )
        };
    }


    /* =====================================================
       COMPLETED LABS
    ===================================================== */

    function getCompletedLabs() {

        return get(
            "completed_labs",
            []
        );
    }


    function isLabCompleted(id) {

        const labs =
            getCompletedLabs();

        return labs.includes(
            String(id)
        );
    }


    function completeLab(id) {

        const labs =
            getCompletedLabs();

        const labId =
            String(id);

        if (!labs.includes(labId)) {

            labs.push(labId);

            set(
                "completed_labs",
                labs
            );
        }

        return labs;
    }


    /* =====================================================
       COMPLETED CHALLENGES
    ===================================================== */

    function getCompletedChallenges() {

        return get(
            "completed_challenges",
            []
        );
    }


    function isChallengeCompleted(id) {

        const challenges =
            getCompletedChallenges();

        return challenges.includes(
            String(id)
        );
    }


    function completeChallenge(id) {

        const challenges =
            getCompletedChallenges();

        const challengeId =
            String(id);

        if (
            !challenges.includes(
                challengeId
            )
        ) {

            challenges.push(
                challengeId
            );

            set(
                "completed_challenges",
                challenges
            );
        }

        return challenges;
    }


    /* =====================================================
       COMPLETED GAMES
    ===================================================== */

    function getCompletedGames() {

        return get(
            "completed_games",
            []
        );
    }


    function isGameCompleted(id) {

        return getCompletedGames()
            .includes(
                String(id)
            );
    }


    function completeGame(id) {

        const games =
            getCompletedGames();

        const gameId =
            String(id);

        if (
            !games.includes(gameId)
        ) {

            games.push(gameId);

            set(
                "completed_games",
                games
            );
        }

        return games;
    }


    /* =====================================================
       ACHIEVEMENTS
    ===================================================== */

    function getAchievements() {

        return get(
            "achievements",
            []
        );
    }


    function hasAchievement(id) {

        return getAchievements()
            .includes(
                String(id)
            );
    }


    function unlockAchievement(id) {

        const achievements =
            getAchievements();

        const achievementId =
            String(id);

        if (
            !achievements.includes(
                achievementId
            )
        ) {

            achievements.push(
                achievementId
            );

            set(
                "achievements",
                achievements
            );

            dispatchStorageEvent(
                "achievement",
                achievementId
            );
        }

        return achievements;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    function getSettings() {

        return get(
            "settings",
            {
                theme: "dark",
                animations: true,
                sound: true
            }
        );
    }


    function saveSettings(settings) {

        const current =
            getSettings();

        const updated = {
            ...current,
            ...settings
        };

        set(
            "settings",
            updated
        );

        dispatchStorageEvent(
            "settings",
            updated
        );

        return updated;
    }


    /* =====================================================
       STATISTICS
    ===================================================== */

    function getStatistics() {

        return {
            xp: getXP(),

            level: getLevel(),

            labs:
                getCompletedLabs().length,

            challenges:
                getCompletedChallenges().length,

            games:
                getCompletedGames().length,

            achievements:
                getAchievements().length
        };
    }


    /* =====================================================
       RESET PROGRESS
    ===================================================== */

    function resetProgress() {

        remove("xp");

        remove("completed_labs");

        remove("completed_challenges");

        remove("completed_games");

        remove("achievements");

        dispatchStorageEvent(
            "reset",
            true
        );
    }


    /* =====================================================
       CUSTOM STORAGE EVENT
    ===================================================== */

    function dispatchStorageEvent(
        key,
        value
    ) {

        document.dispatchEvent(
            new CustomEvent(
                "cyberlab:storage",
                {
                    detail: {
                        key,
                        value
                    }
                }
            )
        );
    }


    /* =====================================================
       EXPORT
    ===================================================== */

    window.CyberLabStorage = {

        set,

        get,

        remove,

        has,

        clear,

        saveUser,

        getUser,

        removeUser,

        isLoggedIn,

        getXP,

        addXP,

        setXP,

        getLevel,

        getLevelProgress,

        getCompletedLabs,

        isLabCompleted,

        completeLab,

        getCompletedChallenges,

        isChallengeCompleted,

        completeChallenge,

        getCompletedGames,

        isGameCompleted,

        completeGame,

        getAchievements,

        hasAchievement,

        unlockAchievement,

        getSettings,

        saveSettings,

        getStatistics,

        resetProgress
    };


})();
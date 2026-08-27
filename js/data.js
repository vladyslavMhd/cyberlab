/* =========================================================
   CYBERLAB — DATA
   js/data.js
========================================================= */

window.cyberLabData = {

    /* =====================================================
       LABS
    ===================================================== */

    labs: [

        {
            id: "network-basics",
            title: "Network Basics",
            category: "network",
            difficulty: "Easy",
            duration: "20 min",
            description:
                "Learn the fundamentals of IP addresses, ports and network communication.",
            icon: "🌐",
            xp: 100,

            question:
                "Which address belongs to a private IPv4 network?",

            options: [
                "8.8.8.8",
                "192.168.1.10",
                "1.1.1.1",
                "142.250.72.14"
            ],

            answer: "192.168.1.10"
        },


        {
            id: "port-scanning",
            title: "Port Scanning",
            category: "network",
            difficulty: "Easy",
            duration: "25 min",
            description:
                "Understand open ports and how network services can be discovered safely.",
            icon: "📡",
            xp: 120,

            question:
                "Which port is normally associated with HTTPS?",

            options: [
                "21",
                "22",
                "80",
                "443"
            ],

            answer: "443"
        },


        {
            id: "web-security",
            title: "Web Security Basics",
            category: "web",
            difficulty: "Easy",
            duration: "25 min",
            description:
                "Explore requests, responses, cookies and sessions.",
            icon: "🌍",
            xp: 120,

            question:
                "Which HTTP status code means 'Not Found'?",

            options: [
                "200",
                "301",
                "404",
                "500"
            ],

            answer: "404"
        },


        {
            id: "xss-basics",
            title: "XSS Fundamentals",
            category: "web",
            difficulty: "Medium",
            duration: "30 min",
            description:
                "Learn how cross-site scripting works and how applications can defend against it.",
            icon: "⚡",
            xp: 180,

            question:
                "Which vulnerability allows malicious JavaScript to execute in a victim's browser?",

            options: [
                "XSS",
                "DNS",
                "ARP",
                "SSH"
            ],

            answer: "XSS"
        },


        {
            id: "linux-terminal",
            title: "Linux Terminal",
            category: "linux",
            difficulty: "Easy",
            duration: "20 min",
            description:
                "Practice essential Linux commands and file navigation.",
            icon: "🐧",
            xp: 100,

            question:
                "Which command lists files in the current directory?",

            options: [
                "cd",
                "ls",
                "pwd",
                "mkdir"
            ],

            answer: "ls"
        },


        {
            id: "linux-permissions",
            title: "Linux Permissions",
            category: "linux",
            difficulty: "Medium",
            duration: "30 min",
            description:
                "Understand users, groups and file permissions on Linux.",
            icon: "🔑",
            xp: 160,

            question:
                "Which command is commonly used to change file permissions?",

            options: [
                "chmod",
                "mkdir",
                "grep",
                "whoami"
            ],

            answer: "chmod"
        },


        {
            id: "hashing",
            title: "Hashing",
            category: "crypto",
            difficulty: "Easy",
            duration: "20 min",
            description:
                "Understand cryptographic hashes and data integrity.",
            icon: "#",
            xp: 110,

            question:
                "Which of these is a cryptographic hash function?",

            options: [
                "SHA-256",
                "HTTP",
                "FTP",
                "DNS"
            ],

            answer: "SHA-256"
        },


        {
            id: "crypto-basics",
            title: "Cryptography Basics",
            category: "crypto",
            difficulty: "Medium",
            duration: "35 min",
            description:
                "Explore encryption, decryption and cryptographic keys.",
            icon: "🔐",
            xp: 180,

            question:
                "What is the main purpose of encryption?",

            options: [
                "Make data unreadable to unauthorized users",
                "Delete files",
                "Increase internet speed",
                "Create IP addresses"
            ],

            answer:
                "Make data unreadable to unauthorized users"
        },


        {
            id: "file-analysis",
            title: "File Analysis",
            category: "forensics",
            difficulty: "Medium",
            duration: "30 min",
            description:
                "Learn how investigators examine files for useful forensic information.",
            icon: "🔎",
            xp: 160,

            question:
                "What can file metadata potentially reveal?",

            options: [
                "Creation information",
                "The user's password",
                "Wi-Fi speed",
                "CPU temperature"
            ],

            answer: "Creation information"
        },


        {
            id: "metadata",
            title: "Metadata Investigation",
            category: "forensics",
            difficulty: "Easy",
            duration: "20 min",
            description:
                "Discover how metadata can reveal information about digital files.",
            icon: "📄",
            xp: 100,

            question:
                "Which information can commonly exist in image metadata?",

            options: [
                "Camera model",
                "CPU voltage",
                "Router password",
                "Keyboard layout"
            ],

            answer: "Camera model"
        },


        {
            id: "osint-basics",
            title: "OSINT Basics",
            category: "osint",
            difficulty: "Easy",
            duration: "25 min",
            description:
                "Learn the fundamentals of open-source intelligence.",
            icon: "🕵️",
            xp: 120,

            question:
                "What does OSINT stand for?",

            options: [
                "Open Source Intelligence",
                "Online Security Internal Network",
                "Operating System Internet",
                "Open Security Information Tool"
            ],

            answer: "Open Source Intelligence"
        },


        {
            id: "digital-footprint",
            title: "Digital Footprint",
            category: "osint",
            difficulty: "Medium",
            duration: "30 min",
            description:
                "Understand how publicly available information can create a digital footprint.",
            icon: "👣",
            xp: 150,

            question:
                "Which can contribute to someone's digital footprint?",

            options: [
                "Public social media posts",
                "A disconnected keyboard",
                "RAM capacity",
                "Screen brightness"
            ],

            answer: "Public social media posts"
        }

    ],


    /* =====================================================
       CHALLENGES
    ===================================================== */

    challenges: [

        {
            id: "challenge-ip",
            title: "Identify the IP",
            category: "network",
            difficulty: "Easy",
            description:
                "Test your understanding of IPv4 addresses.",
            question:
                "Which of these is a valid private IPv4 address?",
            options: [
                "8.8.8.8",
                "192.168.1.10",
                "1.1.1.1",
                "142.250.72.14"
            ],
            answer: "192.168.1.10",
            points: 100
        },

        {
            id: "challenge-port",
            title: "Common Port",
            category: "network",
            difficulty: "Easy",
            description:
                "Identify a commonly used network service port.",
            question:
                "Which port is normally associated with HTTPS?",
            options: [
                "21",
                "22",
                "80",
                "443"
            ],
            answer: "443",
            points: 100
        },

        {
            id: "challenge-xss",
            title: "Web Security",
            category: "web",
            difficulty: "Medium",
            description:
                "Test your knowledge of common web vulnerabilities.",
            question:
                "Which vulnerability involves injecting malicious JavaScript into a web page?",
            options: [
                "XSS",
                "DNS",
                "ARP",
                "SSH"
            ],
            answer: "XSS",
            points: 150
        },

        {
            id: "challenge-linux",
            title: "Linux Command",
            category: "linux",
            difficulty: "Easy",
            description:
                "Test your Linux command knowledge.",
            question:
                "Which command lists files in the current directory?",
            options: [
                "cd",
                "ls",
                "pwd",
                "mkdir"
            ],
            answer: "ls",
            points: 100
        },

        {
            id: "challenge-hash",
            title: "Hash Function",
            category: "crypto",
            difficulty: "Medium",
            description:
                "Test your cryptography fundamentals.",
            question:
                "Which of these is a cryptographic hash function?",
            options: [
                "SHA-256",
                "HTTP",
                "FTP",
                "DNS"
            ],
            answer: "SHA-256",
            points: 150
        },

        {
            id: "challenge-password",
            title: "Password Security",
            category: "crypto",
            difficulty: "Easy",
            description:
                "Test your password-security knowledge.",
            question:
                "Which password is generally stronger?",
            options: [
                "password123",
                "qwerty",
                "CyberLab",
                "A7!mQ9#vL2@p"
            ],
            answer: "A7!mQ9#vL2@p",
            points: 100
        }

    ],


    /* =====================================================
       GAMES
    ===================================================== */

    games: [

        {
            id: "terminal-master",
            title: "Terminal Master",
            category: "linux",
            difficulty: "Easy",
            description:
                "How fast can you identify the correct Linux command?",
            icon: "⌨",
            xp: 150
        },

        {
            id: "cyber-quiz",
            title: "Cyber Quiz",
            category: "general",
            difficulty: "Easy",
            description:
                "Answer cybersecurity questions and build your XP.",
            icon: "🧠",
            xp: 200
        },

        {
            id: "packet-hunter",
            title: "Packet Hunter",
            category: "network",
            difficulty: "Medium",
            description:
                "Analyze simulated network traffic and identify suspicious packets.",
            icon: "📡",
            xp: 250
        },

        {
            id: "hash-breaker",
            title: "Hash Detective",
            category: "crypto",
            difficulty: "Medium",
            description:
                "Match hashes with their correct algorithms.",
            icon: "🔐",
            xp: 200
        },

        {
            id: "phishing-detective",
            title: "Phishing Detective",
            category: "web",
            difficulty: "Easy",
            description:
                "Identify suspicious messages, links and phishing attempts.",
            icon: "🎣",
            xp: 180
        }

    ]

};


/* =========================================================
   BACKWARD COMPATIBILITY
========================================================= */

window.labs =
    window.cyberLabData.labs;

window.challenges =
    window.cyberLabData.challenges;

window.games =
    window.cyberLabData.games;
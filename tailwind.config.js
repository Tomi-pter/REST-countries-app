module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                dark: {
                    element: `var(--dark-mode-blue)`,
                    bg: `var(--dark-mode-bg)`,
                },
                light: {
                    element: `var(--dark-mode-text)`,
                    bg: `var(--light-mode-bg)`,
                },
            },
            textColor: {
                dark: {
                    text: `var(--dark-mode-text)`,
                },
                light: {
                    text: `var(--light-mode-text)`,
                    input: `var(--light-mode-input)`,
                },
            },
            fontFamily: {
                NSL: "'NSL'",
                NSEB: "'NSEB'",
                NSSB: "'NSSB'",
            },
            boxShadow: {
                skin: "2px 2px 2px 0 rgba(0, 0, 0, 0.05), -2px -1px 0 rgba(0, 0, 0, 0.05)",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "brand-primary": process.env.BRAND_COLOR || "#FF00FF",
                "brand-secondary": process.env.BRAND_SECONDARY_COLOR || "#FF00FF",
            },
            fontFamily: {
                ios: ["-apple-system", "BlinkMacSystemFont", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", "helvetica", "arial", "sans-serif"],
            }
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
export default config;

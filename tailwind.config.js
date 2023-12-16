/** @type {import('tailwindcss').Config} */

export default {
   content: ["./src/**/*.{tsx,ts,jsx,js}"],
   theme: {
      extend: {
         colors: {
            background: "var(--background)",
            foreground: "var(--text)",
            primary: "var(--primary)",
            secondary: "var(--secondary)",
            accent: "var(--accent)",
            "cell-bg": {
               empty: "var(--empty-cell-bg-color)",
               2: "var(--2-cell-bg-color)",
               4: "var(--4-cell-bg-color)",
               8: "var(--8-cell-bg-color)",
               16: "var(--16-cell-bg-color)",
               32: "var(--32-cell-bg-color)",
               64: "var(--64-cell-bg-color)",
               128: "var(--128-cell-bg-color)",
               256: "var(--256-cell-bg-color)",
               512: "var(--512-cell-bg-color)",
               1024: "var(--1024-cell-bg-color)",
               2048: "var(--2048-cell-bg-color)",
               default: "var(--default-cell-bg-color)",
            },
            "cell-fg": {
               2: "var(--2-cell-fg-color)",
               4: "var(--4-cell-fg-color)",
               8: "var(--8-cell-fg-color)",
               16: "var(--16-cell-fg-color)",
               32: "var(--32-cell-fg-color)",
               64: "var(--64-cell-fg-color)",
               128: "var(--128-cell-fg-color)",
               256: "var(--256-cell-fg-color)",
               512: "var(--512-cell-fg-color)",
               1024: "var(--1024-cell-fg-color)",
               2048: "var(--2048-cell-fg-color)",
               default: "var(--default-cell-fg-color)",
            },
         },
      },
   },
   plugins: [require("@tailwindcss/forms")],
};

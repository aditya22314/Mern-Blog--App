import {
  content as flowbiteContent,
  plugin as flowbitePlugin,
} from "flowbite-react/tailwind";
import tailwindscrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbiteContent()],

  theme: {
    extend: {},
  },
  plugins: [
    // ...
    flowbitePlugin(),
    tailwindscrollbar(),

    // Or import if possible
  ],
};

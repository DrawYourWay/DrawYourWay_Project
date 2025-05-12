import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";
import "./fonts.css";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        main: { value: "#EBEBDF" },
        link: { value: "#052DD6" },
        lightGray: { value: "rgba(217, 217, 217, 0.41)" },
        darkGray: { value: "#525252" },
      },
      // fonts: {
      //   armstrong: { value: "'Armstrong', sans-serif" },
      //   inter: { value: "'Inter', sans-serif" },
      // },
    },
  },
});

export default createSystem(defaultConfig, config);

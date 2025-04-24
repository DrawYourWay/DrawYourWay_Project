import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";
import "./fonts.css";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        main: { value: "#EBEBDF" },
      },
      fonts: {
        main: { value: "'Armstrong', sans-serif" },
      },
    },
  },
});

export default createSystem(defaultConfig, config);

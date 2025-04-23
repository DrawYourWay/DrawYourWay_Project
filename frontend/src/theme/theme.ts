import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        main: { value: "#EBEBDF" },
      },
      fonts: {
        main: { value: "'Armstrong', sans-serif" }, // Użyj fontu Armstrong
      },
    },
  },
});

export default createSystem(defaultConfig, config);

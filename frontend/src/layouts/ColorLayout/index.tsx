import { HStack } from "@chakra-ui/react";

interface ColorLayoutProps {
  children: React.ReactNode;
}

const ColorLayout = ({ children }: ColorLayoutProps) => {
  return (
    <HStack minH="100vh" minW="100vw" backgroundColor="main">
      {children}
    </HStack>
  );
};

export default ColorLayout;

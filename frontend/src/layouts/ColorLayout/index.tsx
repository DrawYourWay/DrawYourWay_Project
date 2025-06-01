import { HStack } from "@chakra-ui/react";

interface ColorLayoutProps {
  children: React.ReactNode;
  color?: string;
}

const ColorLayout = ({ children, color }: ColorLayoutProps) => {
  return (
    <HStack
      minH="100vh"
      minW="100vw"
      backgroundColor={color ? color : "deepDarkGray"}
    >
      {children}
    </HStack>
  );
};

export default ColorLayout;

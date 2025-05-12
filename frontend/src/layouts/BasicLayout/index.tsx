import { VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import wavesImage from "/images/waves.png";

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <VStack minH="100vh" minW="100vw" backgroundColor="main">
      <Image src={wavesImage} alt="Waves" width="500px" />
      {children}
    </VStack>
  );
};

export default BasicLayout;

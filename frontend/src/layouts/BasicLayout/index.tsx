import { VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import wavesImage from "/images/waves.png";

interface BasicLayoutProps {
  children: React.ReactElement[];
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <VStack minH="100vh" minW="100vw" backgroundColor="#EBEBDF">
      <Image src={wavesImage} alt="Waves" width="400px" />
      {children}
    </VStack>
  );
};

export default BasicLayout;

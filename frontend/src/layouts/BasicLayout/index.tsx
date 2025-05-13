import { VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import wavesImage from "/images/waves.png";

interface BasicLayoutProps {
  useImage?: boolean,
  children: React.ReactNode;
}

const BasicLayout = ({ children, useImage = true }: BasicLayoutProps) => {
  return (
    <VStack minH="100vh" minW="100vw" backgroundColor="main">
      {useImage && <Image src={wavesImage} alt="Waves" width="500px" />}
      {children}
    </VStack>
  );
};



export default BasicLayout;

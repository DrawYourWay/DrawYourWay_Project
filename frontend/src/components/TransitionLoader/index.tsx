import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import logo from "/images/logo.png";

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);
const MotionStack = motion.create(HStack);
const MotionImage = motion.create(Image);

const containerVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  initial: {
    y: [0],
  },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 5,
    },
  },
  exit: {},
};

const TransitionLoader = () => {
  return (
    <>
      <MotionBox
        position="fixed"
        width="100vw"
        height="100vh"
        top={0}
        overflow="hidden"
        bg="main"
        zIndex="9999"
        exit={{
          opacity: 0,
          y: [0, -30, 100],
          transition: {
            duration: 1.2,
            ease: "easeInOut",
          },
        }}
      >
        <Center h="100%" flexDir="column">
          <MotionImage
            src={logo}
            alt="Logo"
            width="200px"
            height="200px"
            marginBottom="20px"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />
          <MotionStack
            variants={containerVariants}
            initial="initial"
            animate="animate"
            flexDir="row"
          >
            {Array.from("Draw Your Way").map((char, index) => (
              <MotionText
                fontFamily="armstrong"
                key={index}
                variants={letterVariants}
                fontSize="2xl"
                fontWeight="bold"
                color="black"
                margin="0 -1px"
              >
                {char}
              </MotionText>
            ))}
          </MotionStack>
        </Center>
      </MotionBox>
    </>
  );
};

export default TransitionLoader;

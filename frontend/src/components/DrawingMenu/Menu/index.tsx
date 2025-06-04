import { HStack, Text } from "@chakra-ui/react";
import MenuButton from "../MenuButton";
import MenuClearButton from "../MenuClearButton";
import MenuColorSelection from "../MenuColorSelection";

const Menu = () => {
  return (
    <>
      <HStack
        position="absolute"
        top={2}
        left={2}
        color="black"
        fontFamily="Inter"
        fontStyle="italic"
      >
        <Text fontSize="sm" fontStyle="italic" userSelect="none" maxW="225px">
          Draw here and when you finish click SUBMIT!
        </Text>
      </HStack>
      <HStack position="absolute" top={2} right={2}>
        <MenuButton
          iconPath="/images/pen.png"
          iconName="pen"
          iconBorderColor="yellow"
        />
        <MenuButton
          iconPath="/images/eraser.png"
          iconName="eraser"
          iconBorderColor="red"
        />
        <MenuClearButton />
      </HStack>
      <HStack position="absolute" bottom={2} left={2}>
        <MenuColorSelection />
      </HStack>
    </>
  );
};

export default Menu;

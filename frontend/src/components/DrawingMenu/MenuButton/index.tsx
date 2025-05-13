import useDrawingStore from "@/store/useDrawingStore";
import { ToolName, ToolBorderColor } from "@/types/draw/tool";
import { Box, Image } from "@chakra-ui/react";

interface MenuButtonProps {
  iconPath: string;
  iconName: ToolName;
  iconBorderColor: ToolBorderColor;
}

const MenuButton = ({
  iconPath,
  iconName,
  iconBorderColor: iconBackgroundColor,
}: MenuButtonProps) => {
  const drawingStore = useDrawingStore();
  const isActive = drawingStore.activeTool == iconName;

  const handleToolSelection = () => {
    if (isActive) return;
    drawingStore.setActiveTool(iconName);
  };

  return (
    <Box onClick={handleToolSelection}>
      <Image
        src={iconPath}
        backgroundColor="lightGray"
        borderRadius="10px"
        width="30px"
        height="30px"
        padding="5px"
        borderStyle="solid"
        borderColor={isActive ? iconBackgroundColor : "transparent"}
        borderWidth={isActive ? "2px" : "0px"}
      />
    </Box>
  );
};

export default MenuButton;

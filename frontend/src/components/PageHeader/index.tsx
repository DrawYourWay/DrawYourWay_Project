import { Box, Heading, Text, Link } from "@chakra-ui/react";

interface PagesHeaderProps {
  subtitle: string;
  preforwardText?: string;
  forwardLink?: string;
}

const PageHeader = ({
  subtitle,
  preforwardText,
  forwardLink,
}: PagesHeaderProps) => {
  return (
    <Box color="black" p={5}>
      <Heading
        as="h2"
        size={["3xl", "4xl"]}
        textAlign="center"
        mb={[8, 12]}
        fontFamily="armstrong"
      >
        Draw Your Way
      </Heading>
      <Heading
        as="h2"
        size={["xl", "2xl"]}
        textAlign="center"
        mb={4}
        fontFamily="inter"
      >
        {subtitle}
      </Heading>
      {preforwardText && (
        <Text textAlign="center" fontSize={["lg", "xl"]}>
          {preforwardText}{" "}
          <Link
            variant="underline"
            color="link"
            href={forwardLink}
            textDecoration="underline"
          >
            Click here
          </Link>
        </Text>
      )}
    </Box>
  );
};

export default PageHeader;

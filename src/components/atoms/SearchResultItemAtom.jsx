import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Image, Text, HStack, Heading, Center } from "@chakra-ui/react";

import useAssets from "@/hooks/useAssets";

const SearchResultItemAtom = ({
  id,
  name,
  image,
  currentPrice,
  currentCurrency = "USD",
} = {}) => {
  const [, addAsset, removeAsset, isExisted] = useAssets();

  const onClickAddToList = () => {
    addAsset(id);
  };

  const onClickRemoveFromList = () => {
    removeAsset(id);
  };

  const idIsExisted = isExisted(id);

  return (
    <Box w="100%">
      <HStack spacing={4}>
        <Image src={image} alt={name} borderRadius="full" boxSize="32px" />
        <Heading as="h6" size="sm" flexGrow="1" flexShrink="1" isTruncated>
          {name}
        </Heading>
        <HStack spacing={1} flexGrow="0" flexShrink="0">
          <Text fontSize="sm" color="gray">
            {currentPrice}
          </Text>
          <Text fontSize="sm" color="gray" fontWeight="semibold">
            {currentCurrency}
          </Text>
        </HStack>
        <Center
          w="24px"
          h="24px"
          bg={idIsExisted ? "red.500" : "teal"}
          borderRadius="full"
          flexGrow="0"
          flexShrink="0"
          flexBasis="24px"
        >
          {idIsExisted ? (
            <MinusIcon
              onClick={onClickRemoveFromList}
              color="white"
              w="12px"
              h="12px"
            />
          ) : (
            <AddIcon
              onClick={onClickAddToList}
              color="white"
              w="12px"
              h="12px"
            />
          )}
        </Center>
      </HStack>
    </Box>
  );
};

export default SearchResultItemAtom;

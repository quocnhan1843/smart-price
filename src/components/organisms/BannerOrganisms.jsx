import { Center, VStack, Text } from "@chakra-ui/react";

import CoinLogoMolecules from "@/components/molecules/CoinLogoMolecules";

const BannerOrganisms = ({ props }) => {
  return (
    <Center
      bg="teal"
      w="100%"
      p={4}
      color="white"
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack>
        <CoinLogoMolecules
          url="https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
          name="Smart Price"
        />
        <Text>Smart Price</Text>
      </VStack>
    </Center>
  );
};

export default BannerOrganisms;

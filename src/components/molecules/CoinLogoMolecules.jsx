import { Image } from "@chakra-ui/react";

const CoinLogoMolecules = ({ url, name, size = "32px" }) => {
  return (
    <Image borderRadius="full" src={url} alt={name} boxSize={size}></Image>
  );
};

export default CoinLogoMolecules;

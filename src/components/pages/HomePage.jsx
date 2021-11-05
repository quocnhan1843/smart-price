import { Stack } from "@chakra-ui/react";

import HomeSearchBox from "@/components/organisms/HomeSearchBox";
import BannerOrganisms from "@/components/organisms/BannerOrganisms";
import AssetsOrganisms from "@/components/organisms/AssetsOrganisms";

const HomePage = () => {
  return (
    <Stack spacing={6} p={6}>
      <BannerOrganisms></BannerOrganisms>
      <HomeSearchBox></HomeSearchBox>
      <AssetsOrganisms></AssetsOrganisms>
    </Stack>
  );
};

export default HomePage;

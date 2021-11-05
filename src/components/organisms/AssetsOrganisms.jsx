import { useEffect } from "react";

import useApi from "@/hooks/useApi";
import useAssets from "@/hooks/useAssets";

import SearchResultItems from "@/components/molecules/SearchResultItems";

const AssetsMolescules = (props) => {
  const [assets] = useAssets();
  const [results, searchCoin] = useApi((ids) => {
    if (!ids) {
      return null;
    }

    return {
      method: "GET",
      url: "/coins/markets",
      data: {
        ids: ids,
        vs_currency: "usd",
      },
    };
  });

  useEffect(() => {
    searchCoin(assets.join(","));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);

  return <SearchResultItems results={results} />;
};

export default AssetsMolescules;

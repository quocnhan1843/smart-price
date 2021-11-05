import { useEffect } from "react";
import { createGlobalState } from "react-hooks-global-state";

import Storage from "@/utils/storage";

const KEY = "assets-list";
let initAssets = [];

try {
  const data = Storage.getItem(KEY) || "[]";

  initAssets = JSON.parse(data);
} catch (_) {
  initAssets = [];
}

const initialState = { assets: initAssets };

const { useGlobalState } = createGlobalState(initialState);

const useAssets = () => {
  const [assets, setAssets] = useGlobalState("assets");

  useEffect(() => {
    Storage.setItem(KEY, assets);
  }, [assets]);

  const addAsset = (id) => {
    if (!Array.isArray(assets)) {
      setAssets([id]);

      return;
    }

    if (!assets.includes(id)) {
      const newList = [...assets, id];

      setAssets(newList);
    }
  };

  const removeAsset = (id) => {
    if (!Array.isArray(assets)) {
      return;
    }

    const dummyList = [...assets];
    const index = dummyList.indexOf(id);

    if (index > -1) {
      dummyList.splice(index, 1);

      setAssets(dummyList);
    }
  };

  const isExisted = (id) => {
    if (!Array.isArray(assets)) {
      return false;
    }

    return assets.includes(id);
  };

  return [assets, addAsset, removeAsset, isExisted];
};

export default useAssets;

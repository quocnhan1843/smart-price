import { Fragment } from "react";
import {
  Center,
  Collapse,
  Divider,
  VStack,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";

import EmptyState from "@/components/atoms/EmptyState";
import SearchResultItemAtom from "@/components/atoms/SearchResultItemAtom";

const SearchResultItems = ({ results = {}, assets } = {}) => {
  if (results?.loading) {
    if (Array.isArray(assets)) {
      return assets.slice(0, 5).map(() => <Skeleton height="46px" />);
    }

    return (
      <Center p={6}>
        <Spinner color="teal" />;
      </Center>
    );
  }

  if (!results?.data || !Array.isArray(results?.data)) {
    return <EmptyState />;
  }

  return (
    <Collapse in={!!results?.data} animateOpacity>
      <VStack justify="center" align="start" spacing={4} p={4}>
        {results?.data &&
          results.data.map((item) => {
            return (
              <Fragment key={item.id}>
                <Divider />
                <SearchResultItemAtom {...item} />
              </Fragment>
            );
          })}
      </VStack>
    </Collapse>
  );
};

export default SearchResultItems;

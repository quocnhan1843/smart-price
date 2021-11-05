import { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Stack,
  VStack,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import useApi from "@/hooks/useApi";
import useDebounce from "@/hooks/useDebounce";
import SearchResultItems from "@/components/molecules/SearchResultItems";

const INPUT_PLACEHOLDER = "The ids of the coin, comma separated";

const HomeSearchBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [results, searchCoin] = useApi((debouncedSearchTerm) => {
    if (!debouncedSearchTerm) {
      return null;
    }

    return {
      method: "GET",
      url: "/coins/markets",
      data: {
        ids: debouncedSearchTerm,
        vs_currency: "usd",
      },
    };
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchCoin(debouncedSearchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    return setSearchTerm("");
  }, []);

  const onCloseModal = () => {
    setSearchTerm("");
    searchCoin("");
    onClose();
  };

  return (
    <Center h="64px" color="gray">
      <VStack w="100%">
        <Stack w="100%">
          <InputGroup onClick={onOpen} focusBorderColor="none">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="teal" />}
            />
            <Input
              variant="outline"
              placeholder={INPUT_PLACEHOLDER}
              height="40px"
            />
          </InputGroup>
          <Modal isOpen={isOpen} onClose={onCloseModal} colorScheme="teal">
            <ModalOverlay />
            <ModalContent>
              <ModalBody p={0}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="teal" />}
                  />
                  <Input
                    variant="unstyled"
                    placeholder={INPUT_PLACEHOLDER}
                    height="40px"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </ModalBody>
              <SearchResultItems results={results} />
            </ModalContent>
          </Modal>
        </Stack>
      </VStack>
    </Center>
  );
};

export default HomeSearchBox;

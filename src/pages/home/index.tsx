import { Box, Center, Container, Flex, Text, VStack } from "@chakra-ui/layout";
import { useContext } from "react";
import CircleIcon from "../../components/CircleIcon";
import SendModal from "../../components/SendModal";
import TransactionsList from "../../components/TransactionsList";
import AppContext from "../../context/background/AppContext";
import { short } from "../../utils/address";
import { formatCurrency, formatNumber } from "../../utils/number";

function Home() {
  const {
    state: { currentAccount, ethPrice, accountBalance },
  } = useContext(AppContext);

  return (
    <Container maxW="xl">
      <VStack align="stretch" spacing={6}>
        <Flex>
          <Center mr={3}>
            <CircleIcon boxSize={12} />
          </Center>
          <Box flex="1">
            <Text>Account 1</Text>
            <Text fontSize="sm" color="gray">
              {short(currentAccount)}
            </Text>
          </Box>
        </Flex>
        <Flex
          direction="column"
          align="center"
          background="#eaf3fc"
          borderRadius={6}
          py={6}
        >
          <Text fontSize="3xl" fontWeight="bold">
            {formatNumber(accountBalance)} ETH
          </Text>
          <Text color="gray">
            {formatCurrency(accountBalance * ethPrice)} USD
          </Text>
          <SendModal mt={6} mb={3} data-testid="send-button" />
          <Text fontSize="sm">Send</Text>
        </Flex>
        <TransactionsList />
      </VStack>
    </Container>
  );
}

export default Home;

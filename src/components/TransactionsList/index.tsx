import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { useContext } from "react";
import AppContext from "../../context/background/AppContext";
import useGetTransactions from "../../hooks/useGetTransactions";
import { formatCurrency, formatNumber } from "../../utils/number";

function TransactionsList() {
  const {
    state: { currentAccount, ethPrice },
  } = useContext(AppContext);
  const { loading, transactions } = useGetTransactions();

  if (loading) {
    return (
      <Stack>
        <Skeleton height={9} />;
        <Skeleton height={9} />;
        <Skeleton height={9} />;
      </Stack>
    );
  }

  return (
    <VStack
      align="stretch"
      spacing={3}
      divider={<StackDivider borderColor="gray.200" />}
    >
      {transactions.map((transaction) => {
        const isIncome = currentAccount !== transaction.from;
        return (
          <Flex key={transaction.id}>
            <Center mr={3}>
              <CheckCircleIcon boxSize={9} />
            </Center>
            <Box flex="1">
              <Text>{isIncome ? "Received" : "Sent"} Ether</Text>
              <Text fontSize="sm" color="gray">
                {transaction.date}
              </Text>
            </Box>
            <Box>
              <Text>
                {formatNumber(transaction.value * (isIncome ? 1 : -1))} ETH
              </Text>
              <Text fontSize="sm" color="gray">
                {formatCurrency(
                  transaction.value * ethPrice * (isIncome ? 1 : -1)
                )}{" "}
                USD
              </Text>
            </Box>
          </Flex>
        );
      })}
    </VStack>
  );
}

export default TransactionsList;

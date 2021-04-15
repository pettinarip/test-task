import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Center, Link, Text, VStack } from "@chakra-ui/layout";
import { ModalBody, ModalFooter } from "@chakra-ui/modal";
import { Transaction } from "../../../services/TransactionsService";

interface IProps {
  transaction: Transaction;
  onDone: () => void;
}

function SuccessStep({ transaction, onDone }: IProps) {
  return (
    <>
      <ModalBody>
        <Center h="100%">
          <VStack w="150px">
            <Image
              src="success.png"
              fallbackSrc="https://via.placeholder.com/150"
            />
            <Text fontSize="xl" fontWeight="bold">
              Success.
            </Text>
            <Text fontSize="sm" color="gray" align="center">
              You've successfully sent your funds.
            </Text>
            <Link
              href={`https://etherscan.io/tx/${transaction.id}`}
              isExternal
              fontSize="sm"
              color="blue.500"
            >
              View on Etherscan <ArrowForwardIcon />
            </Link>
          </VStack>
        </Center>
      </ModalBody>
      <ModalFooter>
        <Button isFullWidth onClick={onDone}>
          Done
        </Button>
      </ModalFooter>
    </>
  );
}

export default SuccessStep;

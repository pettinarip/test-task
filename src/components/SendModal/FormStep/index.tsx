import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, VStack } from "@chakra-ui/layout";
import {
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { NumberInput, NumberInputField } from "@chakra-ui/number-input";
import { Field, FieldProps, Form, Formik } from "formik";
import { useContext } from "react";
import AppContext from "../../../context/background/AppContext";
import useSendTransactions from "../../../hooks/useSendTransactions";
import { Transaction } from "../../../services/TransactionsService";
import { isAddress } from "../../../utils/address";
import { formatNumber } from "../../../utils/number";

interface IProps {
  onNext: (transaction: Transaction) => void;
  onCancel: () => void;
}

interface IFromValues {
  to: string;
  amount: string;
}

function FormStep({ onNext, onCancel }: IProps) {
  const { state: appState } = useContext(AppContext);
  const { sendTransaction } = useSendTransactions();
  const initialValues: IFromValues = { to: "", amount: "" };

  async function handleSubmit(values: IFromValues) {
    const transaction = await sendTransaction(
      values.to,
      parseFloat(values.amount)
    );
    onNext(transaction);
  }

  function validateTo(to: string) {
    if (!to) {
      return "Required";
    }

    if (!isAddress(to)) {
      return "Incorrect address";
    }
  }

  function validateAmount(amount: string) {
    const amountNumber = parseFloat(amount);

    if (amount === "") {
      return "Required";
    }

    if (amountNumber > appState.accountBalance) {
      return `Not enough balance. You have ${formatNumber(
        appState.accountBalance
      )} ETH`;
    }
  }

  return (
    <Flex direction="column" h="100%">
      <ModalHeader>Send Ether</ModalHeader>
      <ModalCloseButton />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Flex as={Form} direction="column" h="100%">
            <ModalBody>
              <VStack>
                <Field name="to" validate={validateTo}>
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={!!(meta.touched && meta.error)}>
                      <FormLabel htmlFor="to">Add Recipient</FormLabel>
                      <Input
                        {...field}
                        id="to"
                        placeholder="Enter Public Address"
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="amount" validate={validateAmount}>
                  {({ field, meta }: FieldProps<string>) => (
                    <FormControl isInvalid={!!(meta.touched && meta.error)}>
                      <FormLabel htmlFor="amount">Amount To Transfer</FormLabel>
                      <NumberInput id="amount" min={0}>
                        <NumberInputField {...field} />
                      </NumberInput>
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} isFullWidth onClick={onCancel}>
                Cancel
              </Button>
              <Button
                isFullWidth
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
                data-testid="next-button"
              >
                Next
              </Button>
            </ModalFooter>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
}

export default FormStep;

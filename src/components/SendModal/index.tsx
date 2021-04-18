import { IconButton, IconButtonProps } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useState } from "react";
import { Transaction } from "../../services/TransactionsService";
import FormStep from "./FormStep";
import SuccessStep from "./SuccessStep";

interface IProps extends Omit<IconButtonProps, "aria-label"> {}

function SendModal(props: IProps) {
  const [step, setStep] = useState(0);
  const [transaction, setTransaction] = useState<Transaction>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleNext(transaction: Transaction) {
    setTransaction(transaction);
    setStep(1);
  }

  function handleDone() {
    setStep(0);
    onClose();
  }

  return (
    <>
      <IconButton
        isRound
        colorScheme="blue"
        aria-label="Send ether"
        icon={<ArrowUpIcon />}
        onClick={onOpen}
        {...props}
      ></IconButton>

      <Modal isOpen={isOpen} onClose={handleDone}>
        <ModalOverlay />
        <ModalContent h="500px">
          {step === 0 && <FormStep onCancel={handleDone} onNext={handleNext} />}
          {step === 1 && transaction && (
            <SuccessStep transaction={transaction} onDone={handleDone} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SendModal;

import React from 'react';

import { Button } from '@chakra-ui/react';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from '@chakra-ui/react';

function Error(props) {
    const { error, isOpen, setIsOpen } = props;

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{error?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>{error?.message}</div>
            <br />
            <div>{error?.resolution}</div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default Error;

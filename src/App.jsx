import React, { useState } from 'react';

import './App.css';

import Home from './components/Home';
import Search from './components/Search';
import Toolbar from './components/Toolbar';

import { Box, Flex, Icon, Spacer } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FaPlayCircle } from "react-icons/fa";


const font = localStorage.getItem('font');

function App() {

  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [selectedFont, setSelectedFont] = useState(font ? font : 'serif');
  const [audio, setAudio] = useState(new Audio(''));


  return (
    <div className={selectedFont}>
      <Toolbar font={font} selectedFont={selectedFont} setSelectedFont={setSelectedFont} />
      <Search setResults={setResults} setAudio={setAudio} setError={setError} setIsOpen={setIsOpen} />

      {results.length > 0 ? results.map((result, index) => (
        <div className='result-word' key={`${result.word}-${index}`} style={{ marginBottom: '48px' }}>
          <Flex>
            <Box>
              <h1 style={{ fontWeight: 'bold' }}>{result.word}</h1>
              <div style={{ color: 'purple' }}>{result.phonetic}</div>
            </Box>
            <Spacer />
            <Box>
              {audio && <button onClick={() => audio.play()}><Icon style={{ color: 'purple' }} as={FaPlayCircle} boxSize={12} /></button>}
            </Box>
          </Flex>

          {result.meanings.map((meaning, index) => {
            const partOfSpeech = meaning.partOfSpeech;

            return (
              <div key={partOfSpeech} style={{ padding: '16px 0', margin: '16px 0' }}>
                <Flex align='center' style={{ marginBottom: '16px' }}>
                  <div style={{ fontStyle: 'italic', fontWeight: 'bold', marginRight: '16px' }}>
                    {meaning.partOfSpeech}
                  </div>
                  <hr style={{ width: '100%' }} />
                </Flex>
                <div style={{ fontWeight: 'lighter', color: 'gray' }}>Meaning</div>
                <ul key={`${partOfSpeech}-${index}-list`} style={{ margin: '8px 24px 32px' }}>
                  {meaning.definitions.map((definition, index) => (
                    <React.Fragment key={`${partOfSpeech}-${index}-item`}>
                      <li key={`${partOfSpeech}-${index}-item`} style={{ margin: '8px 0' }}>{definition.definition}</li>
                      {definition.example && <div style={{ color: 'gray' }}>"{definition.example}"</div>}
                    </React.Fragment>
                  ))}
                </ul>
                {meaning.synonyms?.length > 0 ? (
                  <div>
                    <span>Synonyms: </span>
                    <span style={{ color: 'purple', fontWeight: 'bold' }}>{meaning.synonyms.join(', ')}</span>
                  </div>
                ) : null}
              </div>)
          })}
          <hr />
          <div style={{ fontSize: '12px', paddingTop: '16px' }}>
            <span style={{ color: 'gray' }}>Source </span>
            <a href={result.sourceUrls}>
              <span style={{ textDecoration: 'underline' }}>{result.sourceUrls}</span>
              &nbsp;
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      )) : <Home />}
      {results.length > 1 ? <hr /> : null}

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

    </div>
  )
}

export default App

import React, { useState } from 'react';

import './App.css';

import { Box, Flex, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { Button, FormControl, Input, InputGroup, InputRightElement, Select, Switch } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { useColorMode } from '@chakra-ui/react';

import { MoonIcon, SearchIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { RiBook2Line } from "react-icons/ri";
import { FaPlayCircle } from "react-icons/fa";

const baseUrl = `https://api.dictionaryapi.dev/api/v2/entries/en`;
const font = localStorage.getItem('font');

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [selectedFont, setSelectedFont] = useState(font ? font : 'serif');
  const [audio, setAudio] = useState(new Audio(''));

  const handleSelect = (e) => {
    e.preventDefault();
    setSelectedFont(e.target.value)
    localStorage.setItem('font', e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}/${query}`);
        if (!response.ok) {
          const error = await response.json();
          setIsOpen(true);
          setError(error);
          throw new Error("Network response was not OK");
        }
        const data = await response.json();
        setResults(data);

        // find url for audio
        data.forEach(result => {
          const sample = result.phonetics.find(({ audio }) => audio !== "");
          setAudio(new Audio(sample.audio))
        })
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      }
    }
    fetchData();
  }

  return (
    <div className={selectedFont}>
      <div className='toolbar'>
        <Flex align='center'>
          <Box>
            <Icon as={RiBook2Line} boxSize={8} />
          </Box>
          <Spacer />
          <Box>
            <Flex align='center'>
              <Box>
                <Select onChange={handleSelect} defaultValue={selectedFont}>
                  <option value='serif'>Serif</option>
                  <option value='sans-serif'>Sans Serif</option>
                  <option value='monospace'>Monospace</option>
                </Select>
              </Box>
              <Spacer />
              <Box p={2}>
                <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark' ? true : false} />
              </Box>
              <Spacer />
              <Box>
                <MoonIcon />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </div>

      <div className='form-container' style={{ margin: '20px 0' }}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <InputGroup>
              <Input
                placeholder='Search dictionary...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <InputRightElement>
                <IconButton type="submit" aria-label='search' icon={<SearchIcon />} />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </form>
      </div>

      {results.length > 0 && results.map((result, index) => (
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
      ))}
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

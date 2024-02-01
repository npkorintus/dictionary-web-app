import React, { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { Icon, IconButton, Flex, Box, Spacer } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement, Select, Switch } from '@chakra-ui/react'
// import { Switch } from '@chakra-ui/react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

import { useColorMode } from '@chakra-ui/react'

import { MoonIcon, SearchIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { RiBook2Line } from "react-icons/ri";
import { FaPlayCircle } from "react-icons/fa";

import { mockData } from './mockData'

const baseUrl = `https://api.dictionaryapi.dev/api/v2/entries/en`;
const font = localStorage.getItem('font');

console.log('font: ', font)

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  console.log('colorMode: ', colorMode)
  console.log('mockData: ', mockData)
  const [selectedFont, setSelectedFont] = useState(font ? font : 'serif');
  const [audio, setAudio] = useState(new Audio(''));

  // const font = localStorage.getItem('font');
  console.log('audio: ', audio)


  const handleSelect = (e) => {
    e.preventDefault();
    console.log('e.target.val: ', e.target.value)
    setSelectedFont(e.target.value)
    localStorage.setItem('font', e.target.value);
  }

  // useEffect(() => {
  //   setResults(mockData)
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('search for word: ', searchValue)
    // setSearchValue(e.target.value)

    // fetch(`${baseUrl}/${searchValue}`)
    //   .then(response => {
    //     console.log('res: ', response)
    //     //response.json()
    //     setData(response.data)
    //   })
    //   // .then(data => setData(data))
    //   .catch(err => console.error(err));
    lookup();
  }

  async function lookup () {
    try {
      const response = await fetch(`${baseUrl}/${searchValue}`);
      // console.log('response: ', response)
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setResults(data);

        // find url for audio
        data.forEach(result => {
          const sample = result.phonetics.find(({ audio }) => audio !== "");
          setAudio(new Audio(sample.audio))
        })

      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    lookup();
  }, []);

  // useEffect(() => {
  //   fetch(`${baseUrl}/${searchValue}`)
  //     .then(response => response.json)
  //     .then(data => setData(data))
  //     .catch(err => console.error(err));
  // })

  console.log('data: ', data)

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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
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
        <div key={`${result.word}-${index}`}>
          <Flex>
            <Box>
              <div style={{ fontWeight: 'bold' }}>{result.word}</div>
              <div style={{ color: 'purple' }}>{result.phonetic}</div>
            </Box>
            <Spacer />
            <Box>
              {audio && <button onClick={() => audio.play()}><Icon as={FaPlayCircle} boxSize={12} /></button>}
            </Box>
          </Flex>

          {result.meanings.map((meaning, index) => {
            const partOfSpeech = meaning.partOfSpeech;

            return (
            <div key={partOfSpeech} style={{ padding: '16px', margin: '16px' }}>
              <div style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                {meaning.partOfSpeech}
              </div>
              <div style={{ fontWeight: 'lighter', color: 'gray' }}>Meaning</div>
              <ul key={`${partOfSpeech}-${index}-list`} style={{ margin: '8px 24px'}}>
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
                  {/* {meaning.synonyms.map((synonym, index) => (<span key={index} style={{ color: 'purple', fontWeight: 'bold' }}>{synonym}</span>))} */}
                  <span style={{ color: 'purple', fontWeight: 'bold' }}>{meaning.synonyms.join(', ')}</span>
                </div>
              ) : null}
              {result.meanings.length > 1 ? <hr/> : null}
            </div>)
          })}
          <div style={{ fontSize: '12px' }}>
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

    </div>
  )
}

export default App

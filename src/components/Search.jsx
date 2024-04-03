import React, { useState } from 'react';

import { FormControl, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

const baseUrl = `https://api.dictionaryapi.dev/api/v2/entries/en`;

function Search(props) {
    const { setResults, setAudio, setError, setIsOpen} = props;
    const [query, setQuery] = useState('');

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
    )
}

export default Search;

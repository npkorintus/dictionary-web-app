import React from 'react';

import { Box, Flex, Icon, Link, Select, Spacer, Switch } from '@chakra-ui/react';

import { MoonIcon } from '@chakra-ui/icons';
import { RiBook2Line } from "react-icons/ri";

import { useColorMode } from '@chakra-ui/react';

function Toolbar(props) {
  const { selectedFont, setSelectedFont } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSelect = (e) => {
    e.preventDefault();
    setSelectedFont(e.target.value)
    localStorage.setItem('font', e.target.value);
  }

  return (
    <div className='toolbar'>
      <Flex align='center'>
        <Box>
          <Link href='/dictionary-web-app/' aria-label='Home' title='Home'>
            <Icon as={RiBook2Line} boxSize={8} />
          </Link>
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
  )
}

export default Toolbar;

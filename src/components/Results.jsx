import React from 'react';

import Home from './Home';
import Word from './Word';

function Results(props) {
  const { results, audio } = props;

  return (
    <>
      {results.length > 0 ? results.map((result, index) => (
        <Word result={result} index={index} audio={audio} key={`${result.word}-${index}`} />
      )) : <Home />}
      {results.length > 1 ? <hr /> : null}
    </>
  )
}

export default Results;

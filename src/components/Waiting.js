import React from 'react';
import { css } from '@emotion/core';
import { BeatLoader as LoaderAnimation } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Waiting extends React.Component {


  render() {
    const { props: { loading } } = this;

    return (
      <div className='hero sweet-loading'>
        <p className='has-text-primary'>Loading…</p>
        <LoaderAnimation
          css={override}
          sizeUnit={'px'}
          size={24}
          color={'turquoise'}
          loading={loading}
        />
      </div>
    );
  }
}


export default Waiting;

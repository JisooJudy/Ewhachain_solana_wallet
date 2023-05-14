import React, { useEffect } from 'react'; // useEffect를 활용할 것 
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// 원하는 대로 바꿔보세요 
const TWITTER_HANDLE = 'Ewhachain';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {


  return (
    <div className="App">
        <div className="header-container">
            <div classname ="header">
            <div className='subHeader'>˚₊✩‧*⋆⁺₊⋆ </div>
                <img
                  src="/ewhachain.png"
                  alt="solana icon"
                  width={270}
                  height={40}
                />
              <div className='subHeader'>with</div>
              <img
                src="/solanaLogo.png"
                alt="solana icon"
                width={200}
                height={40}
              />
            <div className='subHeader'>⋆₊⁺⋆*‧✩₊˚ </div>
            </div>
          <p className="gradcircle">⛓ Welcome to Ewhachain ⛓</p>
          <p className="sub-text">
            ✨ Connect your Phantom wallet and view your GIF collection ✨
          </p>
          <p>
          </p>
        </div>
        
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Blockchain Academic Club @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
  );
};

export default App;
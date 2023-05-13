import React, { useEffect, useState } from 'react'; // useEffect를 활용할 것 
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// 원하는 대로 바꿔보세요 
const TWITTER_HANDLE = 'Ewhachain';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
	'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
	'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
	'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
]

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  //Phantom wallet과 연결이 되어있는지 확인하는 함수 
  const checkIfWalletIsConnected = async () => {
    // We're using optional chaining (question mark) to check if the object is null
      if (window?.solana?.isPhantom) {
        console.log('Phantom wallet found!');
        const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log(
         'Connected with Public Key:',
          response.publicKey.toString()
       );
       setWalletAddress(response.publicKey.toString());
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    };

    const connectWallet = async () => {
      const { solana } = window;
    
      if (solana) {
        const response = await solana.connect();
        console.log('Connected with Public Key:', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      }
    };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <div className="gif-grid">
        {TEST_GIFS.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

    //useEffct 먼저 공부할 필요가 있을듯 이 함수가 어떻게 작동하는지 모름
    useEffect(() => {
      const onLoad = async () => {
        await checkIfWalletIsConnected();
      };
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    },[]);

  return (
    <div className="App">
			<div className={walletAddress ? 'authed-container' : 'container'}>
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
          {/* Render your connect to wallet button right here */}
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
          <p></p>
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
    </div>
  );
};

export default App;
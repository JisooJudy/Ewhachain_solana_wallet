import React, { useEffect, useState  } from 'react'; // useEffect를 활용할 것 
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// 원하는 대로 바꿔보세요 
const TWITTER_HANDLE = 'Ewhachain';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
	'https://media.tenor.com/lbEsggSJUOYAAAAd/solath-solana.gif',
  'https://pbs.twimg.com/media/FlwQOXhaYAE9CpE?format=jpg&name=large',
  'https://pbs.twimg.com/media/FvGpa9BaUAAQWjo.jpg',
	'https://blog.flipsidecrypto.com/wp-content/uploads/2021/11/SolanaSpin_Notion_01-1.gif',
]

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    // We're using optional chaining (question mark) to check if the object is null
      if (window?.solana?.isPhantom) {
        console.log('Phantom wallet found!');
        const response = await window.solana.connect({ onlyIfTrusted: true });
		//자동으로 Phantom에 연결 
    console.log(
      'Connected with Public Key:',
      response.publicKey.toString()
    );setWalletAddress(response.publicKey.toString());

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

    useEffect(() => {
      const onLoad = async () => {
        await checkIfWalletIsConnected();
      };
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }, []);

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
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
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
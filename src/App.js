import {
  getMetaMaskProvider,
  getWalletBalance,
  transfer,
} from './metaMaskService';
import { useState } from 'react';

function App() {
  const [address, setAdress] = useState(
    '0x74Bd5D2B8591Ea97aFbB8FD58D4E9D2B618C4cDa'
  );
  const [to, setTo] = useState('0x84b43aE5646Af2b875B71811a4c782E0F4fceA9e');
  const [message, setMessage] = useState(
    '0x84b43aE5646Af2b875B71811a4c782E0F4fceA9e'
  );
  const [quantity, setQuantity] = useState('0.1');
  function getBalanceHanddler() {
    getWalletBalance(address).then((balance) => setMessage(balance));
  }

  function transferHanddler() {
    transfer(address, to, quantity)
      .then((tx) => setMessage(tx))
      .catch((err) => setMessage(err.message));
  }
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '10%',
          marginBottom: '2rem',
        }}
      >
        <p>Wallet: </p>
        <input
          type="text"
          value={address}
          onChange={(event) => setAdress(event.target.value)}
        />
        <p>To:</p>
        <input
          type="text"
          value={to}
          onChange={(event) => setTo(event.target.value)}
        />
        <p>Quantity: </p>
        <input
          type="text"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '10%',
          gap: '0.5rem',
        }}
      >
        <button
          style={{ borderRadius: '0.3rem' }}
          onClick={() => getMetaMaskProvider()}
        >
          Click Me
        </button>
        <button
          style={{ borderRadius: '0.3rem' }}
          onClick={() => getBalanceHanddler()}
        >
          Get Balance
        </button>
        <button
          style={{ borderRadius: '0.3rem' }}
          onClick={() => transferHanddler()}
        >
          Transfer
        </button>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

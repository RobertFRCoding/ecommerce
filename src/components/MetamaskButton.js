import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // Importa la biblioteca web3 directamente

function MetamaskButton() {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadAccount = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            const fullAccount = accounts[0];
            const firstFour = fullAccount.substring(0, 4);
            const lastFour = fullAccount.substring(fullAccount.length - 4);
  
            setAccount(`${firstFour}...${lastFour}`);
        }
      }
    };

    loadAccount();
  }, []);

  return (
    <div>
      {account ? (
        <p>Conectado: {account}</p>
      ) : (
        <button onClick={() => connectMetamask()}>Conectar Metamask</button>
      )}
    </div>
  );
}

const connectMetamask = async () => {
  try {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      console.log('Metamask no está instalado o no es compatible.');
    }
  } catch (error) {
    console.error(error);
  }
};

export default MetamaskButton; 

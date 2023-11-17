import React, { useState, useEffect } from 'react';
import { getWeb3, getContract, registrarEmpresa } from '../contract';

function RegistroEmpresas() {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nifEmpresa, setNifEmpresa] = useState('');
  const [wallet, setWallet] = useState('');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      try {
        const web3 = await getWeb3();
        const contractInstance = await getContract(web3);
        setContract(contractInstance);
  
        // Escuchar eventos después de inicializar el contrato
        contractInstance.events.EmpresaRegistrada({}, (error, event) => {
          if (!error) {
            alert('Empresa registrada con éxito');
          } else {
            console.error('Fallo al registrar la Empresa: ' + error);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    initContract();
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (!contract) {
        throw new Error('El contrato no está disponible.');
      }
      if (!nombreEmpresa || !nifEmpresa || !wallet) {
        throw new Error('Por favor, complete todos los campos.');
      }
  
      await registrarEmpresa(contract, nombreEmpresa, nifEmpresa, wallet);
      alert('Empresa registrada con éxito');
    } catch (error) {
      console.error(error);
      console.log('Fallo al registrar la Empresa: ' + error.message);
    }
  };
  

  return (
    <div>
      <h1>Registro de Empresas</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre de la Empresa:</label>
        <input type="text" value={nombreEmpresa} onChange={(e) => setNombreEmpresa(e.target.value)} required />

        <label>NIF de la Empresa:</label>
        <input type="text" value={nifEmpresa} onChange={(e) => setNifEmpresa(e.target.value)} required />

        <label>Dirección de Wallet:</label>
        <input type="text" value={wallet} onChange={(e) => setWallet(e.target.value)} required />

        <button type="submit">Registrar Empresa</button>
      </form>
    </div>
  );
}

export default RegistroEmpresas;

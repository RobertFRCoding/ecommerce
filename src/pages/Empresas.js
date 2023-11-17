import React, { useState, useEffect } from 'react';
import { getWeb3, getContract, Empresas as ContratoEmpresas } from '../contract';

function Empresas() {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nifEmpresa, setNifEmpresa] = useState('');
  const [wallet, setWallet] = useState('');
  const [inputWallet, setInputWallet] = useState('');
  const [contractInstance, setContractInstance] = useState(null);

  const obtenerInformacionEmpresa = async (walletAddress) => {
    try {
      // Realizar la lectura desde el contrato
      const resultado = await contractInstance.methods.empresas(walletAddress).call();
      console.log('Resultado de la lectura:', resultado);
  
      // Actualizar el estado con los datos obtenidos
      setNombreEmpresa(resultado.nombreEmpresa);
      setNifEmpresa(resultado.nifEmpresa);
      setWallet(resultado.wallet);
    } catch (error) {
      console.error('Error al obtener información de la empresa:', error);
    }
  };
  
  

  const handleClick = () => {
    if (inputWallet.trim() !== '') {
      setWallet(inputWallet);
      obtenerInformacionEmpresa(inputWallet);
    } else {
      console.error('Por favor, introduce una dirección de wallet válida');
    }
  };

  const cargarContrato = async () => {
    try {
      // Obtener instancias de Web3 y contrato
      const web3 = await getWeb3();
      console.log('Web3 conectado:', web3);
  
      const contrato = await getContract(web3);
      console.log('Contrato cargado:', contrato);
  
      setContractInstance(contrato);
    } catch (error) {
      console.error('Error al cargar el contrato:', error);
    }
  };
  

  // Llamar a la función para cargar el contrato cuando el componente se monta
  useEffect(() => {
    cargarContrato();
  }, []);

  return (
    <div>
      <h1>Datos de la Empresa</h1>
      <p>Nombre de la empresa: {nombreEmpresa}</p>
      <p>NIF de la empresa: {nifEmpresa}</p>
      <p>Wallet: {wallet}</p>

      {/* Campo de entrada para la dirección de la wallet */}
      <label>
        Introduce la dirección de la wallet:
        <input
          type="text"
          value={inputWallet}
          onChange={(e) => setInputWallet(e.target.value)}
        />
      </label>

      {/* Botón para cargar la wallet y obtener información de la empresa */}
      <button onClick={handleClick}>Obtener Información</button>
    </div>
  );
}

export default Empresas;

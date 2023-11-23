import React, { useState, useEffect } from 'react';
import { getWeb3, getContract, registrarEmpresa, Empresas } from '../contract';

function RegistroEmpresas() {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nifEmpresa, setNifEmpresa] = useState('');
  const [contract, setContract] = useState(null);
  const [wallet, setWallet] = useState('');

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

        // Obtener la dirección de la billetera conectada
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        }
      } catch (error) {
        console.error('Error al inicializar el contrato:', error);
      }
    };

    initContract();
  }, []);

  // ...

const verificarEmpresaExistente = async () => {
  try {
    if (!contract) {
      throw new Error('El contrato no está disponible');
    }

    // Verifica si la dirección de la billetera no está vacía
    if (!wallet) {
      console.error('La dirección de la billetera no puede estar vacía.');
      return true;
    }

    const informacionEmpresa = await Empresas(contract, wallet);

    console.log('Información de la empresa:', informacionEmpresa);

    if (informacionEmpresa.nombre !== '' && informacionEmpresa.wallet !== '') {
      alert('Ya existe una empresa asociada a esta wallet.');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error en verificarEmpresaExistente:', error);
    return true;
  }
};

// ...


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!nombreEmpresa || !nifEmpresa) {
        throw new Error('Por favor, complete todos los campos.');
      }

      const empresaExistente = await verificarEmpresaExistente();

      if (empresaExistente) {
        return;
      }

      await registrarEmpresa(contract, nombreEmpresa, nifEmpresa, wallet);
      alert('Empresa registrada con éxito');
    } catch (error) {
      console.error('Fallo al registrar la Empresa:', error.message);
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

        <button type="submit">Registrar Empresa</button>
      </form>
    </div>
  );
}

export default RegistroEmpresas;

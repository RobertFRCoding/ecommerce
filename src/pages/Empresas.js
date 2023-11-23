// Empresas.js
import React, { useState, useEffect } from 'react';
import { getWeb3, getContract, ObtenerProducto } from '../contract';

function Empresas() {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nifEmpresa, setNifEmpresa] = useState('');
  const [wallet, setWallet] = useState('');
  const [inputNombreProducto, setInputNombreProducto] = useState('');
  const [productoInfo, setProductoInfo] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const obtenerInformacionEmpresa = async (walletAddress) => {
    try {
      setLoading(true);
      setError(null);

      if (!contractInstance) {
        throw new Error('El contrato no está disponible');
      }

      const resultadoEmpresa = await contractInstance.methods.empresas(walletAddress).call();
      console.log('Resultado de la lectura de la empresa:', resultadoEmpresa);

      setNombreEmpresa(resultadoEmpresa.nombreEmpresa);
      setNifEmpresa(resultadoEmpresa.nifEmpresa);
      setWallet(resultadoEmpresa.wallet);
    } catch (error) {
      console.error('Error al obtener información de la empresa:', error);
      setError('Hubo un error al obtener la información de la empresa.');
    } finally {
      setLoading(false);
    }
  };

  const obtenerInformacionProducto = async (nombreProducto) => {
    try {
      setLoading(true);
      setError(null);
  
      if (!contractInstance) {
        throw new Error('El contrato no está disponible');
      }
  
      const resultadoProducto = await ObtenerProducto(contractInstance, nombreProducto);
      console.log('Después de llamar a ObtenerProducto, resultado:', resultadoProducto);
  
      if (resultadoProducto === null) {
        throw new Error('La respuesta del contrato no tiene el formato esperado');
      }
  
      setProductoInfo(resultadoProducto);
    } catch (error) {
      console.error('Error al obtener información del producto:', error);
      setError(`Hubo un error al obtener la información del producto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  const handleClickEmpresa = () => {
    if (wallet.trim() !== '' && contractInstance) {
      obtenerInformacionEmpresa(wallet);
    } else {
      setError('Por favor, introduce una dirección de wallet válida o carga el contrato correctamente.');
    }
  };

  const handleClickProducto = () => {
    if (inputNombreProducto.trim() !== '' && contractInstance) {
      obtenerInformacionProducto(inputNombreProducto);
    } else {
      setError('Por favor, introduce un nombre de producto válido o carga el contrato correctamente.');
    }
  };

  const cargarContrato = async () => {
    try {
      const web3 = await getWeb3();
      console.log('Web3 conectado:', web3);

      const contrato = await getContract(web3);
      console.log('Contrato cargado:', contrato);

      setContractInstance(contrato);
    } catch (error) {
      console.error('Error al cargar el contrato:', error);
      setError('Hubo un error al cargar el contrato.');
    }
  };

  useEffect(() => {
    cargarContrato();
  }, []);

  useEffect(() => {
    console.log('productoInfo:', productoInfo);
  }, [productoInfo]);

  return (
    <div>
      <h1>Datos de la Empresa</h1>
      <p>Nombre de la empresa: {nombreEmpresa}</p>
      <p>NIF de la empresa: {nifEmpresa}</p>
      <p>Wallet: {wallet}</p>

      <label>
        Introduce la dirección de la wallet:
        <input
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
      </label>

      <button onClick={handleClickEmpresa}>Obtener Información de la Empresa</button>

      <h2>Buscar Producto por Nombre</h2>
      <label>
        Introduce el nombre del producto:
        <input
          type="text"
          value={inputNombreProducto}
          onChange={(e) => setInputNombreProducto(e.target.value)}
        />
      </label>

      <button onClick={handleClickProducto}>Obtener Información del Producto</button>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      <div>
        {productoInfo ? (
          <div>
            <h2>Información del Producto</h2>
            <p>Nombre del Producto: {productoInfo.nombreProducto}</p>
            <p>Stock: {productoInfo.stock}</p>
            <p>Nombre de la Empresa: {productoInfo.nombreEmpresa}</p>
            <p>ID del Producto: {productoInfo.productoId}</p>
            <p>Stock de la Empresa: {productoInfo.stockEmpresa}</p>
          </div>
        ) : (
          <p>La información del producto no está disponible.</p>
        )}
      </div>
    </div>
  );
}

export default Empresas;

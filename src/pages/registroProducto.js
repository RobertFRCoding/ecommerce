import React, { useState, useEffect } from 'react';
import { getWeb3, getContract, registrarProducto  } from '../contract';

function RegistroProducto() {
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [stock, setStock] = useState('');
    const [contract, setContract] = useState(null);
    const [wallet, setWallet] = useState('');

    useEffect(() => {
      const initContract = async () => {
        try {
          const web3 = await getWeb3();
          const contractInstance = await getContract(web3);
          setContract(contractInstance);
    
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setWallet(accounts[0]);
    
          }
    
          contractInstance.events.ProductoRegistrado({}, (error, event) => {
            if (!error) {
              alert('Producto registrado con éxito');
            } else {
              console.error('Fallo al registrar el producto: ' + error);
            }
          });
        } catch (error) {
          console.error('Error al inicializar el contrato:', error);
        }
      };
    
      initContract();
    }, []);
    

    
    

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!nombreProducto || !precioProducto || !stock) {
        throw new Error('Por favor, complete todos los campos.');
      }

      

      await registrarProducto(contract, nombreProducto, precioProducto, stock, wallet);
      alert('Producto registrado con éxito');
    } catch (error) {
      console.error('Fallo al registrar el Producto:', error.message);
    }
  };

  return (
    <div>
      <h1>Registro de Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre del Producto:</label>
        <input type="text" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} required />

        <label>Precio del Producto:</label>
        <input type="text" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} required />

        <label> Numero de Stock:</label>
        <input type="text" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <button type="submit">Registrar Producto</button>
      </form>
    </div>
  );
}

export default RegistroProducto;
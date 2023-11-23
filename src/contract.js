// contract.js
import Web3 from 'web3';
import contractAbi from './contratos/eCommerce_Robert.json';

let web3;
const contractAddress = '0x13455f7d16e4b4a29E14897718CfD8e1A8eB88e4';

const getContract = async () => {
  return new web3.eth.Contract(contractAbi, contractAddress);
};

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          resolve(web3);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      resolve(web3);
    } else {
      reject(new Error('No Web3 provider detected'));
    }
  });

const registrarEmpresa = async (contract, nombreEmpresa, nifEmpresa, wallet) => {
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No hay cuentas disponibles.');
    }

    await contract.methods.registrarEmpresa(nombreEmpresa, nifEmpresa, wallet).send({ from: accounts[0] });
  } catch (error) {
    throw error;
  }
};

const registrarProducto = async (contract, nombreProducto, precioProducto, stock, wallet) => {
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No hay cuentas disponibles.');
    }
    await contract.methods.registrarProducto(nombreProducto, precioProducto, stock, wallet).send({ from: accounts[0] });
  } catch (error) {
    throw error;
  }
};

const Empresas = async (contract, wallet) => {
  try {
    const resultado = await contract.methods.empresas(wallet).call();
    return {
      nombre: resultado.nombreEmpresa,
      nif: resultado.nifEmpresa,
      wallet: resultado.wallet,
    };
  } catch (error) {
    console.error('Error al obtener la información de la empresa:', error);
    throw error;
  }
};

const ObtenerProducto = async (contract, nombreProducto) => {
  try {
    const resultado = await contract.methods.obtenerProducto(nombreProducto).call();
    console.log('Respuesta completa de obtenerProducto:', resultado);

    if (resultado && resultado.__length__ === 5) {
      return {
        nombreProducto: String(resultado[0]),
        stock: Number(resultado[1]),
        nombreEmpresa: String(resultado[2]),
        productoId: Number(resultado[3]),
        stockEmpresa: Number(resultado[4]),
      };
    } else {
      console.error('La respuesta del contrato no tiene el formato esperado:', resultado);
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la información del producto:', error);
    throw error;
  }
};




export { 
  getWeb3, 
  getContract, 
  contractAddress, 
  registrarEmpresa, 
  Empresas, 
  registrarProducto,
  ObtenerProducto
};

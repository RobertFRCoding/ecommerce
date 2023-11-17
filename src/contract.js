import Web3 from 'web3';
import contractAbi from './contratos/eCommerce_Robert.json';

let web3;
const contractAddress = '0xAAa51e3310A45cC5c247827a40777445F159527c';

const getContract = async (web3) => {
  console.log('ABI del contrato cargado:', contractAbi);
  return new web3.eth.Contract(
    contractAbi,
    contractAddress
  );
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

const Empresas = async (contract, wallet) => {
  try {
    const resultado = await contract.methods.empresas(wallet).call();
    return resultado;
  } catch (error) {
    console.error('Error al realizar la lectura del contrato:', error);
    throw error;
  }
};




export { 
  getWeb3, 
  getContract, 
  contractAddress,
  registrarEmpresa,
  Empresas
}; 
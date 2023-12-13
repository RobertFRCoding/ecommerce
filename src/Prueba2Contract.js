const Web3 = require("web3");
const contractAbi = require('./contratos/eCommerce_Robert.json');
const contractAddress = "0x13455f7d16e4b4a29E14897718CfD8e1A8eB88e4"; // Dirección del Smart Contract
const infuraApiKey = "tu_clave_de_API_de_Infura";

const getWeb3 = () => {
  const provider = new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/${infuraApiKey}`);
  const web3 = new Web3(provider);
  return web3;
};

const getContract = async () => {
  const web3 = getWeb3();
  return new web3.eth.Contract(contractAbi, contractAddress);
};

const registerCompany = async (nombreEmpresa, nifEmpresa, wallet) => {
  const web3 = getWeb3();
  const accounts = await web3.eth.getAccounts();

  if (accounts.length === 0) {
    throw new Error("No hay cuentas disponibles. Por favor, crea una cuenta Ethereum antes de intentar registrar una empresa.");
  }

  try {
    const contract = await getContract();
    const tx = await contract.methods.registrarEmpresa(nombreEmpresa, nifEmpresa).send({
      from: wallet,
    });
    console.log(tx.transactionHash);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Aquí configura tus valores
const nombreEmpresa = "Mi empresa";
const nifEmpresa = "12345678A";
const wallet = "0x1234567890abcdef01234567890abcdef01";

registerCompany(nombreEmpresa, nifEmpresa, wallet);

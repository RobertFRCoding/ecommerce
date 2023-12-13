
//1.- Importamos las bibliotecas necesarias
const Web3 = require("web3");
const contractAddress = "0x13455f7d16e4b4a29E14897718CfD8e1A8eB88e4"; // Dirección del Smart Contract
const infuraApiKey = "https://goerli.infura.io/v3/e35b54534ac24818bd38a231817f12ad";


//2.- Crear una instancia de la biblioteca Web3 y conectarla a la red Ethereum. Hay dos metodos:
//2.1.- Usando un RPC externo, que es una forma más confiable y compatible con todos los navegadores.
/*
const web3 = new Web3("https://rinkeby.infura.io/v3/...");
*/
//2.2.- Usando el proveedor de Web3 integrado, que es una forma más sencilla y ligera.El proveedor de Web3 integrado es una forma más conveniente de conectarse a la red Ethereum si estás usando un navegador moderno, ya que no requiere configurar un nodo Ethereum externo. Sin embargo, el proveedor de Web3 integrado puede no estar disponible en todos los navegadores o en todas las situaciones.

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    if (window.ethereum) { // Utilizar el proveedor de Web3 integrado si está disponible
      const web3 = new Web3(window.ethereum);
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          resolve(web3);
        })
        .catch((error) => {
          reject(error);
        });
    } else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      resolve(web3);
    } else {
      reject(new Error('No Web3 provider detected'));
    }
  });


/*PRUEBA CON INFURA
const getWeb3 = () => {
  const provider = new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/${infuraApiKey}`);
  return new Web3(provider);
};


const getContract = async () => {
  const web3 = getWeb3();
  return new web3.eth.Contract(contractAbi, contractAddress);
};

*/

  //3.- Nos traemos el contrato en ABI


  const contractAbi = require('./contratos/eCommerce_Robert.json');
  const getContract = async () => {
        return new web3.eth.Contract(contractAbi, contractAddress);

  };

  /*Tambien se puede traer el contrato de esta manera

const contract = new web3.eth.Contract(
  JSON.parse(
    fs.readFileSync("./contracts/eCommerce_Robert.json", "utf-8")
  ),
  contractAddress
);
*/





//Vamos ahora con las llamadas a las funciones
//4.- Función register company
  const registerCompany = async (nombreEmpresa, nifEmpresa, wallet) => {
    const accounts = await web3.eth.accounts(); //Comprueba si hay cuentas disponibles.
    if (accounts.length === 0) {
      throw new Error(
        "No hay cuentas disponibles. Por favor, crea una cuenta Ethereum antes de intentar registrar una empresa."
      );
    }

    try {
      const tx = await contract.methods.registrarEmpresa(nombreEmpresa, nifEmpresa).send({
        from: wallet,
      });
      console.log(tx.hash);
    } catch (error) {
      console.log(error);
      console.log("Código de error:", error.code);
      console.log("Mensaje de error:", error.message);
    }
  };

  /*Se pueden usar dos métodos: eth_accounts() o getAccounts().
    El método eth_accounts() devuelve una lista de todas las cuentas Ethereum disponibles en el navegador. 
    El método getAccounts() devuelve una lista de las cuentas Ethereum disponibles en la instancia de la biblioteca Web3.

  En el contexto de la función registrarEmpresa(), la diferencia entre los dos métodos es que el método eth_accounts() siempre devolverá una lista de cuentas, incluso si el usuario no tiene ninguna cuenta Ethereum. El método getAccounts(), por otro lado, solo devolverá una lista de cuentas si el usuario tiene al menos una cuenta Ethereum.


  Para hacer un marketplace, la función más correcta sería eth_accounts, ya que es más segura. Esta función siempre comprobará si hay cuentas disponibles antes de intentar registrar una empresa. Esto es importante para evitar errores y garantizar que el marketplace funcione correctamente.

  getAccounts, por otro lado, es menos segura, ya que puede intentar registrar una empresa incluso si el usuario no tiene ninguna cuenta Ethereum. Esto puede provocar errores y problemas de seguridad.
  */


  /* PROBAR QUE FUNCIONA HASTA AHORA
  const nombreEmpresa = "Mi empresa";
  const nifEmpresa = "12345678A";
  const wallet = "0x1234567890abcdef01234567890abcdef01";
  
  (async () => {
    try {
      // Obtener la instancia de Web3
      const web3 = await getWeb3();
  
      // Obtener la instancia del contrato
      const contract = await getContract(web3);
  
      // Registrar la empresa
      await registerCompany(contract, nombreEmpresa, nifEmpresa, wallet);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
  */


//5.- Función register product
  const registerProduct = async (name, price, stock) => {
    try {
      const contract = await getContract();  // Obtén la instancia del contrato
      const tx = await contract.methods.registrarProducto(name, price, stock).send({
        from: wallet,  // La dirección de la billetera desde la que se enviará la transacción
      });
      console.log(tx.transactionHash);  // Imprime el hash de la transacción en la consola
    } catch (error) {
      console.error("Error:", error);  // Captura y maneja cualquier error que ocurra durante la ejecución
    }
  }


//6.- Función Info empresa

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

//7.- Función comprar producto  ----

const buyProduct = async (contract, wallet, productId, quantity) => {
  try {
    // Obtener la cuenta actual
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No hay cuentas disponibles.');
    }

    // Realizar la compra del producto
    const result = await contract.methods.comprarProducto(productId, quantity).send({
      from: wallet,
    });

    // Imprimir el hash de la transacción en la consola
    console.log('Hash de la transacción:', result.transactionHash);

    // Devolver información relevante sobre la transacción
    return {
      success: true,
      transactionHash: result.transactionHash,
      blockNumber: result.blockNumber,
      gasUsed: result.gasUsed,
      status: result.status,
      events: result.events,
      // Puedes agregar más información según tus necesidades
    };
  } catch (error) {
    console.error('Error al comprar el producto:', error);
    throw error; // Relanzar el error para manejarlo en la capa superior si es necesario
  }
};

// Uso de la función
const result = await buyProduct(contract, wallet, productId, quantity);
if (result.success) {
  console.log('¡La compra fue exitosa!');
  console.log('Hash de la transacción:', result.transactionHash);
  // Puedes acceder a más información si es necesario
} else {
  console.log('La compra falló. Consulta los detalles del error.');
}






//8.- Función Info producto
//Se asume que nameOrId puede ser tanto un nombre de producto como un identificador. Se utiliza la función productIdToHex para convertir el nombre en un identificador si es necesario.

const getProduct = async (nameOrId) => {
  try {
    const productId = await productIdToHex(nameOrId);
    const product = await contract.methods.obtenerProducto(productId).call();
    return {
      nombreProducto: product[0],
      stock: parseInt(product[1]),
      nombreEmpresa: product[2],
      id: parseInt(product[3]),
      stockEmpresa: parseInt(product[4]),
    };
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
};



//9.- Función auxiliar ----
function productIdToHex(nameOrId) {
  if (typeof nameOrId === "string") {
    return contract.methods.productoIdPorNombre(nameOrId).call();
  } else {
    return nameOrId;
  }
}


//10.- Función para modificar el precio de un producto ----
const modificarPrecioProducto = async (contract, productoId, nuevoPrecio) => {
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No hay cuentas disponibles.');
    }
    await contract.methods.modificarPrecioProducto(productoId, nuevoPrecio).send({ from: accounts[0] });
  } catch (error) {
    throw error;
  }
};

//11.- Función para eliminar un producto ----
const eliminarProducto = async (contract, productoId) => {
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No hay cuentas disponibles.');
    }
    await contract.methods.eliminarProducto(productoId).send({ from: accounts[0] });
  } catch (error) {
    throw error;
  }
};




/*
const wallet = "0x..."; // Dirección de wallet del usuario

// Registramos una empresa
registerCompany("Mi empresa", "123456789", wallet);

// Registramos un producto
registerProduct("Producto 1", 10, 10);

// Compramos un producto
buyProduct(productIdToHex("Producto 1"), 1);

// Obtenemos información sobre un producto
const product = getProduct("Producto 1");
console.log(product);
*/



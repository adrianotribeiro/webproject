import Web3 from 'web3';

//função de conecção
export async function getMetaMaskProvider() {
  if (!window.ethereum) throw new Error('No MetaMaks found!');
  //Se não tiver ethereum

  const web3 = new Web3(window.ethereum);

  //permissão para conectar as contas na carteira do usuário - array de accounts
  const accounts = await web3.eth.requestAccounts();
  console.log(accounts);
  //Permissão negada ou se ele escolher nenhuma (zero contas);
  if (!accounts || !accounts.length) {
    throw new Error('Permission required!');
  }

  return web3;
  //retorna o endereço da carteira
}

export async function getWalletBalance(address) {
  const web3 = await getMetaMaskProvider();
  //acessa o endereço da carteira
  const balance = await web3.eth.getBalance(address);
  //acessa o saldo da carteira através do endereço - (hexadecimal)
  return web3.utils.fromWei(balance);
  //retorna o valor mais próximo ao que se encontra na carteira
  //Ficando mais fácil de entender e sendo o mesmo valor encontrado na carteira do usuário (sem arrendendamento)
  //Informações acessadas através da blockchain
}

//função que determina uma transferência
//from => quem está enviando
//to => Para quem está enviando
//quantity quantidade enviada
export async function transfer(from, to, quantity) {
  const web3 = await getMetaMaskProvider();
  const value = web3.utils.toWei(quantity, 'ether');
  //convertendo para facilitação de valores 0.5 para será 500000000000000000 (exemplo)

  const nonce = await web3.eth.getTransactionCount(from, 'latest');
  //acessa o número de transações da carteira passando o endereço e a partir de um bloco
  //quantidade de transações já realizadas por essa careteira conforme registrado no bloco mais recente da blockchain
  const transaction = {
    from,
    to,
    value,
    gas: 21000,
    nonce,
  };
  //transação
  //from => precisa de autorização
  //to => não precisa
  //value => valor a ser transferido
  //gas => taxa de rede que será paga, gasta, remuneração aos mineradores
  //nonce número incremental, indice da trnsação da conta - evita gasto duplo, ataque de replay, fraudes e etc

  const tx = await web3.eth.sendTransaction(transaction);
  //envia pra blockchain a transação
  //retorna um recibo de trnasação

  return tx.transactionHash;
}

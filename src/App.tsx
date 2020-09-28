import React from "react";
import { Message, Button } from "semantic-ui-react";
import { useWeb3Context } from "./contexts/Web3";
import "./App.css";
import { unlockAccount } from "./api/web3";
import useAsync from "./components/useAsync";
// import DepositForm from "./App/DepositForm";
import MultiSigWallet from "./App/MultiSigWallet";
function App() {
  const {
    state: { account },
    updateAccount,
  } = useWeb3Context();
  const { pending, error, call } = useAsync(unlockAccount);

  async function onClickConnect() {
    const { error, data } = await call(null);
    if (error) {
      console.error(error);
    }
    if (data) {
      //update account
      updateAccount(data);
    }
  }

  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Delfy Multi-sig Wallet</h1>
        <div>Account: {account}</div>
        {/* <div>Contract: {account}</div> */}
        <Message warning>
          {!account ? "Metamask is not connected" : "Connected"}
        </Message>
        <Button
          color='green'
          onClick={() => onClickConnect()}
          disabled={pending}
          loading={pending}
        >
          Connect to Metamask
        </Button>
        <MultiSigWallet />
      </div>
    </div>
  );
}

export default App;

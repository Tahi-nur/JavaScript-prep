import eurosFormatter from "./euroFormatter.js";

/**
 * Wallet implementation using closures.
 */
function createWallet(name, cash = 0) {
  let dailyAllowance = 40;
  let dayTotalWithdrawals = 0;

  function deposit(amount) {
    cash += amount;
  }

  function withdraw(amount) {
    if (cash - amount < 0) {
      console.log(`${name} has insufficient funds!`);
      return 0;
    }

    if (dayTotalWithdrawals + amount > dailyAllowance) {
      console.log(`${name} has exceeded the daily allowance!`);
      return 0;
    }

    cash -= amount;
    dayTotalWithdrawals += amount;
    return amount;
  }

  function transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${name} to ${wallet.getName()}`
    );
    const withdrawnAmount = withdraw(amount);
    if (withdrawnAmount > 0) {
      wallet.deposit(withdrawnAmount);
    }
  }

  function setDailyAllowance(newAllowance) {
    dailyAllowance = newAllowance;
    console.log(`${name}'s daily allowance set to ${eurosFormatter.format(newAllowance)}`);
  }

  function resetDailyAllowance() {
    dayTotalWithdrawals = 0;
  }

  function reportBalance() {
    console.log(`Name: ${name}, balance: ${eurosFormatter.format(cash)}`);
  }

  const getName = () => name;

  return {
    deposit,
    withdraw,
    transferInto,
    setDailyAllowance,
    resetDailyAllowance,
    reportBalance,
    getName,
  };
}

function main() {
  const walletJack = createWallet("Jack", 100);
  const walletJoe = createWallet("Joe", 10);
  const walletJane = createWallet("Jane", 20);

  walletJack.transferInto(walletJoe, 50);     // allowed: 50/40 daily limit fails
  walletJack.setDailyAllowance(80);          // increase limit
  walletJack.transferInto(walletJoe, 50);     // now works

  walletJane.transferInto(walletJoe, 25);     // insufficient funds
  walletJane.deposit(20);                     // +20
  walletJane.transferInto(walletJoe, 25);     // should now work

  walletJack.reportBalance();  // Expect: 50
  walletJoe.reportBalance();   // Expect: 85
  walletJane.reportBalance();  // Expect: -5
}

main();

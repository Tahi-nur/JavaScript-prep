import eurosFormatter from './euroFormatter.js';

function deposit(amount) {
  this._cash += amount;
}

function withdraw(amount) {
  if (this._cash < amount) {
    console.log(`${this._name} has insufficient funds!`);
    return 0;
  }

  if (this._dayTotalWithdrawals + amount > this._dailyAllowance) {
    console.log(`${this._name} has exceeded the daily allowance!`);
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount;
  return amount;
}

function transferInto(wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${this._name} to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  if (withdrawnAmount > 0) {
    wallet.deposit(withdrawnAmount);
  }
}

function reportBalance() {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
}

function getName() {
  return this._name;
}

function setDailyAllowance(amount) {
  this._dailyAllowance = amount;
  console.log(`${this._name}'s daily allowance set to ${eurosFormatter.format(amount)}`);
}

function resetDailyAllowance() {
  this._dayTotalWithdrawals = 0;
}

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: 40,
    _dayTotalWithdrawals: 0,
    deposit,
    withdraw,
    transferInto,
    reportBalance,
    getName,
    setDailyAllowance,
    resetDailyAllowance,
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);      // Fails: exceeds daily allowance
  walletJack.setDailyAllowance(80);            // Increases allowance
  walletJack.transferInto(walletJoe, 50);      // Works now

  walletJane.transferInto(walletJoe, 25);      // Fails: not enough cash
  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);      // Now works

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();

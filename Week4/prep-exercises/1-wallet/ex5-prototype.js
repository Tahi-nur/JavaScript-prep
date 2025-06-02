import eurosFormatter from './euroFormatter.js';

function Wallet(name, cash) {
  this._name = name;
  this._cash = cash;
  this._dailyAllowance = 40;
  this._dayTotalWithdrawals = 0;
}

Wallet.prototype.deposit = function (amount) {
  this._cash += amount;
};

Wallet.prototype.withdraw = function (amount) {
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
};

Wallet.prototype.transferInto = function (wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${this._name} to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  if (withdrawnAmount > 0) {
    wallet.deposit(withdrawnAmount);
  }
};

Wallet.prototype.setDailyAllowance = function (amount) {
  this._dailyAllowance = amount;
  console.log(`${this._name}'s daily allowance set to ${eurosFormatter.format(amount)}`);
};

Wallet.prototype.resetDailyAllowance = function () {
  this._dayTotalWithdrawals = 0;
};

Wallet.prototype.reportBalance = function () {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
};

Wallet.prototype.getName = function () {
  return this._name;
};

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);         // Fails: exceeds daily limit
  walletJack.setDailyAllowance(80);
  walletJack.transferInto(walletJoe, 50);         // Now allowed

  walletJane.transferInto(walletJoe, 25);         // Fails: insufficient funds
  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);         // Now allowed

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();

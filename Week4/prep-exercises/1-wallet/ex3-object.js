import eurosFormatter from './euroFormatter.js';

function createWallet(name, cash = 0) {
  let dailyAllowance = 40;
  let dayTotalWithdrawals = 0;

  return {
    _name: name,
    _cash: cash,

    deposit(amount) {
      this._cash += amount;
    },

    withdraw(amount) {
      if (this._cash < amount) {
        console.log(`${this._name} has insufficient funds!`);
        return 0;
      }

      if (dayTotalWithdrawals + amount > dailyAllowance) {
        console.log(`${this._name} has exceeded the daily allowance!`);
        return 0;
      }

      this._cash -= amount;
      dayTotalWithdrawals += amount;
      return amount;
    },

    transferInto(wallet, amount) {
      console.log(
        `Transferring ${eurosFormatter.format(amount)} from ${this._name} to ${wallet.getName()}`
      );
      const withdrawnAmount = this.withdraw(amount);
      if (withdrawnAmount > 0) {
        wallet.deposit(withdrawnAmount);
      }
    },

    reportBalance() {
      console.log(
        `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
      );
    },

    setDailyAllowance(amount) {
      dailyAllowance = amount;
      console.log(`${this._name}'s daily allowance set to ${eurosFormatter.format(amount)}`);
    },

    resetDailyAllowance() {
      dayTotalWithdrawals = 0;
    },

    getName() {
      return this._name;
    },
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);      // Exceeds default daily allowance (40)
  walletJack.setDailyAllowance(80);
  walletJack.transferInto(walletJoe, 50);      // Now works

  walletJane.transferInto(walletJoe, 25);      // Fails due to insufficient funds
  walletJane.deposit(20);                      // +20
  walletJane.transferInto(walletJoe, 25);      // Now works

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();

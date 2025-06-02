import eurosFormatter from './euroFormatter.js';

class Wallet {
  #name;
  #cash;
  #dailyAllowance;
  #dayTotalWithdrawals;

  constructor(name, cash) {
    this.#name = name;
    this.#cash = cash;
    this.#dailyAllowance = 40;
    this.#dayTotalWithdrawals = 0;
  }

  get name() {
    return this.#name;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    if (this.#cash < amount) {
      console.log(`${this.#name} has insufficient funds!`);
      return 0;
    }

    if (this.#dayTotalWithdrawals + amount > this.#dailyAllowance) {
      console.log(`${this.#name} has exceeded the daily allowance!`);
      return 0;
    }

    this.#cash -= amount;
    this.#dayTotalWithdrawals += amount;
    return amount;
  }

  transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${this.#name} to ${wallet.name}`
    );
    const withdrawnAmount = this.withdraw(amount);
    if (withdrawnAmount > 0) {
      wallet.deposit(withdrawnAmount);
    }
  }

  setDailyAllowance(amount) {
    this.#dailyAllowance = amount;
    console.log(`${this.#name}'s daily allowance set to ${eurosFormatter.format(amount)}`);
  }

  resetDailyAllowance() {
    this.#dayTotalWithdrawals = 0;
  }

  reportBalance() {
    console.log(`Name: ${this.#name}, balance: ${eurosFormatter.format(this.#cash)}`);
  }
}

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50); // Exceeds default allowance (40), should fail
  walletJack.setDailyAllowance(80);       // Increases allowance
  walletJack.transferInto(walletJoe, 50); // Now allowed

  walletJane.transferInto(walletJoe, 25); // Insufficient funds
  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25); // Now allowed

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();

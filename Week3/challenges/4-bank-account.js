const bankAccount = {
  currentBalance: 250,
  transactions: [
    {
      prevAmount: 350,
      newAmount: 250,
      reason: "Donation",
    },
  ],
};

// Common function to handle payments
const makePayment = (amount, reason, onSuccess, onFail) => {
  if (bankAccount.currentBalance >= amount) {
    const prevAmount = bankAccount.currentBalance;
    const newAmount = prevAmount - amount;

    bankAccount.currentBalance = newAmount;
    bankAccount.transactions.push({
      prevAmount,
      newAmount,
      reason,
    });

    onSuccess();
  } else {
    onFail();
  }
};

const donateMoney = (amount, onSuccess, onFail) => {
  makePayment(amount, "Donation", onSuccess, onFail);
};

const payRent = (amount, onSuccess, onFail) => {
  makePayment(amount, "Rent", onSuccess, onFail);
};

/**
 * TEST CODE. DO NOT EDIT
 */

const onSuccessEnglish = () => {
  console.log("Payment successful! Thank you!");
};
const onFailEnglish = () => {
  console.log("You do not have enough money to make this payment.");
};

const onSuccessDutch = () => {
  console.log("Betaling geslaagd! Dank u!");
};
const onFailDutch = () => {
  console.log("U heeft niet voldoende saldo om deze betaling te doen.");
};

donateMoney(100, onSuccessEnglish, onFailEnglish);
console.log(bankAccount);

payRent(100, onSuccessEnglish, onFailEnglish);
console.log(bankAccount);

donateMoney(100, onSuccessDutch, onFailDutch);
console.log(bankAccount);

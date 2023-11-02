/*
  Filename: ComplexCode.js
  Description: This code demonstrates a sophisticated implementation
               of a banking system with multiple features and advanced operations.
*/

// Bank class representing the banking system
class Bank {
  constructor() {
    this.customers = []; // Array to store customer objects
    this.transactions = []; // Array to store transaction records
  }

  // Method to add a new customer
  addCustomer(name, initialBalance) {
    const customer = new Customer(name, initialBalance);
    this.customers.push(customer);
  }

  // Method to make a deposit
  deposit(customerId, amount) {
    const customer = this.getCustomerById(customerId);
    customer.balance += amount;
    this.transactions.push(new Transaction(customerId, amount, 'Deposit'));
  }

  // Method to withdraw money
  withdraw(customerId, amount) {
    const customer = this.getCustomerById(customerId);
    if (customer.balance >= amount) {
      customer.balance -= amount;
      this.transactions.push(new Transaction(customerId, amount, 'Withdrawal'));
    } else {
      throw new Error('Insufficient balance');
    }
  }

  // Method to get customer by ID
  getCustomerById(id) {
    const customer = this.customers.find((c) => c.id === id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }

  // Method to get customer details
  getCustomerDetails(customerId) {
    const customer = this.getCustomerById(customerId);
    return `ID: ${customer.id}, Name: ${customer.name}, Balance: ${customer.balance}`;
  }

  // Method to get all customers' details
  getAllCustomers() {
    return this.customers.map((customer) => 
      `ID: ${customer.id}, Name: ${customer.name}, Balance: ${customer.balance}`
    );
  }

  // Method to get all transactions for a customer
  getTransactions(customerId) {
    return this.transactions.filter((transaction) => 
      transaction.customerId === customerId
    );
  }
}

// Customer class representing a bank customer
class Customer {
  constructor(name, initialBalance) {
    this.id = Customer.getNextId(); // Unique customer ID
    this.name = name; // Customer name
    this.balance = initialBalance || 0; // Customer balance
  }

  // Static method to generate next customer ID
  static getNextId() {
    if (!this.currentId) {
      this.currentId = 1;
    }
    return this.currentId++;
  }
}

// Transaction class representing a single transaction record
class Transaction {
  constructor(customerId, amount, type) {
    this.customerId = customerId; // ID of the customer involved in the transaction
    this.amount = amount; // Transaction amount
    this.type = type; // Transaction type (Deposit/Withdrawal)
    this.date = new Date(); // Transaction date
  }
}

// Example usage
const bank = new Bank();
bank.addCustomer('John Doe', 1000);
bank.addCustomer('Jane Smith', 500);

bank.deposit(1, 500);
bank.withdraw(2, 200);

console.log(bank.getAllCustomers());
console.log(bank.getCustomerDetails(1));
console.log(bank.getTransactions(2));

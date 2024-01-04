# Expense Tracker

# About
Basic Expense Tracker App which can be used to keep a track of expenses, incomes and savings.<br>
The App is made using MERN (MongoDB, Express.js, React, Node.js) Stack.

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/)
- Install [TypeScript](https://www.typescriptlang.org/download) You will need to be able to use "tsc" command, so you will need to install TS globally.
- Install [MongoDB](https://www.mongodb.com/docs/manual/installation/)

# Getting started
- Clone the repository
```
git clone https://github.com/Alex-Kostov/expense-tracker.git
```
- Install server dependencies
```
cd expense-tracker\apps\server
npm install
npm install -g typescript # if you don't have it.
```
- Install client dependencies
```
cd expense-tracker\apps\client
npm install
```
- Create and populate database
```
cd expense-tracker\apps\server
npm run db-reset # This will require your system to have mongodb and will crate new database expenseTracker with dummy data. 
```

- Start the Apps
```
cd expense-tracker\apps\server
npm run start-server

cd expense-tracker\apps\client
npm run dev
```

- Navigate to `http://localhost:5173/`

### TODO
- [X] Add dashboard page
- [X] Add Income page 
- [X] Add Expense page
- [X] Add Expense page
- [X] Connect dashboard chart
- [ ] Add Vaults Page
- [ ] Add Categories Page
- [ ] Add Error handling.
- [ ] Add build prod command.
- [ ] Add Investments Page
- [ ] Add Currencies to the App
- [ ] Redesign, styling update


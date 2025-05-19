import './index.css'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

const MoneyManager = () => {
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [transactionList, setTransactionList] = useState([])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('INCOME')

  const handleSubmit = e => {
    e.preventDefault()
    if (title.trim() === '' || amount.trim() === '') return

    const parsedAmount = parseFloat(amount)
    if (Number.isNaN(parsedAmount)) return

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parsedAmount,
      type,
    }

    setTransactionList(prev => [newTransaction, ...prev])

    if (type === 'INCOME') {
      setBalance(prev => prev + parsedAmount)
      setIncome(prev => prev + parsedAmount)
    } else {
      setBalance(prev => prev - parsedAmount)
      setExpenses(prev => prev + parsedAmount)
    }

    setTitle('')
    setAmount('')
    setType('INCOME')
  }

  const deleteTransaction = id => {
    const transactionToDelete = transactionList.find(item => item.id === id)
    if (!transactionToDelete) return

    setTransactionList(prev => prev.filter(item => item.id !== id))

    if (transactionToDelete.type === 'INCOME') {
      setBalance(prev => prev - transactionToDelete.amount)
      setIncome(prev => prev - transactionToDelete.amount)
    } else {
      setBalance(prev => prev + transactionToDelete.amount)
      setExpenses(prev => prev - transactionToDelete.amount)
    }
  }

  return (
    <div className="money-manager-section">
      <div className="welcome-card">
        <h1>Hi, Master</h1>
        <p>
          Welcome back to your <span>Money Manager</span>
        </p>
      </div>

      <MoneyDetails balance={balance} income={income} expenses={expenses} />

      <div className="details">
        <div className="add-transaction">
          <form onSubmit={handleSubmit}>
            <h3>Add Transaction</h3>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />

            <label htmlFor="type">TYPE</label>
            <select
              id="type"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              {transactionTypeOptions.map(option => (
                <option key={option.optionId} value={option.optionId}>
                  {option.displayText}
                </option>
              ))}
            </select>

            <button type="submit">Add</button>
          </form>
        </div>

        <div className="transaction-history">
          <h3>History</h3>
          <div className="transaction-list">
            <div className="transaction-header">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
              <p>Action</p>
            </div>
            <ul>
              {transactionList.map(item => (
                <TransactionItem
                  key={item.id}
                  transactionDetails={item}
                  deleteTransaction={deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoneyManager

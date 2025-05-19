import './index.css'

const TransactionItem = ({transactionDetails, deleteTransaction}) => {
  const {id, title, amount, type} = transactionDetails

  return (
    <li className="transaction-item">
      <p>{title}</p>
      <p>${amount}</p>
      <p>{type}</p>
      <button type="button" onClick={() => deleteTransaction(id)}>
        Delete
      </button>
    </li>
  )
}

export default TransactionItem

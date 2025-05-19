import './index.css'

const MoneyDetails = ({balance, income, expenses}) => (
  <div className="money-details">
    <div className="detail-card balance">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        alt="balance"
        className="icon"
      />
      <p>Your Balance</p>
      <p data-testid="balanceAmount">${balance}</p>
    </div>

    <div className="detail-card income">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        alt="income"
        className="icon"
      />
      <p>Your Income</p>
      <p data-testid="incomeAmount">${income}</p>
    </div>

    <div className="detail-card expenses">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        alt="expenses"
        className="icon"
      />
      <p>Your Expenses</p>
      <p data-testid="expensesAmount">${expenses}</p>
    </div>
  </div>
)

export default MoneyDetails

import React from "react";

function ProjectCost(props) {
  return (
    <div>
      <div class="progress-div">
        <div class="wrapper">
          <div
            class="container chart"
            data-size="350"
            data-value={props.progress}
            data-arrow="d"
          ></div>
        </div>
      </div>
      <h1 className="current-progress">
        {" "}
        {props.getDollarFigure(props.selectedProject.current_cost)} (Costs) /{" "}
        {props.getDollarFigure(props.selectedProject.budget)} (Budget)
      </h1>

      {/* EXPENSES */}
      <h1>Expenses</h1>
      <table class="rux-table">
        <tr class="rux-table__column-head">
          <th colspan="2">Description</th>
          <th>Type</th>
          <th>Amount</th>
          <th colspan="2">Options</th>
        </tr>
        {props.selectedProjectExpenses.map((expense) => (
          <tr>
            {expense.expense_type === "Labor" ? (
              <td colspan="1">{props.getExpenseDescription(expense)}</td>
            ) : (
              <td colspan="2">{props.getExpenseDescription(expense)}</td>
            )}
            {expense.expense_type === "Labor" ? (
              <td>{props.getPayRate(expense)}</td>
            ) : null}
            <td>{expense.expense_type}</td>
            <td>{props.getDollarFigure(expense.expense_amount)}</td>
            {expense.expense_type !== "Labor" ? (
              <td>
                <button
                  className="rux-button"
                  onClick={() => {
                    props.openExpenseModal(expense);
                  }}
                >
                  Edit
                </button>
              </td>
            ) : (
              <td></td>
            )}
            {expense.expense_type !== "Labor" ? (
              <td>
                <button
                  className="rux-button"
                  onClick={() => {
                    props.deleteExpense(expense);
                  }}
                >
                  Delete
                </button>
              </td>
            ) : (
              <td></td>
            )}
          </tr>
        ))}
        <tr class="rux-table__column-head">
          <th colspan="6" className="button-section">
            <div className="button-div1">
              <button
                className="rux-button"
                onClick={() => {
                  props.openExpenseModal(null);
                }}
              >
                Add Expense
              </button>
            </div>
          </th>
        </tr>
      </table>
      <br></br>
      <br></br>

      {/* FUNDING REQUESTS */}
      <h1>Funding Requests</h1>
      <table class="rux-table">
        <tr class="rux-table__column-head">
          <th>Submitted By</th>
          <th>Submit Date</th>
          <th>Request Amount</th>
          <th>Justification</th>
          <th>Suspense Date</th>
          <th>Review Date</th>
          <th>Review Status</th>
          <th>Review Note</th>
          <th>Reviewed By</th>
        </tr>
        {props.projectFundingRequests.map((request) => (
          <tr>
            <td>{props.getFullName(request.initiator)}</td>
            <td>{props.parseDatabaseDate(request.submit_date)}</td>
            <td>{props.getDollarFigure(request.request_amount)}</td>
            <td>{request.justification}</td>
            <td>{props.parseDatabaseDate(request.suspense_date)}</td>
            <td>{props.parseDatabaseDate(request.review_date)}</td>
            <td>
              <font color={props.getStatusColor(request.review_status)}>
                {request.review_status}
              </font>
            </td>
            <td>
              {request.review_note !== null ? request.review_note : "N/A"}
            </td>
            <td>{props.getFullName(request.reviewed_by)}</td>
          </tr>
        ))}
        <tr class="rux-table__column-head">
          <th colspan="9" className="button-section">
            <div className="button-div2">
              <button
                className="rux-button"
                onClick={() => {
                  props.openFundingRequestModal();
                }}
              >
                Create Funding Request
              </button>
            </div>
          </th>
        </tr>
      </table>
      <br></br>

      {!props.isProgressBarDisplayed
        ? setTimeout(() => {
            let progress = Math.round(
              (props.selectedProject.current_cost /
                props.selectedProject.budget) *
                100
            );
            props.setProgressValue(progress);
            props.setCircleProgress();
          }, 500)
        : null}
    </div>
  );
}

export default ProjectCost;
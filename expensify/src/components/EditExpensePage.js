export const EXPENSE_ID_PARAM = "id";

const EditExpensePage = (props) => {
    console.log(props);
    return (
        <div>
            this is edit comp. id: {props.match.params[EXPENSE_ID_PARAM]}
        </div>
    )
};

export default EditExpensePage;
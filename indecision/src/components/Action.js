const Action = (props) => (
    <div>
        <button
            disabled={!props.actionEnabled}
            onClick={props.handlePick}
            className="big-button"
        >What Should I Do?</button>
    </div>
);

export default Action;
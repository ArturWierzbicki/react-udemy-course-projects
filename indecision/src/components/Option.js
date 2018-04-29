const Option = ({optionText, count, deleteOption}) => (
    <div className="option">
        <p className="option__text">{count}. {optionText}</p>
        <button
            onClick={(e) => deleteOption(optionText)}
            className="button button--link"
        >remove</button>
    </div>
);

export default Option;
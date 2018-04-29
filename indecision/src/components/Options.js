import Option from "./Option";

const Options = (props) => (
    <div>

        <div className="widget-header">
        <h3 className="widget-header__title">Your Options</h3>
        <button
            className="button button--link"
            onClick={props.deleteAction}
        >Remove All</button>
        </div>

        {props.options.length === 0 && <p className="widget__message">Please add some options</p>}
        {props.options.map((option, index) =>
            <Option
                deleteOption={props.deleteSingleOption}
                key={option}
                count={index+1}
                optionText={option}/>)}
    </div>
);

export default Options;
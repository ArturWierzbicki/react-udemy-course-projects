const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    )
};

Header.defaultProps = {
    title: 'somedefault title',
}

const Action = (props) => {
    return (
        <div>
            <button disabled={!props.actionEnabled} onClick={props.handlePick}>What should I do?</button>
        </div>
    )
};

const Options = (props) => {
    return (
        <div>
            {props.options.length === 0 && <p>Please add some options</p>}
            <button onClick={props.deleteAction}>Remove all</button>
            {props.options.map((option) =>
                <Option
                    deleteOption={props.deleteSingleOption}
                key={option}
                optionText={option}/>)}
        </div>
    )
};


class AddOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log("submitted!");

        const option = e.target.elements.option.value;

        if (option) {
            const error = this.props.addOption(option);
            this.setState((prevState) => ({error}));

            if (!error) {

                e.target.elements.option.value = '';
            }


        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" name="option"/>
                    <button>Add option</button>
                </form>

            </div>
        )
    }
}

class IndecisionApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.deleteOption = this.deleteOption.bind(this);
    }

    componentDidMount() {
        const options = JSON.parse(localStorage.getItem('options'));
        if(options) {
            this.setState((prevState) => ({options}));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log("Unmounting")
    }

    deleteOption(option) {
        this.setState((prevState) => ({options: prevState.options.filter((el) => el !== option)}));
        console.log("deleting ", option)
    }

    handleDeleteOptions() {
        this.setState(() => ({options: []}))
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum]);
    }

    handleAddOption(option) {
        if (this.state.options.indexOf(option) > -1) {
            return "option exists";
        }

        this.setState((state) => {
            return {
                options: [...state.options, option]
            }
        })
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life';

        return (
            <div>
                <Header title={title} subtitle={title}/>
                <Action handlePick={this.handlePick} actionEnabled={this.state.options.length > 0}/>
                <Options deleteSingleOption={this.deleteOption}
                         deleteAction={this.handleDeleteOptions}
                         options={this.state.options}/>
                <AddOption addOption={this.handleAddOption}/>
            </div>
        )
    }
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button onClick={(e) => props.deleteOption(props.optionText)}>remove</button>
        </div>
    )
};

ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));
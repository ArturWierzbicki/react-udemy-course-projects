import React from "react";

class AddOption extends React.Component {

    state = {error: undefined};

    onFormSubmit = (e) => {
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
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.onFormSubmit}>
                    <input className="add-option__input" type="text" name="option"/>
                    <button className="button">Add option</button>
                </form>

            </div>
        )
    }
}

export default AddOption;
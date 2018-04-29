import React from "react";
import Options from "./Options";
import Action from "./Action";
import Header from "./Header";
import AddOption from "./AddOption";
import OptionModal from "./OptionModal";

class IndecisionApp extends React.Component {

    state = {
        options: [],
        selectedOption: undefined
    };

    componentDidMount() {
        const options = JSON.parse(localStorage.getItem('options'));
        if (options) {
            this.setState((prevState) => ({options}));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log("Unmounting")
    }

    deleteOption = (option) => {
        this.setState((prevState) => ({options: prevState.options.filter((el) => el !== option)}));
        console.log("deleting ", option)
    };

    handleDeleteOptions = () => {
        this.setState(() => ({options: []}))
    };

    handleClearSelectedOption = () => {
        this.setState((prevState) => ({selectedOption: undefined}));
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        this.setState((prevState) => ({selectedOption: this.state.options[randomNum]}));
    };

    handleAddOption = (option) => {
        if (this.state.options.indexOf(option) > -1) {
            return "option exists";
        }

        this.setState((prevState) => ({options: [...prevState.options, option]}));
    };

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life';

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <div className="container">
                    <Action handlePick={this.handlePick} actionEnabled={this.state.options.length > 0}/>
                    <div className="widget">
                    <Options deleteSingleOption={this.deleteOption}
                             deleteAction={this.handleDeleteOptions}
                             options={this.state.options}/>
                    <AddOption addOption={this.handleAddOption}/>
                    </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption}
                             handleClearSelectedOption={this.handleClearSelectedOption}/>

            </div>
        )
    }
}

export default IndecisionApp;
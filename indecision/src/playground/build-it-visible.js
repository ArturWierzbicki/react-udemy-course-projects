class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.showDetails = this.showDetails.bind(this);
        this.getShowDetailsButtonTexts = this.getShowDetailsButtonTexts.bind(this);
        this.showDetailsButtonTexts = {
            true: "Hide details",
            false: "Show details"
        };
        this.state = {
            detailsShown: false
        }
    }

    getShowDetailsButtonTexts() {
        return this.showDetailsButtonTexts[this.state.detailsShown];
    }

    showDetails() {
        this.setState((prevState) => {
                return {
                    detailsShown: !prevState.detailsShown
                }
            }
        )
    }

    render() {
        return (
            <div>
                <h1>Visibility toggle</h1>
                <button onClick={this.showDetails}>{this.getShowDetailsButtonTexts()}</button>
                {this.state.detailsShown && <p>Some text</p>}
            </div>
        )
    }

}

ReactDOM.render(<VisibilityToggle/>, document.getElementById("app"));

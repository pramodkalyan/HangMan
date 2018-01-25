"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.wordList = [["camel", "cat", "mango"], ["keyboard", "computer", "atmosphere", "elephant"]];
        _this.generateRandomWord = _this.generateRandomWord.bind(_this);
        _this.generateWordWithDashes = _this.generateWordWithDashes.bind(_this);
        _this.checkIfCompleted = _this.checkIfCompleted.bind(_this);
        _this.checkIfLimitReached = _this.checkIfLimitReached.bind(_this);
        _this.fillChar = _this.fillChar.bind(_this);
        _this.checkIfPresent = _this.checkIfPresent.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.nextLevel = _this.nextLevel.bind(_this);
        _this.giveClue = _this.giveClue.bind(_this);
        _this.actualWord = "";
        _this.level = 0;

        _this.state = {
            wordWithDashes: "",
            trials: 0,
            score: 0,
            endGame: false
        };
        return _this;
    }

    _createClass(App, [{
        key: "generateRandomWord",
        value: function generateRandomWord() {
            //alert("hello")
            this.level = this.level + 1;

            var index = Math.floor(Math.random() * this.wordList[this.level - 1].length);
            this.actualWord = this.wordList[this.level - 1][index];
        }
    }, {
        key: "generateWordWithDashes",
        value: function generateWordWithDashes() {

            this.generateRandomWord();

            console.log(this.actualWord);

            var temp = "";
            for (var i = 0; i < this.actualWord.length; i++) {
                temp = temp + "-";
            }this.setState(function (prevState) {

                return {

                    wordWithDashes: temp
                };
            });
        }
    }, {
        key: "checkIfCompleted",
        value: function checkIfCompleted() {
            return this.state.wordWithDashes.length > 0 && this.state.wordWithDashes.indexOf("-") < 0;
        }
    }, {
        key: "checkIfLimitReached",
        value: function checkIfLimitReached() {
            return this.state.trials > this.actualWord.length + 3;
        }
    }, {
        key: "checkIfPresent",
        value: function checkIfPresent(char) {
            return this.actualWord.indexOf(char) > -1;
        }
    }, {
        key: "fillChar",
        value: function fillChar(char) {

            if (this.checkIfPresent(char)) {
                var temp = "";
                for (var i = 0; i < this.actualWord.length; i++) {
                    if (this.actualWord[i] == char) temp = temp + char;else temp = temp + this.state.wordWithDashes[i];
                }

                this.setState(function (prevState) {
                    return {
                        wordWithDashes: temp,
                        trials: prevState.trials + 1,
                        score: prevState.score + 10
                    };
                });
            } else {
                this.setState(function (prevState) {
                    return {
                        trials: prevState.trials + 1,
                        score: prevState.score - 10

                    };
                });
            }
        }
    }, {
        key: "reset",
        value: function reset() {

            this.actualWord = "";
            this.level = 0;
            this.setState(function () {
                return { wordWithDashes: "",
                    trials: 0,
                    score: 0 };
            });
        }
    }, {
        key: "nextLevel",
        value: function nextLevel() {
            this.actualWord = "";
            this.setState(function () {
                return { wordWithDashes: "",
                    trials: 0
                };
            });
        }
    }, {
        key: "giveClue",
        value: function giveClue() {
            var index = 0;
            do {
                index = Math.floor(Math.random() * this.actualWord.length);
            } while (this.state.wordWithDashes[index] != "-");

            var index2 = Math.floor(Math.random() * this.actualWord.length);

            var temp = "";
            var char = this.actualWord[index];

            for (var i = 0; i < this.actualWord.length; i++) {
                if (this.actualWord[i] == char) temp = temp + char;else temp = temp + this.state.wordWithDashes[i];
            }

            this.setState(function (prevState) {
                return {
                    wordWithDashes: temp,
                    trials: prevState.trials + 1,
                    score: prevState.score - 3
                };
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.state.wordWithDashes.length == 0 && React.createElement(HiddenWord, {
                    generateWordWithDashes: this.generateWordWithDashes,
                    checkIfCompleted: this.checkIfCompleted,
                    level: this.level
                }),
                this.actualWord.length > 0 && React.createElement(Display, {
                    wordWithDashes: this.state.wordWithDashes,
                    trials: this.state.trials,
                    level: this.level,
                    remaining: this.actualWord.length + 3 - this.state.trials,
                    score: this.state.score
                }),
                this.state.wordWithDashes.length > 0 && !this.checkIfLimitReached() && !this.checkIfCompleted() && React.createElement(Guess, { fillChar: this.fillChar }),
                this.checkIfLimitReached() && React.createElement(
                    "p",
                    { style: { fontSize: '3em' } },
                    " Maximum trials reached"
                ),
                this.checkIfCompleted() && alert("Level Completed!!!"),
                this.level == 2 && this.checkIfCompleted() && alert("All levels completed"),
                (this.checkIfLimitReached() || this.level == 2 && this.checkIfCompleted()) && React.createElement(PlayAgain, { reset: this.reset }),
                this.checkIfCompleted() && this.level != 2 && React.createElement(NextLevel, { nextLevel: this.nextLevel, reset: this.reset }),
                this.state.wordWithDashes.length > 0 && !this.checkIfLimitReached() && !this.checkIfCompleted() && React.createElement(Help, { giveClue: this.giveClue })
            );
        }
    }]);

    return App;
}(React.Component);

var RandomWord = function RandomWord(props) {
    return React.createElement("div", null);
};

var HiddenWord = function HiddenWord(props) {

    return React.createElement(
        "div",
        null,
        props.level == 0 && React.createElement(
            "button",
            { onClick: props.generateWordWithDashes },
            "Start Game"
        ),
        props.level > 0 && React.createElement(
            "button",
            { onClick: props.generateWordWithDashes },
            "Next Level "
        )
    );
};

var Guess = function (_React$Component2) {
    _inherits(Guess, _React$Component2);

    function Guess(props) {
        _classCallCheck(this, Guess);

        var _this2 = _possibleConstructorReturn(this, (Guess.__proto__ || Object.getPrototypeOf(Guess)).call(this, props));

        _this2.guessChar = _this2.guessChar.bind(_this2);

        return _this2;
    }

    _createClass(Guess, [{
        key: "guessChar",
        value: function guessChar(e) {

            e.preventDefault();
            //alert(e.target.elements.guess.value)
            var inp = e.target.elements.guess.value.trim();

            if (inp.length != 1) alert("Enter valid input(one character)");else this.props.fillChar(inp.toLowerCase());
            e.target.elements.guess.value = "";
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: { marginLeft: "1.1em", width: "15em" } },
                React.createElement(
                    "form",
                    { onSubmit: this.guessChar },
                    React.createElement("input", { name: "guess", type: "text" }),
                    React.createElement(
                        "button",
                        null,
                        "Guess"
                    )
                )
            );
        }
    }]);

    return Guess;
}(React.Component);

var PlayAgain = function PlayAgain(props) {

    return React.createElement(
        "div",
        { style: { marginLeft: "1.1em", width: "18em" } },
        React.createElement(
            "button",
            { onClick: props.reset },
            "Play Again"
        )
    );
};

var NextLevel = function NextLevel(props) {

    return React.createElement(
        "div",
        { style: { marginLeft: "1.1em", width: "18em" } },
        React.createElement(
            "button",
            { onClick: props.nextLevel },
            "Next Level"
        ),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(
            "button",
            { onClick: props.reset },
            "Exit"
        )
    );
};

var Help = function Help(props) {
    return React.createElement(
        "div",
        { style: { marginLeft: "1.1em" } },
        React.createElement("br", null),
        React.createElement(
            "button",
            { onClick: props.giveClue },
            " Clue "
        )
    );
};

var Display = function (_React$Component3) {
    _inherits(Display, _React$Component3);

    function Display(props) {
        _classCallCheck(this, Display);

        return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
    }

    _createClass(Display, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { style: { marginLeft: "1.1em", width: "40em" } },
                    React.createElement(
                        "table",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Level:",
                                this.props.level
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Score:",
                                this.props.score
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Remaining Trials:",
                                this.props.remaining
                            )
                        )
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { style: { border: "4px solid black", marginLeft: "1.1em", width: "40em" } },
                    React.createElement(
                        "p",
                        { style: { fontSize: '2em', textAlign: 'center' } },
                        this.props.wordWithDashes
                    )
                ),
                React.createElement("br", null)
            );
        }
    }]);

    return Display;
}(React.Component);

var appRoot = document.getElementById("app");
ReactDOM.render(React.createElement(App, null), appRoot);

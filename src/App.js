import React, { Component } from "react";
import mnemonicWords from "mnemonic-words";
import profanities from "profanities";

function capitalizeFirstLetter(string) {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.generateName = this.generateName.bind(this);
  }
  state = {
    input: "",
    name: "",
    provocative: false
  };
  generateName() {
    const { input, provocative } = this.state;
    const words = input.split("").map(l => {
      let alternatives = (provocative ? profanities : mnemonicWords).filter(
        w => w[0] === l
      );
      return capitalizeFirstLetter(
        alternatives[Math.floor(Math.random() * alternatives.length)]
      );
    });
    const name = words.join(" ");
    this.setState({ name });
  }
  onChange(input) {
    this.setState({ input }, this.generateName);
  }
  onChangeBox(provocative) {
    this.setState({ provocative }, this.generateName);
  }
  render() {
    const { input, name, provocative } = this.state;
    return (
      <div
        className="App"
        style={{ maxWidth: 500, margin: "auto", marginTop: 50 }}
      >
        <h1>Reverse Acronym Generator</h1>
        <p>
          You have a cool acronym and want to generate a name from it? Look no
          further!
        </p>
        <input value={input} onChange={e => this.onChange(e.target.value)} />
        <br />
        <label>
          Provocative:
          <input
            type="checkbox"
            checked={provocative}
            onChange={e => this.onChangeBox(e.target.checked)}
          />
        </label>
        <button onClick={this.generateName}>Generate new</button>
        <h2>{name}</h2>
        <a
          style={{ color: "lightgrey", fontSize: 10 }}
          href="https://jenshandersson.com"
        >
          By Jens Andersson
        </a>
      </div>
    );
  }
}

export default App;

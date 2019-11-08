import React from "react";
import Prism from "prismjs";

class Code extends React.PureComponent {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    return (
      <pre>
        <code className="language-javascript">
          {this.props.children.trim()}
        </code>
      </pre>
    );
  }
}

export default Code;

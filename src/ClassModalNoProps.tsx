import React from "react";

export class ClassModalNoProps extends React.Component<{
  resolve: (value: boolean) => void;
}> {
  render() {
    return (
      <>
        <h2>test</h2>
        <button onClick={() => this.props.resolve(true)}>test</button>
      </>
    );
  }
}

import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) {
    return JSON.parse(storage);
  }
  return { count: 0 };
};

const increment = (state, props) => {
  const { max, step } = props;
  if (state.count >= max) {
    return;
  }
  return { count: state.count + step };
};

const decrement = (state, props) => {
  const { step } = props;
  return { count: state.count - step };
};

const reset = () => {
  return { count: 0 };
};

const afterCountUpdate = (state) => {
  updateTitle(state);
  storeStateInLocalStorage(state);
};

const updateTitle = (state) => {
  document.title = `Count is : ${state.count}`;
};

const storeStateInLocalStorage = (state) => {
  localStorage.setItem('counterState', JSON.stringify(state));
  console.log(localStorage);
};

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    this.setState(increment, () => afterCountUpdate(this.state));
  }

  decrement() {
    this.setState(decrement, () => afterCountUpdate(this.state));
  }

  reset() {
    this.setState(reset, () => afterCountUpdate(this.state));
  }
  render() {
    const { count } = this.state;
    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;

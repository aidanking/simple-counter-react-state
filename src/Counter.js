import React, { useState, useEffect } from 'react';

const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage).value;
    }
    return initialState;
  };

  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
};

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(0);
  const countRef = React.useRef();

  let message = '';

  if (countRef.current < count) message = 'Higher';
  if (countRef.current > count) message = 'Lower';

  countRef.current = count;

  const increment = () => {
    setCount((c) => {
      if (c >= max) {
        return c;
      }
      return c + step;
    });
  };
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(`Count: ${count}`);
    }, 3000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <p>{message}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;

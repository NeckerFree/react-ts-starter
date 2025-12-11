// src/App.tsx
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { increment, decrement, addByAmount } from '../redux/slices/counterSlice';


export default function ReduxComponent()
{
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter.value);

  const [amount, setAmount] = useState(0);

  return (
    <div style={{ padding: 24 }}>
      <h1>Counter with Redux Toolkit + TypeScript</h1>

      <h2>Value: {counter}</h2>

      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>

      <div style={{ marginTop: 16 }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={() => dispatch(addByAmount(amount))}>
          Add custom amount
        </button>
      </div>
    </div>
  );
}


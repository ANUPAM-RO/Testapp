import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { increment , decrement, incrementByAmount, decremantByAmount } from '../slices/counterSlice';

const Counter = () => {
    const count = useSelector((state)=> state.counter.count);
    const dispatch = useDispatch();
    const amount = 5;
  return (
    <div>
        <h1>Counter Component</h1>
        <button onClick={()=> dispatch(increment())}>+</button>
        <button onClick={()=> dispatch(decrement())}>-</button>
        <button onClick={()=> dispatch(incrementByAmount(amount))}>Add amount 5</button>
        <button onClick={()=> dispatch(decremantByAmount(amount))}>subtract amonut 5</button>
        <p>Count: {count > 0 ? count : 0}</p>
    </div>
  )
}

export default Counter
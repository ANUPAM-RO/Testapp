import { useDispatch, useSelector } from 'react-redux';
import { fetchCounterData, incrementAsync, clearError } from '../slices/counterSlice';
import { useEffect } from 'react';

export function FetchCount() {
  const dispatch = useDispatch();
  const { count, loading, error, data } = useSelector(state => state.counter);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchCounterData());
  }, [dispatch]);

  // Handle increment via API
  const handleAsyncIncrement = () => {
    dispatch(incrementAsync(5));
  };

  return (
    <div>
      <p>Count: {count}</p>
      
      {/* Show loading state */}
      {loading && <p>Loading...</p>}
      
      {/* Show error state */}
      {error && (
        <div>
          <p style={{ color: 'red' }}>Error: {error}</p>
          <button onClick={() => dispatch(clearError())}>Clear Error</button>
        </div>
      )}
      
      {/* Display fetched data */}
      {data && <p>Data Title: {data.title}</p>}
      
      {/* Async increment button */}
      <button onClick={handleAsyncIncrement} disabled={loading}>
        {loading ? 'Loading...' : 'Increment by 5'}
      </button>
    </div>
  );
}
import React, { useState , useMemo , useEffect, useCallback } from 'react'
import axios from 'axios'
import useDebounce from '../hooks/useDebounce'
import { List } from 'react-window'

const Row = ({ index, style, items, checkedItems, onToggle }) => {
  const item = items[index];
  if (!item) return null;

  return (
    <div style={style}>
      <input
        type="checkbox"
        value={item.id}
        checked={checkedItems.includes(item.id)}
        onChange={() => onToggle(item.id)}
      />
      {item.name} - {item.email}
    </div>
  );
}

const FilterSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [filterBy, setFilterBy] = useState('all');
    const [checkedItems, setCheckedItems] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const debouncedSearch = useDebounce(searchTerm, 500);


    const fetchData = async () => {
        try{
            const data =  await axios.get("https://jsonplaceholder.typicode.com/users");
            setResults(data.data);
        }catch(error){
            console.error('Error fetching data:', error);   
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);


    const handleSearch = useMemo(()=>{
        return results.filter((item)=> {
            if(filterBy === 'all'){
                return item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || item.email.toLowerCase().includes(debouncedSearch.toLowerCase());
            }else if(filterBy === 'name'){
                return item.name.toLowerCase().includes(debouncedSearch.toLowerCase());
            }else{
                return item.email.toLowerCase().includes(debouncedSearch.toLowerCase());
            }
        })
    },[results, debouncedSearch, filterBy]);


    const handleCheck = useCallback((id) => {
      setCheckedItems((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        return [...prev, id];
      });
    }, []);

    console.log(handleSearch);
    
  return (
    <div>
        <h1>Filter Search Component</h1>
        <input
            type="text"
            placeholder="Search..."
            value = {searchTerm}
            onChange  = {(e)=> setSearchTerm(e.target.value)}
            />
            <select value={filterBy} onChange={(e)=> setFilterBy(e.target.value)}>
                <option value="all">All</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
            </select>
            <List
              rowComponent={Row}
              rowCount={handleSearch.length}
              rowHeight={36}
              rowProps={{
                items: handleSearch,
                checkedItems,
                onToggle: handleCheck
              }}
              style={{ height: 300, width: '100%' }}
            />
             <select value={selectedOptions} multiple onChange={(e)=> setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}>
                {handleSearch.map((item =>{
                    return <option key={item.id} value={item.name}>{item.name}</option>
                }))}
            </select>
            <div>Selected options: {selectedOptions.join(', ')}</div>
    </div>
  )
}

export default FilterSearch

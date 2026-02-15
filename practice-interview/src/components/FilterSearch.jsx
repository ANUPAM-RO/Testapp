import React, { useState , useMemo , useEffect } from 'react'
import axios from 'axios'
import useDebounce from '../hooks/useDebounce'

const FilterSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [filterBy, setFilterBy] = useState('all');

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
        <ul>
            {handleSearch.map((item)=>(
                <li key={item.id}>{item.name}-{item.email}</li>
            ))}
        </ul>
    </div>
  )
}

export default FilterSearch

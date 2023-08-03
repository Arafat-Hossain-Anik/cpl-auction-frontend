import React, { useRef } from 'react';
import './SearchPlayer.css';
const SearchPlayer = (props) => {
    const { allPlayers, setDisplayPlayers } = props;
    const searchRef = useRef('');
    const searchTextRef = useRef('');
    console.log(allPlayers);
    const handleSearch = () => {
        const searchOption = searchRef.current.value;
        const searchText = searchTextRef.current.value;
        const matchedPlayers = allPlayers.filter(player => player[searchOption].toLowerCase().includes(searchText.toLowerCase()));
        setDisplayPlayers(matchedPlayers);
    }
    return (
        < div >
            <h2 className='search-header'>Search Player By Name or Session</h2>
            <div className='d-flex justify-content-center'>
                <select className="input-field mt-0" type="text" placeholder="Select Category" required ref={searchRef} style={{ width: "10%" }}>
                    <option value="name">NAME</option>
                    <option value="session">SESSION</option>
                </select>
                <input className="input-field mt-0" type="text" style={{ width: "90%" }} ref={searchTextRef} onChange={handleSearch} placeholder='Type Here To Find Your Player' />
            </div>
        </div >
    );
};

export default SearchPlayer;
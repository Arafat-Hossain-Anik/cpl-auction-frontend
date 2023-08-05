import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import PlayersTable from '../Body/PlayersTable/PlayersTable';
import axios from 'axios';
import SearchPlayer from './SearchPlayer';
const ManagePlayer = () => {
    const [allPlayers, setAllPlayers] = useState([]);
    const [displayPlayers, setDisplayPlayers] = useState([]);
    useEffect(() => {
        fetch('https://cpl-backend.onrender.com/players')
            .then(result => result.json())
            .then(data => {
                setAllPlayers(data);
                setDisplayPlayers(data);
            })
    }, []);
    const catRef = useRef();
    const rolRef = useRef();
    const handlePublic = (e) => {
        e.preventDefault();
        const category = catRef.current.value;
        const role = rolRef.current.value;
        const data = {
            category: category.toUpperCase(),
            role: role.toUpperCase()
        }
        axios.put('https://cpl-backend.onrender.com/public-query', data)
            .then(res => {
                if (res.data) {
                    alert("Data Is Now Showing to public");
                }
            })
    }

    // const searchRef = useRef('');
    // const searchTextRef = useRef('');
    // console.log(allPlayers);
    // const handleSearch = () => {
    //     const searchOption = searchRef.current.value;
    //     const searchText = searchTextRef.current.value;
    //     const matchedPlayers = allPlayers.filter(player => player[searchOption].toLowerCase().includes(searchText.toLowerCase()));
    //     setDisplayPlayers(matchedPlayers);
    // }
    return (
        <div className='container'>
            <div className="text-center fw-fold">
                <h1 className='fw-bold'> Total Available Players: {displayPlayers.length}</h1>
            </div>
            <div>
                <form onSubmit={handlePublic} className='d-flex justify-content-space-between'>
                    <select ref={catRef} className="input-field" type="text" placeholder="Select Category" required>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                    </select>
                    <select ref={rolRef} className="input-field" type="text" placeholder="Select Role" required>
                        <option value="Batting">Batsman</option>
                        <option value="Bowling">Bowler</option>
                        <option value="All-Rounder">All-Rounder</option>
                    </select>
                    <div className="clearfix text-center">
                        <input type="submit" value="Make Public" className='form-btn mb-3' />
                    </div>
                </form>
                <SearchPlayer setDisplayPlayers={setDisplayPlayers} allPlayers={allPlayers}></SearchPlayer>
                {/* Players Search Option code goes from here */}
                {/* <div>
                    <h2>Search Player By Name or Session</h2>
                    <div className='d-flex'>
                        <select className="input-field mt-0" type="text" placeholder="Select Category" required ref={searchRef} style={{ width: "33%" }}>
                            <option value="name">NAME</option>
                            <option value="session">SESSION</option>
                        </select>
                        <input className="input-field mt-0" type="text" style={{ width: "33%" }} ref={searchTextRef} onChange={handleSearch} />
                    </div>
                </div> */}
                {/* Players Search Option code goes ends here */}
            </div>
            <>
                {displayPlayers.length ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Session</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayPlayers.map(player => <PlayersTable key={player._id} player={player} allPlayers={displayPlayers} setAllPlayers={setAllPlayers}></PlayersTable>
                                )
                            }
                        </tbody>
                    </Table>
                    :
                    <div>
                        <h1 className='text-danger text-center' style={{ marginBottom: "100px" }}>No player Found</h1>
                    </div>
                }
            </>
        </div >
    );
};

export default ManagePlayer;
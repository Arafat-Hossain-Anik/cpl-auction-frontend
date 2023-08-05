import React, { useEffect, useState } from 'react';
import './AvailablePlayers.css';
// import PlayersTable from '../Body/PlayersTable/PlayersTable';
import { Table } from 'react-bootstrap';
import PlayersAnotherTable from '../Body/PlayersAnotherTable/PlayersAnotherTable';

const AvailablePlayers = () => {
    const [query, setQuery] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/public-query`)
            .then(res => res.json())
            .then(data => {
                setQuery(data);
            });
    }, []);
    // console.log("query", query);
    const category = query?.category;
    const role = query?.role;
    const url = `http://localhost:5000/players-cat-rol/${category}/${role}`;
    const [availablePlayer, setAvailablePlayer] = useState([]);
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAvailablePlayer(data);
            });
    }, [url]);
    // console.log(url)
    return (
        <div className='container'>
            {
                availablePlayer.length > 0 ? <div>
                    <div className='text-center'>
                        <h1>PLAYERS LIST</h1>
                        <h3>Category: <span className='text-danger'>{category}</span></h3>
                        <h3>Role: <span className='text-danger'>{role}</span></h3>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Semester</th>
                                <th>Category</th>
                                <th>Role</th>
                                {/* <th>Details</th> */}
                                <th>Base Price</th>
                                {/* <th>Buying Team</th>
                                <th>Sell Price</th>
                                <th>Confirm</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                availablePlayer.map(player => <PlayersAnotherTable key={player._id} player={player}></PlayersAnotherTable>
                                )
                            }
                        </tbody>
                    </Table>
                </div> : <div>
                    <h1 className='text-center my-5 text-danger'>Players Are Not Available Right Now</h1>
                    <div style={{ height: "40vh" }}>

                    </div>
                </div>
            }
        </div>
    );
};

export default AvailablePlayers;
import React, { useRef } from 'react';
const PlayersTable = (props) => {
    const { player, allPlayers, setAllPlayers } = props;
    const teamRef = useRef();
    const soldRef = useRef();
    const handleConfirm = (e) => {
        //e.preventDefault();
        const teamName = teamRef.current.value;
        const soldPrice = soldRef.current.value;
        const playerDetails = { ...player, soldPrice };
        const playerData = { playerDetails, teamName };
        // delete single item from ui
        setAllPlayers(allPlayers.filter(singlePlayer => singlePlayer !== player));
        fetch('http://localhost:5000/confirm-player', {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(playerData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert("Player is Bought")
                }
            })
        fetch('http://localhost:5000/players-bought', {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(player)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // window.location = window.location.href;
            })

    }
    return (<>
        {
            player.status === "bought" ? null : <tr>
                <td><img src={player.image} alt={player.name} style={{ width: "70px" }} /></td>
                <td>{player.name}</td>
                <td>{player.session}</td>
                <td>{player.price}</td>
                <td>{player.category}</td>
                <td>{player.role}</td>
                {/* <td>{player.details}</td> */}
                <td>
                    <select ref={teamRef} className="input-field" type="text" placeholder="Select Category" required>
                        <option value="CSIT">CSIT</option>
                        <option value="CCE">CCE</option>
                        <option value="MATH">MATH</option>
                        <option value="PHYSICS">PHYSICS</option>
                        <option value="EEE">EEE</option>
                    </select>
                </td>
                <td>
                    <input ref={soldRef} type="text" name="price" placeholder="price" required />
                </td>
                <td><button onClick={handleConfirm} className='btn btn-success'>Confirm</button>
                </td>
            </tr>

        }
    </>
    );
};

export default PlayersTable;
import React from 'react';
import { Link } from 'react-router-dom';

const PlayersAnotherTable = (props) => {
    const { player } = props;
    // const handleDetails = () => {
    console.log(player);
    return (
        <tr>
            <td>
                <img src={player.image} alt={player.name} style={{ width: "70px" }} />
            </td>
            <td>{player.name}</td>
            <td>{player.session}</td>
            <td>{player.category}</td>
            <td>{player.role}</td>
            {/* <td>{player.details}</td> */}
            <td>{player.price}</td>
            <td>{player.soldPrice}</td>
            <td>
                <Link className='btn btn-success' to={`/more/${player._id}`}>
                    Details
                </Link>
            </td>
        </tr>
    );
};

export default PlayersAnotherTable;
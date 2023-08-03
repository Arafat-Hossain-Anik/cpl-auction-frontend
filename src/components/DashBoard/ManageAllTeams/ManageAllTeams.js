import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import PlayersAnotherTable from '../Body/PlayersAnotherTable/PlayersAnotherTable';

const ManageAllTeams = () => {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/teams')
            .then(res => res.json())
            .then(data => setTeams(data))
    }, [])
    return (
        <div>
            {
                teams.map(team => <Container key={team._id} style={{ paddingTop: '50px' }}>
                    <Row>
                        <Col className='d-flex justify-content-between border border-info mb-5'>
                            <div>
                                <h2 className="fw-bold ">Team Name: <span className='text-success' style={{ textTransform: "uppercase" }}> {team.teamName} ({team.name})</span></h2>
                                <h3>Total Point: <span className='text-danger'> {team.points}</span></h3>
                            </div>
                            <div>
                                <h2>Spent: <span className='text-danger'>
                                    {
                                        team.players.reduce((total, booking) => total + parseInt(booking.soldPrice), 0)
                                    }
                                </span></h2>
                                <h4> Penalty: <span className='text-danger'>
                                    {
                                        team.players.reduce((total, booking) => total + parseInt(booking.soldPrice), 0) > 4500 ? team.players.reduce((total, booking) => total + parseInt(booking.soldPrice), 0) - 4500 : 0
                                    }
                                </span>
                                </h4>
                            </div>
                        </Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>session</th>
                                    <th>Category</th>
                                    <th>Role</th>
                                    {/* <th>Details</th> */}
                                    <th>Base Price</th>
                                    <th>Sold Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    team.players.map(player => <PlayersAnotherTable key={player._id} player={player}></PlayersAnotherTable>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Row>
                </Container>)
            }
        </div>
    );
};

export default ManageAllTeams;
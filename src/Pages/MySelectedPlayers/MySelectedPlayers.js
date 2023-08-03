import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
// import useAuth from '../../hooks/useAuth';
import './MySelectedPlayers.css';
import PlayersAnotherTable from '../../components/DashBoard/Body/PlayersAnotherTable/PlayersAnotherTable';
import useFirebase from '../../hooks/useFirebase';
import { PDFDocument } from 'pdf-lib';

const MySelectedPlayers = () => {
  // const { selectedBooking, remove } = useAuth();
  // const totalPrice = selectedBooking.reduce((total, booking) => total + parseInt(booking.price), 0)
  const [team, setTeam] = useState({});
  const { user } = useFirebase();
  // const mail = 'csit.cpl@pstu.cpl.com';
  // ${user.email}
  const url = `http://localhost:5000/teams/${user.email}`;
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setTeam(data))
  }, [url])
  console.log(team);
  ///---------------------------pdf creation from databased data
  const handleDownload = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const point = team.players?.reduce((total, booking) => total + parseInt(booking.soldPrice), 0);
    // Add a page to the document
    const page = pdfDoc.addPage();
    page.drawText(`${team.teamName.toUpperCase()} (${team.name.toUpperCase()})`, { x: 50, y: 800, size: 18 });
    page.drawText(`USED POINTS: ${point}`, { x: 370, y: 800, size: 18 });
    // page.drawText('Name', { x: 50, y: 800, size: 16 });
    page.drawText('Name', { x: 50, y: 770, size: 16 });
    page.drawText('Session', { x: 170, y: 770, size: 16 });
    page.drawText('Category', { x: 270, y: 770, size: 16 });
    page.drawText('Role', { x: 370, y: 770, size: 16 });
    page.drawText('Value', { x: 470, y: 770, size: 16 });
    let y = 750;
    // Write the data to the page
    team.players?.forEach(player => {
      page.drawText(`${player.name.substr(0, 15)}.`, { x: 50, y, size: 12 });
      page.drawText(`${player.session}`, { x: 170, y, size: 12 });
      page.drawText(`${player.category}`, { x: 270, y, size: 12 });
      page.drawText(`${player.role}`, { x: 370, y, size: 12 });
      page.drawText(`${player.soldPrice}`, { x: 470, y, size: 12 });
      y -= 20;
    });

    // Save the PDF document
    const pdfBytes = await pdfDoc.save();
    const download = (content, fileName, contentType) => {
      const a = document.createElement('a');
      const file = new Blob([content], { type: contentType });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    };
    // Download the PDF document
    download(pdfBytes, 'Team_List.pdf', 'application/pdf');
  };
  return (
    <div>
      {
        // team.name ?
        <div>
          <div className='text-center mt-3'>
            <h1>MANAGER: <span className='text-success'>{team.managerName?.toUpperCase()}</span></h1>
          </div>
          {
            <Container style={{ paddingTop: '50px' }}>
              <Row>
                <Col className='d-flex justify-content-between border border-info mb-5'>
                  <div>
                    <h2 className="fw-bold ">Team Name: <span className='text-success' style={{ textTransform: "uppercase" }}> ({team.name})</span></h2>
                    <h3>Total Point: <span className='text-danger'> {team.total_points}</span></h3>
                  </div>
                  <div>
                    <h2>Spent: <span className='text-danger'>
                      {
                        team.players?.reduce((total, booking) => total + parseInt(booking.soldPrice), 0)
                      }
                    </span></h2>
                    <h4> Penalty: <span className='text-danger'>
                      {
                        team.players?.reduce((total, booking) => total + parseInt(booking.soldPrice), 0) > 4500 ? team.players?.reduce((total, booking) => total + parseInt(booking.soldPrice), 0) - 4500 : 0
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
                      <th>Session</th>
                      <th>Category</th>
                      <th>Role</th>
                      <th>Base Price</th>
                      {/* <th>Details</th> */}
                      <th>Buying Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      team.players?.map(player => <PlayersAnotherTable key={player._id} player={player}></PlayersAnotherTable>
                      )
                    }
                  </tbody>
                </Table>
              </Row>
            </Container>
          }
          {!team.players?.length && <div className='text-center'>
            <h2 className='fs-1 text-danger m-5'>You don't have any player yet</h2>
          </div>}
          {/* print team pdf */}
          <div className='text-center'>
            <button className='btn btn-success' onClick={handleDownload}>Download Team List</button>
          </div>
          <div style={{ height: "10vh" }}></div>
        </div>
        // :
        // < div className='d-flex align-items-center flex-column'>
        //   <div className="text-danger mt-5"><h1>You do not have any player</h1></div>
        //   <img className='mb-2' src="https://kinsta.com/wp-content/uploads/2021/05/xampp-http-error-404-the-requested-resource-is-not-found-featured-image-1024x512.jpg" alt="not found" />
        // </div>
      }
    </div >
  );
};


export default MySelectedPlayers;
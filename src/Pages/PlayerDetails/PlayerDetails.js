import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
// import useAuth from '../../hooks/useAuth';
import './PlayerDetails.css'
// import useAuth from '../../hooks/useAuth';

const PlayerDetails = () => {
  const { id } = useParams();
  // const { contexts } = useAuth();
  // !contexts.admin ?
  // const { addToCart } = useAuth()
  // const {booking} = useAuth();
  const [player, setPlayer] = useState({})
  useEffect(() => {
    fetch(`https://cpl-backend.onrender.com/players/${id}`)
      .then(res => res.json())
      .then(data => setPlayer(data))
  }, [id])
  // console.log(player);
  return (
    <div>
      <Header></Header>
      <div className='text-center mt-3'>
        <h1 className='text-danger'>PLAYER FOR AUCTION</h1>
      </div>
      <Container className='mb-5 rounded overflow-hidden' style={{ marginTop: '50px', width: "70%", boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px", background: "white" }}>
        <Row>
          <Col style={{ padding: "0" }}>
            <div>
              <img src={player.image} className="card-img-top rounded" style={{ height: "550px", objectFit: "cover" }} alt="" />
            </div>
          </Col>
          <Col className='rounded border border-success'>
            <div style={{ padding: "5px 10px" }}>
              <h2 className="fw-bold " style={{ textTransform: "uppercase" }}> {player.name}</h2>
              <h6>Session:<span className='text-secondary'> {player.session}</span></h6>
              <h4>CATEGORY:<span className='text-success'> {player.category}</span></h4>
              <h4>ROLE:<span className='text-success' style={{ textTransform: "uppercase" }}> {player.role}</span> </h4>
              <p className="fw-bold text-secondary">{player.details}</p>
              <Row>
                <Col>
                  <h2 className='text-danger'>Base Price: {player.price}</h2>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );

};

export default PlayerDetails;

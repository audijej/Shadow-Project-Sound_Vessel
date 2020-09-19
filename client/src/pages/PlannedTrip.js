import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar/Navbar';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import "react-datepicker/dist/react-datepicker.css";
import API from "../utils/API";
import { List, ListItem } from "../components/List/List"
import { Link, useParams } from "react-router-dom";
import SeattleLakeUnionBoat from '../components/Images/Seattle-Lake-Union.JPG';
import Modal from 'react-bootstrap/Modal';
import '../App.css';

function PlannedTrip() {

    const [trip, setTrip] = useState([])
    const [trippy, setTrippy] = useState([{}])
    const [traffic, setTraffic] = useState([]);
    const [trafficMatch, setTrafficMatch] = useState([]);
    const { id } = useParams()
    const [show, setShow] = useState(false);
    const [modalIdContents, setModalIdContents] = useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleShow = (traffics) => {
        setShow(true);
        setModalIdContents(traffics)
    };

    const handleClose = () => setShow(false);

    useEffect(() => {
        API.getPlannedTrips(id)
            .then(({ data: tripData }) => {
                setTrip(tripData)
                API.getTraffic()
                    .then(({ data: trafficData }) => {
                        setTrafficMatch(trafficData)
                        let matchingDates = []
                        let shipMatchingDates = []
                        shipMatchingDates.push(tripData.start_sail_date && tripData.start_sail_date.split("T")[0])
                        console.log(trafficData)
                        trafficData.forEach(function (event) {
                            console.log(event.eta && event.eta.split("T")[0])
                            matchingDates.push(event.eta && event.eta.split("T")[0])
                        });

                        let result = []
                        console.log(shipMatchingDates)
                        console.log(matchingDates)
                        for (var i = 0; i < shipMatchingDates.length; i++) {
                            for (var j = 0; j < matchingDates.length; j++) {

                                console.log(`comparing ${shipMatchingDates[i]} to ${matchingDates[j]}`)
                                if (shipMatchingDates[i] == matchingDates[j]) {
                                    console.log("found match")
                                    result.push(shipMatchingDates);
                                }
                            }
                        };

                        console.log("matches: ", result)
                        setTraffic(result)
                    })
            }
            )

    }, [])

    // console.log(traffic)


    // console.log(trafficMatch)
    // let matchingDates = []
    // let shipMatchingDates = []
    // console.log(trip.start_sail_date && trip.start_sail_date.split("T")[0])
    // shipMatchingDates.push(trip.start_sail_date && trip.start_sail_date.split("T")[0])

    // trafficMatch.filter(function (event) {
    //     console.log(event.eta && event.eta.split("T")[0])
    //     matchingDates.push(event.eta && event.eta.split("T")[0])
    //     // if (event.eta === trip.start_sail_date) {

    //     //     return true
    //     // }
    // })
    // console.log(matchingDates)
    // console.log(shipMatchingDates)

    // let result = []


    // for (var i = 0; i < shipMatchingDates.length; i++) {
    //     for (var j = 0; j < matchingDates.length; j++) {
    //         if (shipMatchingDates[i] == matchingDates[j]) {
    //             result.push(shipMatchingDates);
    //         }
    //     }
    // }

    // console.log(result)


    return (

        <div className="bg">

            <Navbar />

            <Jumbotron fluid style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${SeattleLakeUnionBoat})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: "auto",
                height: "650px",

            }} >
                <Container>
                    <h1 style={{ textAlign: "center", color: "white", marginTop: "150px", fontFamily: 'Kaushan Script', fontSize: "75px", textShadow: "4px 4px 4px #000000" }}>Saved Trip</h1>
                </Container>
            </Jumbotron>

            <Container id="singleResultTrip">

                <h1 style={{ textAlign: "center", fontSize: "50px" }}>Your Saved Trips</h1>
                <br></br>
                <h2>Start Destination: {trip.start_destination}</h2>
                <h2>End Destination: {trip.end_destination}</h2>
                <h2>Start Sail Date: {trip.start_sail_date && trip.start_sail_date.split("T")[0]}</h2>
                <h2> End Sail Date: {trip.end_sail_date && trip.end_sail_date.split("T")[0]}</h2>
                <br></br>
                <h1 style={{ color: "white", fontSize: "50px" }}><Link to="/plantrip">← Back to Plan a Trip</Link>
                </h1>

                <table>
                    <thead>
                        <tr>
                            <th>Start Destination</th>
                            <th>End Destination</th>
                            <th>Start Sail Date</th>
                            <th>End Sail Date</th>
                        </tr>
                    </thead>
                        
                    <tbody id="tripListing">
                    <tr>
                          <td>{trip.start_destination}</td>
                          <td>{trip.end_destination}</td>
                          <td>{trip.start_sail_date && trip.start_sail_date.split("T")[0]}</td>
                          <td>{trip.end_sail_date && trip.end_sail_date.split("T")[0]}</td>  
                        </tr>
                    </tbody>

                </table>

            </Container>

            <Container fluid id="resultsdiv" style={{ color: "black", textAlign: "center" }} >
                <h1 >Ships encountered</h1>
                {trafficMatch.length > 0 ? (

                    <List>

                        {trafficMatch.filter((elem) => {
                            let start_sail_date = trip.start_sail_date && trip.start_sail_date.split("T")[0];
                            let eta = elem.eta && elem.eta.split("T")[0];
                            return start_sail_date === eta
                        }).map((traffics) => {
                            console.log(traffics)
                            return (<ListItem key={traffics.main_id} value={traffics}>
                                <strong>
                                    <Button variant="primary" onClick={() => handleShow(traffics)}>
                                        Ship Name: {traffics.ship_name}
                                    </Button>
                                </strong>
                            </ListItem>
                            )
                        })

                        }

                        <Modal size="lg" show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Ship Name: {modalIdContents.ship_name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body key={modalIdContents.main_id} value={modalIdContents}>
                                Ship Name: {modalIdContents.ship_name}
                                <br></br>
                                Ship ID: {modalIdContents.ship_id}
                                <br></br>
                                Ship Type: {modalIdContents.ship_type_name}
                                <br></br>
                                Flag: {modalIdContents.flag}
                                <br></br>
                                Destination: {modalIdContents.destination}
                                <br></br>
                                Eta: {modalIdContents.eta && modalIdContents.eta.split("T")[0]}
                                <br></br>
                                <img style={{ width: "100%", height: "100%" }} src={modalIdContents.ship_image} alt="shipImage" />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </List>
                ) : (
                        <h3>No Results to Display</h3>
                    )}
            </Container>

        </div>
    )
}

export default PlannedTrip
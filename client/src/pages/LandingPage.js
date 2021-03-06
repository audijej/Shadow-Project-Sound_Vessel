import React from "react";
import '../App.css';
import { Link } from "react-router-dom";
import SoundVesselTrafficLandingpageBackground from "../components/Videos/SoundVesselTrafficLandingpageBackground.mp4";

function LandingPage() {

    return (
        <div>
            <video autoPlay loop muted
                style={{
                    position: "absolute",
                    width: "100%",
                    objectFit: "cover",
                    zIndex: "-1",
                    opacity: "90%"
                }}
            >
                <source src={SoundVesselTrafficLandingpageBackground} type="video/mp4" />
            </video>
            <div className="container" style={{ color: "white", textShadow: "3px 3px 3px #000000", textAlign: "center", paddingTop: "150px" }}>
                <h1 style={{ fontFamily: 'Kaushan Script', fontSize: "75px" }}>Welcome to Sound Vessel Traffic</h1>
                <h1 style={{ fontFamily: 'Kaushan Script' }}>Hello Boats</h1>
                <h2 style={{ fontFamily: 'Kaushan Script' }}>Sail the world</h2>
                <Link
                    to="/userlogin"
                    className={
                        window.location.pathname === "/userlogin" || window.location.pathname === "/userlogin"
                            ? "nav-link active"
                            : "nav-link"
                    }
                ><button style={{ fontFamily: 'Kaushan Script' }} type="button" className="btn btn-outline-primary">Enter Site</button></Link>
            </div>
        </div >
    )
}

export default LandingPage;
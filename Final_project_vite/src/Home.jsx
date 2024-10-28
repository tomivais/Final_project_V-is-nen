import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'; // Tuodaan Card
import Button from 'react-bootstrap/Button'; // Tuodaan Buttonimport ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row'; // Tuodaan Row
import Col from 'react-bootstrap/Col'; // Tuodaan Row
import './Home.css'
import { toast } from "react-toastify";
import Start from './Start.jsx'; // Tuo funktio toisesta tiedostosta
import End from './End.jsx';
import Pause from './Pause.jsx';




const Home = () => {
    const [email, setEmail] = useState(null); // Tilamuuttuja sähköpostille
    const [sessionId, setsessionId] = useState(null); // Tilamuuttuja sähköpostille

    const [alarmState, setAlarmState] = useState('off'); // Tila, joka seuraa mikä ikoni on näkyvissä
    const usenavigate = useNavigate();

    const [isStartDisabled, setIsStartDisabled] = useState(false);
    const [isStopDisabled, setIsStopDisabled] = useState(true);
    const [isPauseDisabled, setIsPauseDisabled] = useState(true);

    

    



    useEffect(() => {
        let email = sessionStorage.getItem('email');
        let sessionId= sessionStorage.getItem('sessionId');
        setEmail(email); // Tallennetaan email tilaan
        setsessionId(sessionId);
        if (email === '' || email === null) {
            usenavigate('/login');
        }
    }, []);

    const handleStart = () => {
        setIsStartDisabled(true);
        setIsStopDisabled(false);
        setIsPauseDisabled(false);

        setAlarmState('on');
        make_datetimestamp('on', email,sessionId);
    };    
    
    const handlePause = () => {
        setIsPauseDisabled(true);
        setIsStartDisabled(false);
        setAlarmState('snooze');
        make_datetimestamp('snooze',sessionId);
    };
    const handleStop = () => {
        setIsStartDisabled(false);
        setIsStopDisabled(true);
        setIsPauseDisabled(true);
        setAlarmState('off');
        make_datetimestamp('off',sessionId);
    };

    const renderIcon = () => {
        switch (alarmState) {
            case 'on':
                return <img src="/alarm-on.gif" alt="Alarm On Icon" style={{ height: '50px', width: 'auto' }} />;
            case 'snooze':
                return <img src="/alarm-snooze.gif" alt="Alarm Snooze Icon" style={{ height: '50px', width: 'auto' }} />;
            case 'off':
                return <img src="/alarm-off.gif" alt="Alarm Off Icon" style={{ height: '50px', width: 'auto' }} />;
        }
    };


    const renderText = () => {
        switch (alarmState) {
            case 'on':
                return "Studying in progress";
            case 'snooze':
                return "Studying pause";

            case 'off':
                return "You end your daily studies";
        }
    };

    const make_datetimestamp = async (alarmState, email) => {
        try {
            let result;
    
            switch (alarmState) {
                case 'on':
                    result = await Start(email,sessionId);
                    break;
                case 'snooze':
                    result = await Pause(sessionId);
                    break;
                case 'off':
                    result = await End(sessionId);
                    break;
                default:
                    throw new Error("Tuntematon tila"); // Tämä käsittelee virhetilanteet
            }
    
            if (result && result.success) {
                console.log("Kirjautuminen onnistui, sessio:"+sessionId);
                toast.success("Aikaleima tallennettu onnistuneesti");
            } else {
                toast.error(result.message || "Aikaleiman tallentaminen epäonnistui");
            }
        } catch (error) {
            console.error("Virhe tallennuksessa: ", error);
            toast.error("Virhe tallennuksessa: " + error.message);
        }
    };

return (
    <>
        <Navbar expand="lg" className="custom-navbar white-text">
            <Container>
                <Navbar.Brand href="/">Your studies manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav " />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="custom-nav-link">Home</Nav.Link>
                        <Nav.Link href="/table_view" className="custom-nav-link">Table view</Nav.Link>
                        <Nav.Link href="#" className="custom-nav-link">*Bar view</Nav.Link>
                        <Nav.Link href="/login" className="custom-nav-link">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <div className="main-content" style={{ minHeight: '70vh', padding: '2rem 0' }}> {/* Lisätään padding ja minHeight */}
            <div className="d-flex justify-content-around">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title className="card_custom-title">Welcome! <br /> {email ? email : "Guest"} </Card.Title> {/* Näytetään email */}
                        <Card.Text className='card_info'>
                            Start, pause or end your studying time.
                        </Card.Text>
                        <div className="d-flex justify-content-center">  {/* Keskittää painikkeet */}
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="success" onClick={handleStart} disabled={isStartDisabled}>Start</Button>
                                <Button variant="warning" onClick={handlePause}disabled={isPauseDisabled}>Pause</Button>
                                <Button variant="danger" onClick={handleStop}disabled={isStopDisabled}>Stop</Button>
                            </ButtonGroup>
                        </div>
                        <br /><br /><br />
                        <Row className="d-flex justify-content-center">
                            <Col xs={12} className="text-center">
                                {renderIcon()}
                                <p className='card_studing_state'>{renderText()}</p> {/* Näytetään tila tekstinä */}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </div >

        <footer className="custom-footer">
            <Container className="p-4">
                <section className="mb-4">
                    <p></p>
                </section>
            </Container>

            <div className="text-center p-3" style={{ backgroundColor: 'black' }}>
                © 2024 Tomi Väisänen
            </div>
        </footer>
    </>
);
};
export default Home;
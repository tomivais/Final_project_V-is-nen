    import { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import Card from 'react-bootstrap/Card'; // Tuodaan Card
    import Button from 'react-bootstrap/Button'; // Tuodaan Buttonimport ButtonGroup from 'react-bootstrap/ButtonGroup';
    import ButtonGroup from 'react-bootstrap/ButtonGroup';
    import Row from 'react-bootstrap/Row'; // Tuodaan Row
    import Col from 'react-bootstrap/Col'; // Tuodaan Row
    import './Style_Home.css'
    import Start from './Start.jsx'; // Tuo funktio toisesta tiedostosta
    import End from './End.jsx';
    // import Pause from './Pause.jsx';
    import createSessionId from './CreateSessionId.jsx'
    import NavigationBar from './Navigationbar.jsx'; // Varmista, että polku on oikein
    import Footer from './Footer.jsx';



const Home = () => {
    const [email, setEmail] = useState(null); // Tilamuuttuja sähköpostille
    const [sessionId, setSessionId] = useState('');
    const [alarmState, setAlarmState] = useState(''); // Tila, joka seuraa mikä ikoni on näkyvissä
    const usenavigate = useNavigate();
    const [isStartDisabled, setIsStartDisabled] = useState(false);
    const [isStopDisabled, setIsStopDisabled] = useState(true);
    // const [isPauseDisabled, setIsPauseDisabled] = useState(true);

    useEffect(() => {
        let email = sessionStorage.getItem('email');
        setEmail(email); // Tallennetaan email tilaan
        if (email === '' || email === null) {
            usenavigate('/login');
        } else {
            checkExistingSession(sessionId, email);
        }
    }, []);


    const checkExistingSession = async (sessionId, email) => {
        try {
            const response = await fetch(`http://localhost:3000/studies?id=${sessionId}&userId=${email}`);
            const sessions = await response.json();
            const activeSession = sessions.find(session => !session.endtime);
            if (activeSession) {
                setSessionId(activeSession.id);
                setAlarmState('on');
                setIsStartDisabled(true);
                setIsStopDisabled(false);
            }
        } catch (error) {
            console.error("Virhe sessioiden tarkistuksessa: ", error);
        }
    };

    const handleStart = () => {
        const newSessionId = createSessionId();
        sessionStorage.setItem('sessionId', newSessionId);
        setSessionId(newSessionId);
        setIsStartDisabled(true);
        setIsStopDisabled(false);
        // setIsPauseDisabled(false);

        setAlarmState('on');
        make_datetimestamp('on', email, newSessionId);
    };

    // const handlePause = () => {
    //     setIsPauseDisabled(true);
    //     setIsStartDisabled(false);
    //     setAlarmState('snooze');
    //     make_datetimestamp('snooze',sessionId);
    // };
    const handleStop = () => {
        setIsStartDisabled(false);
        setIsStopDisabled(true);
        // setIsPauseDisabled(true);
        setAlarmState('off');
        make_datetimestamp('off', email, sessionId);

    };

    const renderIcon = () => {
        switch (alarmState) {
            case 'on':
                return <img src="/alarm-on.gif" alt="Alarm On Icon" style={{ height: '50px', width: 'auto' }} />;
            // case 'snooze':
            // return <img src="/alarm-off.gif" alt="Alarm Off Icon" style={{ height: '50px', width: 'auto' }} />;
            case 'off':
                return <img src="/alarm-snooze.gif" alt="Alarm Snooze Icon" style={{ height: '50px', width: 'auto' }} />;
        }
    };


    const renderText = () => {
        switch (alarmState) {
            case 'on':
                return "Studying in progress";
            // case 'snooze':
            //     return "Studying pause";

            case 'off':
                return "You end your daily studies";
        }
    };

    const make_datetimestamp = async (alarmState, email, sessionId) => {
        try {

            let result;
            if (alarmState === 'on') {
                result = await Start(email, sessionId,result);
            } else if (alarmState === 'off') {
                result = await End(sessionId,result);
            } else {
                throw new Error("Unknown state");
            }

        if (result && result.success) {
                console.log("Kirjautuminen onnistui, sessio:" + sessionId);
            }
            else {
                console.error("Aikaleiman tallentaminen epäonnistui:" + sessionId);

            }
        } catch (error) {
            console.error("Virhe tallennuksessa: ", error);
        }
    };

    return (
        <>
            <NavigationBar /> {/* Lisätään NavigationBar-komponentti */}
            <div className="main-content" style={{ minHeight: '70vh', padding: '2rem 0' }}> {/* Lisätään padding ja minHeight */}
                <div className="d-flex justify-content-around">
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title className="card_custom-title">Welcome! <br /> {email ? email : "Guest"} </Card.Title> {/* Näytetään email */}
                            <Card.Text className='card_info'>
                                Start or end your studying time.
                            </Card.Text>
                            <div className="d-flex justify-content-center">  {/* Keskittää painikkeet */}
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="success" onClick={handleStart} disabled={isStartDisabled}>Start</Button>
                                    {/* <Button variant="warning" onClick={handlePause}disabled={isPauseDisabled}>Pause</Button> */}
                                    <Button variant="danger" onClick={handleStop} disabled={isStopDisabled}>Stop</Button>
                                </ButtonGroup>
                            </div>
                            <br /><br />
                            <Row className="d-flex justify-content-center">
                                <Col xs={12} className="text-center">
                                    {renderIcon()}
                                    <p className='card_studing_state'>{renderText()}</p> {/* Näytetään tila tekstinä */}
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center">
                                <Col xs={12} className="text-center">
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </div >
            <Footer /> {/* Lisätään footer-komponentti */}
        </>
    );
};
export default Home;
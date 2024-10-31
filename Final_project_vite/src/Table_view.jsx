import  { useEffect, useState } from 'react';
import NavigationBar from './Navigationbar.jsx'; // Varmista, että polku on oikein
import Footer from './Footer.jsx';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import moment from 'moment';
import { Spinner } from 'react-bootstrap'; // Lisää tämä rivi




const Table_view = () => {
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const [column, setColumn] = useState([]);
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const email = sessionStorage.getItem('email');
        setEmail(email);
        if (email === '' || email === null) {
            navigate('/login');
        } else {
            read_user_studies(email);
        }
    }, [navigate]);

    const read_user_studies = async (email) => {
        try {
            const response = await fetch(`http://localhost:3000/studies?userId=${email}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const reversedData = data.reverse();
            if (reversedData && reversedData.length > 0) {
                setColumn(Object.keys(reversedData[0]));
                setRecords(reversedData); 
                console.log("Löytyy");
                setIsLoading(false); // Asetetaan isLoading false, kun data on ladattu

            } else {
                console.error("Ei tietoja saatavilla");
                toast.error("Ei tietoja saatavilla");
            }
        } catch (error) {
            console.error("Error fetching: ", error);
            toast.error("Virhe tietojen haussa: " + error.message);
        }
    };
    const Calculate_time = (starttime, endtime) => {
        const timeFormat = "DD.MM.YYYY [klo] HH.mm";

        const start = moment(starttime, timeFormat);
        const end = moment(endtime, timeFormat);

        const duration = moment.duration(end.diff(start));

        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();

        return `${hours} h ${minutes} min`;
    };

    const calculateTotal = (index) => {
        const timeFormat = "DD.MM.YYYY [klo] HH.mm";
        let TotalDuration = moment.duration(); // Alusta kumulatiivinen kesto

        // Käy läpi kaikki rivit ensimmäisestä nykyiseen indeksiin saakka
        for (let i = 0; i <= index; i++) {
            const start = moment(records[i].starttime, timeFormat);
            const end = moment(records[i].endtime, timeFormat);
            const duration = moment.duration(end.diff(start));
            TotalDuration.add(duration);
        }

        // Palauta kumulatiivinen aika tunti- ja minuuttimuodossa
        const hours = Math.floor(TotalDuration.asHours());
        const minutes = TotalDuration.minutes();
        return `${hours} h ${minutes} min`;
    };



    return (
        <>
            <NavigationBar /> {/* Lisää NavigationBar-komponentti */}
            <div className="main-content">
                <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Duration total</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? ( // Näytä spinner, kun dataa ladataan
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        <Spinner animation="border" variant="secondary" />
                                    </TableCell>
                                </TableRow>
                            ) : records.length > 0 ? (
                                records.map((record, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{record.starttime}</TableCell>
                                        <TableCell>{record.endtime}</TableCell>
                                        <TableCell>{Calculate_time(record.starttime, record.endtime)}</TableCell>
                                        <TableCell>{calculateTotal(i)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        Something went wrong!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <br /><br />
            <Footer /> {/* Lisää Footer-komponentti */}
        </>
    );
};

export default Table_view;

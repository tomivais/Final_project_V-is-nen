import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; // Tuodaan ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"; // Tämä lisäys on tarpeellinen Link-komponentin käyttöön
import Card from 'react-bootstrap/Card';

// https://www.youtube.com/watch?v=5OV-TYyJEnw&t=0s

const Register = () => {
    const [Email, Idchange] = useState("");
    const [Firstname, Firstnamechange] = useState("");
    const [Lastname, Lastnamechange] = useState("");
    const [Password, Passwordchange] = useState("");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'All fields are mandatory';

        if (Firstname == null || Firstname == '' || Lastname == null || Lastname == '' || Email == null || Email == '' || Password == null || Password == '') {
            isproceed = false;
        }

        if (isproceed == false) {
            toast.warning(errormessage);
        }

        return isproceed;
    }

   

    const handlesubmit = async (e) => {
        e.preventDefault();
        let regobj = { id: Email, Firstname, Lastname, Password };

        try {
            const response = await fetch(`http://localhost:3001/users?id=${Email}`);
            const data = await response.json();
    
            if (data.length > 0) {
                toast.error('Email already has a profile.');
                return;
            }
        } catch (error) {
            console.error("Virhe tarkistuksessa: ", error);
            toast.error('Virhe tarkistuksessa: ' + error.message);
            return;
        }

        if (IsValidate()) {
            fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regobj)
            })
                .then((res) => {
                    if (res.ok) {
                        toast.success('Registered successfully, please waith and try login.');
                        // Lisätään viive ennen uudelleenohjausta
                        setTimeout(() => {
                            navigate('/login');
                        }, 4000); // Viive (3 sekuntia)
                    } else {
                        toast.error('Failed: ' + res.statusText);
                    }
                })
                .catch((error) => {
                    toast.error('Failed: ' + error.message);
                });

        }

    };

    return (
        <div className="main-content" style={{ minHeight: '70vh', padding: '2rem 0' }}> {/* Lisätään padding ja minHeight */}
            <ToastContainer />
            <div className="d-flex justify-content-around">
            <form onSubmit={handlesubmit}>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title>User Registration</Card.Title>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Firstname <span className="errmsg">*</span></label>
                                                <input required value={Firstname} onChange={e => Firstnamechange(e.target.value)} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Lastname <span className="errmsg">*</span></label>
                                                <input required value={Lastname} onChange={e => Lastnamechange(e.target.value)} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Email <span className="errmsg">*</span></label>
                                                <input required value={Email} onChange={e => Idchange(e.target.value)} type="email" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Password <span className="errmsg">*</span></label>
                                                <input required value={Password} onChange={e => Passwordchange(e.target.value)} type="password" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                    <Link className="btn btn-danger" to="/login">Back</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </form>
                </div>
        </div>

    );
}

export default Register;

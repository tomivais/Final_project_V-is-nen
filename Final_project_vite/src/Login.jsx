import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Card from 'react-bootstrap/Card';

const Login = () => {
    const [email, emailUpdate] = useState('');
    const [password, passwordUpdate] = useState('');


    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, [])




    const proceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:3001/users/" + email).then((res) => {
                return res.json();
            }).then((resp) => {
                //  console.log(resp);
                if (Object.keys(resp).length === 0) {
                    toast.error('Please valid email');
                } else {
                    if (resp.Password === password) {
                        toast.success('Succes');
                        // const sessionId = createSessionId();

                        sessionStorage.setItem('email', email);
                        // sessionStorage.setItem('sessionId', sessionId);

                        usenavigate('/');
                    } else {
                        toast.error('Incorrect password');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed: ' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please enter your email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please enter your password');
        }
        return result;
    }

    return (
        <div className="main-content" style={{ minHeight: '70vh', padding: '2rem 0' }}> {/* Lisätään padding ja minHeight */}
            <ToastContainer />
            <div className="d-flex justify-content-around">
                    <form onSubmit={proceedLogin}>
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Title>User Login</Card.Title>
                                <div className="card-body">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email<span className="errmsg">*</span></label>
                                            <input required value={email} onChange={e => emailUpdate(e.target.value)} type="email" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Password<span className="errmsg">*</span></label>
                                            <input required value={password} onChange={e => passwordUpdate(e.target.value)} type="password" className="form-control" />
                                        </div>
                                    </div>

                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <Link className="btn btn-success" to="/register">Register</Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </form>
                </div>
            </div>
    );
}
export default Login;

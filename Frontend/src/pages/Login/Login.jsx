import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Navbar } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function Login() {
    const { id } = useParams();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Username: "",
        Password: "",
        institution: "",
        loginType: "",
    });
    const [institutions, setInstitutions] = useState([]);

    useEffect(() => {
        try {
            const getInstitutions = async () => {
                console.log("Inside getInstitutions function");
                const res = await axios.get(`/registeredColleges`);
                console.log(axios.defaults.baseURL);
                setInstitutions(res.data.result);
                console.log("Data for Institutions apiCall" + res.data);
            };
            getInstitutions();
        } catch (error) {
            console.error("Error during fetching institutions:", error);
            toast.error("An error occurred during fetching institutions");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        formData.loginType = id.charAt(0).toUpperCase() + id.slice(1);
        try {
            const res = await axios.post(`/login`, formData);
            console.log(res.data);
            if (res.data.success) {
                Cookies.set(`${id}Token`, res.data.token);
                toast.success("Login successful");
            } else {
                toast.error("Invalid Credentials");
                return;
            }
            if (id == "students") {
                navigate("/student/assignments");
            } else if (id === "professors") {
                navigate("/professor/assignments");
            } else {
                toast.error("Invalid login type");
                return;
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred during login please try again");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "95vh",
                color: "white",
                backgroundImage: "url('/assets/images/CodeSpherebg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <NavBar />
            <Form 
            style={{
                marginTop: '50px',
                backgroundColor: "rgba(134, 184, 193, 0.4)",
                padding: "50px",
                borderRadius: "20px",
                
            }}
             onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">{`${id.toUpperCase()} LOGIN`}</h1>

                <Form.Group className="mb-3" controlId="formGridState">
                    <Form.Label>Institution</Form.Label>
                    <Form.Select value={formData.institution} onChange={handleChange} name="institution" required>
                        <option value="" disabled>
                            Select an Institution
                        </option>
                        {institutions.map((institution, index) => (
                            <option value={institution.Name} key={index}>
                                {institution.Name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username here"
                        name="Username"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password here"
                        name="Password"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "15px",
                    }}
                >
                    <Button variant="primary" style={{ 
                        font: "Fira Code",
                        paddingLeft: "20px", 
                        paddingRight: "20px",
                        color: "var(--light)",
                        backgroundColor: "var(--sec)",
                        borderColor: "var(--light)",
                        transition: "box-shadow 0.3s ease-in-out",                        
                    }} type="submit"
                        onMouseOver={(e) => {
                            e.target.style.boxShadow = "0 0 10px rgba(134, 184, 193, 1)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.boxShadow = "0 0 10px rgba(134, 184, 193, 0.6)";
                          }}
                        >
                        Submit                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Login;

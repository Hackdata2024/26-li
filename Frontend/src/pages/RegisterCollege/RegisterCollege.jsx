import { useEffect, useState } from "react";
import { Form, Button, Navbar } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function RegisterCollege() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        collegeName: "",
        name: "",
        email: "",
        phoneNo: "",
    });

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
        try {
            const res = await axios.post(`/registerCollege`, formData);
            toast.success("Your College has been registered successfully, Our Team will Contact You");
            console.log(res.data);
        } catch (error) {
            
            console.error("Error during login:", error);
            toast.error("An error occurred during login");
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
                    marginTop:"50px",
                    backgroundColor: 'rgba(13, 15, 26, 0.7)',
                    padding: '50px',
                    borderRadius: '30px',
                    width: "65vw",

                    '@media (maxWidth: 400px)': {
                    padding: '20px !important',
                    borderRadius: '10px !important',
                    width: "80vw !important",
                    },
                }}
                className="registercollege"
                onSubmit={handleSubmit}
                >
                <h1 className="text-center mb-4">{`REGISTER YOUR COLLEGE`}</h1>

                <div
                // style={{
                //     width: '50%'
                // }}
                >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>College Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your college name here"
                        name="collegeName"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name here"
                        name="name"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your email here"
                        name="email"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter your phone number here"
                        name="phoneNo"
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
                </div>
            </Form>
        </div>
    );
}

export default RegisterCollege;

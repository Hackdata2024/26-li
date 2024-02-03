import React, { useEffect, useState } from "react";
import "./SideNavbar.css";
import { Link, useParams } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoPersonSharp } from "react-icons/io5";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Cookies from "js-cookie";
import ApiCall from "../../util/ApiCall";

const Sidenav = () => {
    const [sidenavWidth, setSidenavWidth] = useState(0);
    const [sidenavItems, setSidenavItems] = useState([]);
    const [profileDetails, setProfileDetails] = useState({});

    var currentURL = window.location.href;
    currentURL = currentURL.split("/");
    currentURL = currentURL[currentURL.length - 2];

    useEffect(() => {
        console.log("Inside Sidenav useEffect");
        const getProfileDetails = async (url) => {
            try {
                const response = await ApiCall(url, "GET");
                setProfileDetails(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (currentURL === "student") {
            setSidenavItems([
                { name: "Assignments", link: `/${currentURL}/assignments` },
                { name: "Evals", link: `/${currentURL}/evals` },
            ]);
            getProfileDetails("students/profile");
        } else {
            setSidenavItems([
                { name: "Assignments", link: `/${currentURL}/assignments` },
                { name: "Evaluations", link: `/${currentURL}/evals` },
                { name: "Add Questions", link: `/${currentURL}/addQuestion` },
                { name: "Questions", link: `/${currentURL}/Questions` },
            ]);
            getProfileDetails("/professors/profile");
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("studentsToken");
        Cookies.remove("professorsToken");
        window.location.href = "/";
    };

    const openNav = () => {
        setSidenavWidth(250);
    };

    const closeNav = () => {
        setSidenavWidth(0);
    };
    return (
        <div className="sidenavvbar">
            <div id="mySidenav" className="sidenav" style={{ width: `${sidenavWidth}px` }}>
                <Link href="" className="closebtn" onClick={closeNav}>
                    &times;
                </Link>

                <hr style={{ color: "white" }} />
                {sidenavItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <Link className="sidelink" to={item.link}>
                                {item.name}
                            </Link>
                            <hr style={{ color: "white" }} />
                        </div>
                    );
                })}
            </div>

            <span style={{ fontSize: "30px", cursor: "pointer", padding: "15px" }} onClick={openNav}>
                &#9776;
            </span>
            <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle
                    style={{
                        backgroundColor: "rgba(36,36,36,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        margin: "5px 5px",
                        height: "40px",
                        width: "40px",
                    }}
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                    className="custom-toggle"
                >
                    <IoPersonSharp />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <div style={{ textAlign: "center", margin: "10px 0px" }}>{profileDetails.Name}</div>
                    <div style={{ textAlign: "center", margin: "10px 0px" }}>{profileDetails.institution}</div>
                    <Dropdown.Divider />
                    <Dropdown.Item style={{ textAlign: "center" }} onClick={handleLogout} href="#/action-4">
                        Log Out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default Sidenav;

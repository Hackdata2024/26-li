import React from "react";
import Sidenav from "../../components/SideNavbar/SideNavbar";
import MainSection from "../../components/MainSection/MainSection";

const Professor = () => {
    var currentURL = window.location.href;
    currentURL = currentURL.split("/");
    const section = currentURL[currentURL.length - 1];
    const user = currentURL[currentURL.length - 2];
    // console.log(section);
    // console.log(user);

    return (
        <>
            <Sidenav />
            <MainSection />
        </>
    );
};

export default Professor;

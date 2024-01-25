import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Title from "./pages/Title";
import {Container, Nav, Navbar} from "react-bootstrap";
import {SettingsContext} from "./context";



function App() {
    const [outdatedMonth, setOutdatedMonth] = useState(3)

    useEffect(() => {
        if (localStorage.getItem('outdatedMonth')) {
            let months = Number(localStorage.getItem('outdatedMonth'))
            setOutdatedMonth(months)
        }
    }, [])

    return (
        <SettingsContext.Provider value={{
            outdatedMonth, setOutdatedMonth
        }}>
            <BrowserRouter>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                      <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" activeClassName="active">Список</Nav.Link>
                        <Nav.Link as={Link} to="/settings" activeClassName="active">Настройки</Nav.Link>
                        <Nav.Link as={Link} to="/get_image_title" activeClassName="active">Название</Nav.Link>
                      </Nav>
                    </Container>
                </Navbar>
                <Routes>
                    <Route path="/" element={<Payments />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/get_image_title" element={<Title />} />
                    <Route path="*" element={<Payments />} />
                </Routes>
            </BrowserRouter>
        </SettingsContext.Provider>
    );
}

export default App;

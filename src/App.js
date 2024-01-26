import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Title from "./pages/Title";
import {Container, Fade, Nav, Navbar, Toast, ToastContainer} from "react-bootstrap";
import {SettingsContext} from "./context";


function App() {
    const [outdatedMonth, setOutdatedMonth] = useState(3)
    const [publicUrl, setPublicUrl] = useState('')
    const [paymentsCount, setPaymentsCount] = useState(0)
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('outdatedMonth')) {
            let months = Number(localStorage.getItem('outdatedMonth'))
            setOutdatedMonth(months)
        }

        if (localStorage.getItem('publicUrl')) {
            let url = localStorage.getItem('publicUrl')
            setPublicUrl(url)
        }
    }, [])

    return (
        <SettingsContext.Provider value={{
            outdatedMonth, setOutdatedMonth,
            publicUrl, setPublicUrl,
            paymentsCount, setPaymentsCount,
            showToast, setShowToast,
        }}>
            <BrowserRouter>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                      <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" activeClassName="active">
                            Список <span className="badge bg-secondary">{paymentsCount}</span>
                        </Nav.Link>
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
            <ToastContainer className="position-fixed bottom-0 start-50 translate-middle-x mb-2">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={1000} autohide bg="dark">
                  <Toast.Body className="text-white">Скопировано!</Toast.Body>
                </Toast>
            </ToastContainer>
        </SettingsContext.Provider>
    );
}

export default App;

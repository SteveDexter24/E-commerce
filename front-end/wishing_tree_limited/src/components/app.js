import React from "react";
import { Container } from "react-bootstrap";
import Header from "./header";
import Footer from "./footer";
const App = () => {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <h1>Welcome to Wishing Tree Limited E-Shop</h1>
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default App;

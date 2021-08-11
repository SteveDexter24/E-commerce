import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./header";
import Footer from "./footer";
import HomeScreen from "../screens/homeScreen";
import ProductScreen from "../screens/productScreen";
import "../index.css";

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/" exact component={HomeScreen} />
                    <Route
                        path="/product/:id"
                        exact
                        component={ProductScreen}
                    />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;

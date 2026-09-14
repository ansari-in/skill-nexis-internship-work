import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Button from "./components/Button";
import Form from "./components/Form";

function App() {
    const [count, setCount] = useState(0);

    const cards = [
        {
            title: "HTML",
            description: "Used to create the structure of web pages."
        },
        {
            title: "CSS",
            description: "Used to style and design web pages."
        },
        {
            title: "JavaScript",
            description: "Used to add functionality to websites."
        }
    ];

    return (
        <>
            <Header title="React Components Practice" />

            <main>
                <section id="home">
                    <h2>Welcome</h2>
                    <p>
                        This page demonstrates reusable React components,
                        props and state.
                    </p>
                </section>

                <section id="cards">
                    <h2>My Cards</h2>

                    <div className="cards">
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                title={card.title}
                                description={card.description}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h2>Counter</h2>

                    <p>Count: {count}</p>

                    <Button
                        text="Increase"
                        onClick={() => setCount(count + 1)}
                    />

                    <Button
                        text="Decrease"
                        onClick={() => setCount(count - 1)}
                    />
                </section>

                <section id="form">
                    <Form />
                </section>
            </main>

            <Footer name="Intesab" />
        </>
    );
}

export default App;
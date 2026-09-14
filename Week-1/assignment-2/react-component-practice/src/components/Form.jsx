import { useState } from "react";

function Form() {
    const [name, setName] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (name.trim() === "") {
            alert("Please enter your name.");
            return;
        }

        alert("Hello, " + name);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Simple Form</h2>

            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
function Header({ title }) {
    return (
        <header>
            <h1>{title}</h1>
            <nav>
                <a href="#home">Home</a>
                <a href="#cards">Cards</a>
                <a href="#form">Form</a>
            </nav>
        </header>
    );
}

export default Header;
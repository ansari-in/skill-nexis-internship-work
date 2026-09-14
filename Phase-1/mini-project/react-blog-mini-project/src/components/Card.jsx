function Card({ title, description }) {
    return (
        <div className="blog-card">
            <h3>{title}</h3>
            <p>{description}</p>

            <a href="#">Read More</a>
        </div>
    );
}

export default Card;
import { useState } from "react";
import posts from "./data/posts.json";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";

function App() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const categories = ["All", "React", "JavaScript", "HTML", "CSS"];

    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || post.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Header title="My React Blog" />

            <main>
                <section className="blog-header">
                    <h2>Blog Posts</h2>
                    <p>Read my latest posts about web development.</p>

                    <div className="filters">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        >
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                <section>
                    <div className="blog-grid">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <Card
                                    key={post.id}
                                    title={post.title}
                                    description={post.description}
                                />
                            ))
                        ) : (
                            <p>No posts found.</p>
                        )}
                    </div>
                </section>
            </main>

            <Footer name="Intesab" />
        </>
    );
}

export default App;
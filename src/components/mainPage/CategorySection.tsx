import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/modules/mainPageComponents/CategorySection.module.css";
import type { Review } from "../../types/Reviews";


export default function CategorySection() {
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch("/data/reviews.json")
            .then(res => res.json())
            .then((data: Review[]) => {

                const categoriesSet = new Set<string>();

                data.forEach(review => {
                    review.tags?.forEach(tag => categoriesSet.add(tag));
                });

                setAvailableCategories(Array.from(categoriesSet));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Categorías</h1>

            <section className={styles.grid}>
                {availableCategories.sort().map((cat) => (
                    <Link
                        key={cat}
                        to={`/category/${cat}`}
                        className={styles.tag}
                    >
                        {cat.replace(/_/g, " ").toUpperCase()}
                    </Link>
                ))}
            </section>
        </div>
    );
}
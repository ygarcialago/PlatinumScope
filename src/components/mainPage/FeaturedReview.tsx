import { useEffect, useMemo, useState } from "react";
import type { Review } from "../../types/Reviews";
import styles from "../../styles/modules/mainPageComponents/FeaturedReview.module.css"
import { Link } from "react-router-dom";

export default function FeaturedReview() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetch("/data/reviews.json")
            .then((res) => res.json())
            .then((data: Review[]) => setReviews(data))
            .catch((err) => console.error(err));
    }, []);

    const featured = useMemo(() => {
        if (!reviews.length) return [];

        return [...reviews]
            .sort(
                (a, b) =>
                    new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
            )
            .slice(0, 3);
    }, [reviews]);

    if (!featured.length) return null;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Últimas reviews</h1>
            <div className={styles.latestReviewsContainer}>
                <section className={styles.featured}>
                    <Link to={`/review/${featured[0].id}`} className={styles.link}>
                        <img
                            src={featured[0].imagen}
                            alt={featured[0].titulo}
                            className={styles.image}
                        />

                        <div className={styles.overlay}>
                            <h2>{featured[0].titulo}</h2>
                            {/* <p>Última review →</p> */}
                        </div>
                    </Link>
                </section>
                <div className={styles.bottomRow}>
                    {featured.slice(1, 3).map((review) => (
                        <section key={review.id} className={styles.smallFeatured}>
                            <Link to={`/review/${review.id}`} className={styles.link}>
                                <img
                                    src={review.imagen}
                                    alt={review.titulo}
                                    className={styles.smallImage}
                                />

                                <div className={styles.smallOverlay}>
                                    <h3>{review.titulo}</h3>
                                </div>
                            </Link>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
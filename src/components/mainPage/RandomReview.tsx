import { useEffect, useState } from "react";
import type { Review } from "../../types/Reviews";
import { useNavigate } from "react-router-dom";
import styles from '../../styles/modules/mainPageComponents/RandomReview.module.css'

export default function RandomReview() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/data/reviews.json")
            .then(res => res.json())
            .then((data: Review[]) => setReviews(data))
            .catch(err => console.error(err));
    }, []);

    const goToRandomReview = () => {
        if (!reviews.length) return;

        const randomIndex = Math.floor(Math.random() * reviews.length);
        const randomReview = reviews[randomIndex];

        navigate(`/review/${randomReview.id}`);
    };

    return (
        <button onClick={goToRandomReview} className={styles.randomReviewButton}>
            🎲 Review aleatoria
        </button>
    );
}
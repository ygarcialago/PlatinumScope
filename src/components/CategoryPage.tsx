import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Review } from "../types/Reviews";
import type { GameTag } from "../enum/GameTag";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from '../styles/modules/category.module.css';
import Footer from "./Footer";

export default function CategoryPage() {
  const { tag } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then(res => res.json())
      .then((data: Review[]) => {
        const filtered = data.filter(r => r.tags?.includes(tag as GameTag));
        setReviews(filtered);
      });
  }, [tag]);

  useEffect(() => {document.title = `Platinum Scope - ${tag?.toLocaleUpperCase()}` })

  return (
    <>
    <SearchBar/>
    <main className={styles.mainTagged}>
      <h1>Categoría: {tag?.replace(/_/g, " ").toLocaleUpperCase()}</h1>

      <ul>
        {reviews.map(r => (
          
          <li className={styles.gamesTagged} key={r.id}>
          <Link to={`/review/${r.id}`}>
            <img src={r.imagen} alt={r.titulo} className={styles.gameImage}/>
            {r.titulo}
          </Link>
          </li>
          
        ))}
      </ul>
    </main>
    <Footer/>
    </>
  );
}
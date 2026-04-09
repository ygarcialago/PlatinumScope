import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Fuse from "fuse.js";
import type { Review } from "../types/Reviews";
import ThemeToggle from "./ThemeToggle";
import styles from '../styles/modules/searchBar.module.css'
import type { GameTag } from "../enum/GameTag";

export default function SearchBar() {
  const { tag } = useParams<{ tag?: string }>();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Review[]>([]);
  const [fuse, setFuse] = useState<Fuse<Review> | null>(null);
  const [allReviews] = useState<Review[]>([]);
  const [category, setCategory] = useState<GameTag | "">("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/reviews.json")
      .then(res => res.json())
      .then((data: Review[]) => {
        setFuse(new Fuse(data, {
          keys: ["titulo"],
          threshold: 0.4,
          ignoreLocation: true,
        }));

        const categoriesSet = new Set<string>();
        data.forEach(review => {
          review.tags?.forEach(tag => categoriesSet.add(tag));
        });
        setAvailableCategories(["", ...Array.from(categoriesSet)]);
      })
      .catch(err => console.error("Error cargando JSON:", err));
  }, []);

  useEffect(() => {
    setQuery("");
    setResults([]);
  }, [location.pathname]);

  useEffect(() => {
    if (!fuse) return;

    let matches: Review[];

    if (query) {
      matches = fuse.search(query).map(m => m.item);
    } else {
      
      matches = allReviews;

      if (category) {
        matches = matches.filter(r => r.tags?.includes(category));
      }
    }

    setResults(matches);
  }, [query, category, fuse, allReviews]);

  useEffect(() => {
    if (!tag || availableCategories.length === 0) return;

    if (availableCategories.includes(tag)) {
      setCategory(tag as GameTag);
    }
  }, [tag, availableCategories]);

  return (
    <section className={styles.barraBuscador}>
      <div className={styles.barraContenido}>
        <Link className={styles.link} to={'/'} onClick={() => document.title = 'PlatinumScope'}>
          <h2 className={styles.tituloBuscador}>PlatinumScope - Reviews de mis platinos</h2>
        </Link>
        <select
          className={styles.categorySelect}
          value={category}
          onChange={(e) => {
            const value = e.target.value as GameTag | "";
            setCategory(value);
            if (value) navigate(`/category/${value}`);
          }}
        >
          {availableCategories.sort().map(cat => {
            if (tag && cat === "") return null;
            return <option key={cat} value={cat}>{cat.replace(/_/g, " ").toLocaleUpperCase() || "Categorías"}</option>;
          })}
        </select>
        <div className={styles.buscadorContenedor}>
          <input
            type="text"
            className={styles.buscador}
            placeholder="Buscar reviews"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <ul className={`resultados ${results.length ? "visible" : ""}`}>
            {results.map(r => (
              <li key={r.id}>
                {r.id !== "0" ? (
                  <Link to={`/review/${r.id}`}>{r.titulo}</Link>
                ) : r.titulo}
              </li>
            ))}
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </section>
  );
}

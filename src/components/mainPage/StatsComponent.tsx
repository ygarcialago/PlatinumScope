import { useEffect, useState } from "react";
import styles from "../../styles/modules/mainPageComponents/StatsComponent.module.css";

type Stats = {
    games_completed: number;
    hours_dedicated: number;
};

export default function StatsComponent() {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        fetch("/data/stats.json")
            .then(res => res.json())
            .then((data: Stats) => setStats(data))
            .catch(err => console.error(err));
    }, []);

    if (!stats) return <p>Cargando stats...</p>;

    return (
        <div className={styles.statsContainer}>
            <h2>Stats</h2>
            <p>Juegos platinados: {stats.games_completed}</p>
            <p>Horas dedicadas: {stats.hours_dedicated}</p>
        </div>
    );
}
import type { GameTag } from '../../enum/GameTag';
import styles from '../../styles/modules/reviewComponents/tags.module.css'

type Props = { tags: GameTag[] };


export function TagsSection(tags: Props) {

    return (
        <section className={styles.tagsSection}>
            <h3>Tags: </h3>
            
            <div className={styles.tagsContainer}>
                {tags.tags.map(tag => (
                    <span key={tag} className={styles.tag}>
                        {tag.replace(/_/g, " ").toUpperCase()}
                    </span>
                ))}
            </div>
            
        </section>
    );
}

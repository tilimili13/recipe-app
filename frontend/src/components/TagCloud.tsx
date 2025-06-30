import styles from './TagCloud.module.css';

interface TagCloudProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

const TagCloud: React.FC<TagCloudProps> = ({ tags, selectedTags, onTagClick }) => {
  return (
    <div className={styles.tagCloud}>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);

        return (
          <button
            key={tag}
            className={`${styles.tag} ${isSelected ? styles.selected : ''}`}
            onClick={() => onTagClick(tag)}
          >
            {tag} {isSelected && <span className={styles.closeIcon}>✖</span>}
          </button>
        );
      })}
    </div>
  );
};

export default TagCloud;

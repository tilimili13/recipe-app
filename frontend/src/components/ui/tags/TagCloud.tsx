import styles from "./TagCloud.module.css";
import { TagCloudProps } from "../../../types/Tags";

const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  selectedTags,
  onTagClick,
}) => {
  console.log("Rendering TagCloud:", { tags, selectedTags });

  return (
    <div className={styles["tagCloud"]}>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            className={`${styles["tag"]} ${
              isSelected ? styles["selected"] : ""
            }`}
            onClick={() => onTagClick(tag)}
          >
            {tag}
            {isSelected && <span className={styles["remove-icon"]}>✖</span>}
          </button>
        );
      })}
    </div>
  );
};

export default TagCloud;

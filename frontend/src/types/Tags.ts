export interface TagCloudProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

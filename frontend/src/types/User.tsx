export interface UserItemProps {
  name: string;
  onDelete: (name: string) => void;
  setLoading: (value: boolean) => void;
}
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  updateSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ updateSearchQuery }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={updateSearchQuery}
    />
  );
}

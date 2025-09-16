import css from "./ErrorMessage.module.css";
interface ErrorMessageProps {
  children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className={css.text}>{children}</p>;
}

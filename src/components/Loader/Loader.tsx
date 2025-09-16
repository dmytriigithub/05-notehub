import css from "./Loader.module.css";
import { FadeLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <FadeLoader color="#0d6efd" />
    </div>
    //  <p className={css.text}>Loading movies, please wait...</p>;
  );
}

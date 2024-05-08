import style from "./message.module.css";

export default function Message({ msg, type,className }) {
  return <div className={style.messageError}>
    {msg}
  </div>;
}

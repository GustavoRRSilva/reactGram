import style from "./message.module.css"
export default function Messagfe({msg,type}) {
  return <div className={`style.message${type}`}>
    {msg}
  </div>;
}

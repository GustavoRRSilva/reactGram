import style from "./navbar.module.css";

//componentes
import Link from "next/link";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

export default function Navbar(second) {
  return (
    <nav className={style.navbar}>
      <Link href="/">Reactgram</Link>
      <form>
        <BsSearch></BsSearch>
        <input type="text"></input>
      </form>
      <ul className={style.links}>
        <Link href="/">
          <BsHouseDoorFill />
        </Link>
        <Link href="/Auth/login">Entrar</Link>
        <Link href="/Auth/register">Cadastrar</Link>
      </ul>
    </nav>
  );
}

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
    <nav className={style.nav}>
      <Link href="/">Reactgram</Link>
      <form>
        <BsSearch></BsSearch>
        <input type="text" placeholder="Pesquisar..."></input>
      </form>
      <ul className={style.navLinks}>
        <Link href="/">
          <BsHouseDoorFill />
        </Link>
        <Link href="/Auth/login">Entrar</Link>
        <Link href="/Auth/register">Cadastrar</Link>
      </ul>
    </nav>
  );
}

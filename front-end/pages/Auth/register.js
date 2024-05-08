import styles from "@/styles/Auth.module.css";

//Componentes
import Link from "next/link";
import Message from "@/components/Message/mesage";
//Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//Redux
import { register, reset } from "@/slices/authSlice";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispath = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    console.log(user);
    dispath(register(user));
  };
  //Clean all auth states
  useEffect(() => {
    dispath(reset());
  }, [dispath]);
  return (
    <div className={styles.register}>
      <h2>React Gram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          required
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          required
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          required
          type="password"
          placeholder="Confirme sua senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        {!loading && <input required type="Submit" value="Cadastrar" />}
        {loading && <input required type="Submit" value="Aguarde..." disabled/>}
        {error && <Message msg = {error} type = "Error"/>}
      </form>
      <p>
        Já tem conta? <Link href="/Auth/login">Clique aqui.</Link>
      </p>
    </div>
  );
}

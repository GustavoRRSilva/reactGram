import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";

export default function MainContainer({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <main className="main-container">{children}</main>
      <Footer></Footer>
    </>
  );
}

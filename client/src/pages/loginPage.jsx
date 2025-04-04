import Form from "../components/LoginForm";
import Navbar from "../components/Navbar";
function Login() {
  return (
    <>
      <Navbar />
      <div className="w-full h-[100%] flex justify-center mt-20 md:mt-24 lg:mt-28">
        <Form />
      </div>
    </>
  );
}
export default Login;

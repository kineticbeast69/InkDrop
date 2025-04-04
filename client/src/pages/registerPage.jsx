import Navbar from "../components/Navbar";
import RegisterForm from "../components/registerForm";
function Register() {
  return (
    <>
      <Navbar />
      <div className="w-full h-[100%] flex justify-center mt-20 md:mt-24 lg:mt-28">
        <RegisterForm />
      </div>
    </>
  );
}
export default Register;

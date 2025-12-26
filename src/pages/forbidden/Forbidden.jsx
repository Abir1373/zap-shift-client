import { Link } from "react-router";
import { FaLock } from "react-icons/fa";
const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-center px-4">
      {/* Animated Icon */}
      <div className="text-9xl  mb-4 animate__animated animate__shakeX text-red-800">
        <FaLock />
      </div>

      {/* Title */}
      <h1 className="text-9xl font-bold text-slate-800 animate__animated animate__fadeInDown">
        403
      </h1>

      {/* Subtitle */}
      <p className="text-xl font-bold mt-2 text-primary animate__animated animate__fadeInUp">
        Forbidden Access
      </p>

      {/* Description */}
      <p className="mt-4 max-w-md text-slate-500 text-5xl animate__animated animate__fadeInUp animate__delay-1s">
        YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE
      </p>

      {/* Action */}
      <Link
        to="/"
        className="mt-6 px-6 py-2 rounded bg-warning text-black text-2xl font-bold hover:bg-info transition animate__animated animate__zoomIn animate__delay-1s"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Forbidden;

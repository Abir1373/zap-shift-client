import { FaTruckMoving } from "react-icons/fa";

const Loading = ({ text = "Processing delivery..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      {/* Icon + Spinner */}
      <div className="relative">
        <FaTruckMoving className="text-5xl text-primary animate-bounce" />
        <span className="loading loading-ring loading-lg text-primary absolute -bottom-4 left-1/2 -translate-x-1/2"></span>
      </div>

      {/* Text */}
      <p className="text-lg font-semibold text-gray-600">{text}</p>

      {/* Progress dots */}
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></span>
      </div>
    </div>
  );
};

export default Loading;

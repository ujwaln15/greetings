import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";

function EmptyChatContainer() {
  return (
    <div className="flex-1 md:bg-[#000000] md:flex flex-col items-center justify-center hidden duration-1000 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="lato-regular">greetings.</h3>
      </div>
    </div>
  );
}

export default EmptyChatContainer;

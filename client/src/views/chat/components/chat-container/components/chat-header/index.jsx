import { useAppStore } from "@/store";
import { RiCloseFill } from "react-icons/ri";
function ChatHeader() {
  const { closeChat } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border[#ffffff] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center"></div>
        <div className="flex gap-5 items-center justify-center">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300">
            <RiCloseFill className="text-3xl" onClick={closeChat} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;

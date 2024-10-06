import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getTheme } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { RiCloseFill } from "react-icons/ri";
function ChatHeader() {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border[#ffffff] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="h-12 w-12 relative">
            {selectedChatType === "duo" ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData.dp ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.dp}`}
                    alt="user"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getTheme(
                      selectedChatData.theme
                    )}`}
                  >
                    {selectedChatData.firstName
                      ? selectedChatData.firstName.split("").shift()
                      : selectedChatData.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
          </div>
          <div>
            {selectedChatType === "gathering"
              ? selectedChatData.name
              : selectedChatData.firstName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : `${selectedChatData.email}`}
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <button className="text-gray-700 focus:border-none focus:outline-none focus:text-white transition-all duration-300">
            <RiCloseFill className="text-3xl" onClick={closeChat} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;

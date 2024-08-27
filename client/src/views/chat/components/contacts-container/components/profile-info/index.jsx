import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import { getTheme } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ProfileInfo() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  const logOut = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-black">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.dp ? (
              <AvatarImage
                src={`${HOST}/${userInfo.dp}`}
                alt="user"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getTheme(
                  userInfo.theme
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div className="lato-regular">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FiEdit2
              className="text-xl font-medium lato-regular"
              onClick={() => navigate("/user")}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-black border-white lato-regular text-white">
            edit profile.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <IoLogOutOutline
              className="text-xl font-medium lato-regular text-red-700"
              onClick={logOut}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-black border-white lato-regular text-white">
            logout.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default ProfileInfo;

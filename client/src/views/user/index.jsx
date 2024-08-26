import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getTheme, themes } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import {
  ADD_DP_ROUTE,
  HOST,
  REMOVE_DP_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";
import { toast } from "sonner";

const User = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dp, setDp] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileComplete) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedTheme(userInfo.theme);
    }
    if (userInfo.dp) {
      setDp(`${HOST}/${userInfo.dp}`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("first name is required.");
      return false;
    }
    if (!lastName) {
      toast.error("last name is required.");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, theme: selectedTheme },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("profile updated.");
          navigate("/chat");
        }
      } catch (err) {
        console.log({ err });
      }
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("dp", file);
      const response = await apiClient.post(ADD_DP_ROUTE, formData, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.dp) {
        setUserInfo({ ...userInfo, dp: response.data.dp });
        toast.success("dp updated.");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_DP_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, dp: null });
        toast.success("dp removed.");
        setDp(null);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const handleReturn = () => {
    if (userInfo.profileComplete) {
      navigate("/chat");
    } else {
      toast.error("please complete profile.");
    }
  };

  return (
    <div className="bg-[#000000] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleReturn}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {dp ? (
                <AvatarImage
                  src={dp}
                  alt="user"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getTheme(
                    selectedTheme
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {isHovered && (
              <div
                className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-700/70 ring-fuchsia-900"
                onClick={dp ? handleDeleteImage : handleFileInputClick}
              >
                {dp ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="dp"
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-xl p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="first name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-xl p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="last name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-xl p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-3 justify-center">
              {themes.map((theme, idx) => (
                <div
                  className={`${theme} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
                    ${
                      selectedTheme === idx
                        ? "outline outline-white outline-3"
                        : ""
                    }`}
                  key={idx}
                  onClick={() => setSelectedTheme(idx)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-blue-700 hover:bg-blue-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default User;

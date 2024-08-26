import { useAppStore } from "@/store";

const User = () => {
  const { userInfo } = useAppStore();
  return (
    <div>
      User
      <div>id: {userInfo.id}</div>
    </div>
  );
};

export default User;

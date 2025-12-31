import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store";

const UserAvatar = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  console.log("user_data", user);
  return (
    <>
      <Avatar>
        <AvatarImage src={user?.avatar || ""} />
        <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h5 className="text-sm font-semibold">{user?.name}</h5>
        <p className="text-xs text-muted-foreground">{t(user?.type || "")}</p>
      </div>
    </>
  );
};

export default UserAvatar;

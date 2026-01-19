import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { type AgentStore } from "@/types/store-type";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Eye, MapPin, Phone, Trash, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ShinyButton } from "../ui/shiny-button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { encodeToFakeUuid } from "@/lib/uuid-obfuscator";

const StoreCard = ({ store }: { store: AgentStore }) => {
  const { t } = useTranslation();
  console.log("store", store);
  const navigate = useNavigate();
  const handleViewStore = (id: number) => {
    const hashId = encodeToFakeUuid(id);
    navigate(`/store/${hashId}`);
  };
  return (
    <Card>
      <CardHeader className="h-24 bg-linear-to-br  from-accent to-accent/20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {store.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <p className="text-sm text-muted-foreground">
                {store.business.business_name}
              </p>
            </div>
          </div>
          <Badge variant="destructive">{t(store.business.status)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 mt-2">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <User size={16} />
          {store.user.name}
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Phone size={16} />
          {/*           {store.} */}
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin size={16} />
          {/* {store.store.street} */}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <ShinyButton className="" onClick={() => handleViewStore(store.id)}>
          <Eye size={16} className="text-muted-foreground" />
        </ShinyButton>

        <ShinyButton className="text-muted-foreground">
          <Trash size={16} className="text-muted-foreground" />
        </ShinyButton>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;

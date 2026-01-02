import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { type AgentStore } from "@/types/store-type";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge, Edit, Eye, Trash, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ShinyButton } from "../ui/shiny-button";

const StoreCard = ({ store }: { store: AgentStore }) => {
  const { t } = useTranslation();
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
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <User />
          {store.user.name}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <ShinyButton>
          <Eye />
        </ShinyButton>
        <ShinyButton>
          <Edit />
        </ShinyButton>
        <ShinyButton>
          <Trash />
        </ShinyButton>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;

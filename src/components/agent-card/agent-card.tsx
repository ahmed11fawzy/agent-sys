import {
  CalendarCheck2,
  Landmark,
  MapPin,
  Phone,
  Target,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { type Agent } from "@/types/agent-types";
import { ShinyButton } from "../ui/shiny-button";

const AgentCard = ({ agent }: { agent: Agent }) => {
  return (
    <Card className="relative  overflow-hidden">
      <CardHeader className="h-24 bg-linear-to-br  from-accent to-accent/20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={agent.user.avatar || ""} />
              <AvatarFallback>
                {agent.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{agent.user.name}</h3>
              <p className="text-sm text-muted-foreground">
                {agent.user.email}
              </p>
            </div>
          </div>
          <Badge variant="secondary">{agent.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3 my-3">
          <div className="flex items-center">
            {" "}
            <Target
              size={16}
              className="inline-block me-1.5 text-muted-foreground text-sm"
            />
            <p className="text-sm ">{agent.daily_target}</p>
          </div>
          <div className="flex items-center">
            <CalendarCheck2
              size={16}
              className="inline-block me-1.5 text-muted-foreground text-sm"
            />
            <p className="text-sm ">{agent.monthly_target}</p>
          </div>
          <div className="flex items-center">
            <Landmark
              size={16}
              className="inline-block me-1.5 text-muted-foreground text-sm"
            />
            <p className="text-sm ">{agent.commission_rate}</p>
          </div>
        </div>
        {/* contacts details */}
        <div className="flex flex-col gap-2 mt-2">
          <p className="text-sm text-muted-foreground">
            <Phone
              size={16}
              className="inline-block me-1.5 text-foreground text-sm"
            />
            {agent.user.phone}
          </p>

          <p className="text-sm text-muted-foreground">
            <MapPin
              size={16}
              className="inline-block me-1.5 text-foreground text-sm"
            />
            {agent.current_lat}
          </p>
          <p className="text-sm text-muted-foreground">
            <Wallet
              size={16}
              className="inline-block me-1.5 text-foreground text-sm"
            />
            {agent.base_salary}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <ShinyButton>View Details</ShinyButton>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;

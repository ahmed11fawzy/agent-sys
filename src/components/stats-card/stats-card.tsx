import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import type { StatsCardProps } from "./types";
import { useTranslation } from "react-i18next";

const StatsCard = ({
  title,
  subtitle,
  icon,
  Badge: { variant, className, badgeTitle, badgeIcon },
}: StatsCardProps) => {
  const { t } = useTranslation();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h4>
            <span>{icon}</span>
          </h4>
          <Badge variant={variant} className={className}>
            {badgeIcon}
            {t(badgeTitle)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-bold">{t(title)}</CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground">{t(subtitle)}</p>
      </CardFooter>
    </Card>
  );
};

export default StatsCard;

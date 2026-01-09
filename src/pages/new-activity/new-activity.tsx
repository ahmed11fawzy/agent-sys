import { NewActivityForm } from "@/components/forms/new-activity-form";
import Header from "@/components/page-header/Header";
import { Activity } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewActivity = () => {
  const { t } = useTranslation();

  return (
    <main className="mt-5 space-y-6">
      <Header
        title={t("New Activity")}
        subTitle={t("Create a new activity for a store")}
        icon={<Activity />}
      />
      <section>
        <Card>
          <CardHeader>
            <CardTitle>{t("Activity Details")}</CardTitle>
          </CardHeader>
          <CardContent>
            <NewActivityForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default NewActivity;

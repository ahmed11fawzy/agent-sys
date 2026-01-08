import React, { type JSX } from "react";
import { useTranslation } from "react-i18next";

const Header = ({
  title,
  subTitle,
  icon,
}: {
  title: string;
  subTitle: string;
  icon: JSX.Element;
}) => {
  const { t } = useTranslation();
  return (
    <header className="mb-6">
      <h3 className="text-3xl font-semibold"> {t(title)} </h3>
      <p className="text-sm text-muted-foreground mt-0.5">{t(subTitle)}</p>
    </header>
  );
};

export default Header;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { SidebarTrigger } from "../ui/sidebar";

import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";

import { setLanguage, setTheme, type Language } from "@/features/setting-slice";

import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import UserAvatar from "../user-avatar/user-avatar";
const ToolBar = () => {
  const { theme, language } = useAppSelector((state) => state.settings);
  console.log(theme);
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  /* const toggleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  }; */

  const toggleLanguage = (newLanguage: Language) => {
    console.log(newLanguage);
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="flex justify-between align-center  py-2 mt-2 ">
      <SidebarTrigger className=" flex   h-full align-center" />
      <div className="flex gap-3 align-center">
        <div className="cursor-pointer text-sm flex align-center">
          <AnimatedThemeToggler />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer bg-transparent"
              >
                {language}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`w-44 shadow-sm shadow-slate-800 ms-14 mt-2  ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              <DropdownMenuRadioGroup
                value={language}
                onValueChange={(value) => toggleLanguage(value as Language)}
              >
                <DropdownMenuRadioItem
                  className="cursor-pointer hover:bg-accent p-2 text-sm hover:border-0 hover:outline-none "
                  value="ar"
                >
                  {t("arabic")}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="cursor-pointer hover:bg-accent p-2 text-sm hover:border-0 hover:outline-none "
                  value="en"
                >
                  {t("english")}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <UserAvatar />
      </div>
    </div>
  );
};

export default ToolBar;

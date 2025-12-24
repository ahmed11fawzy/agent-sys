import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { Toggle } from "../ui/toggle";
import { Moon, Sun } from "lucide-react";
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
const ToolBar = () => {
  const { theme, language } = useAppSelector((state) => state.settings);
  console.log(theme);
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };

  const toggleLanguage = (newLanguage: Language) => {
    console.log(newLanguage);
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div>
      <div className="flex justify-between">
        <SidebarTrigger />
        <div className="flex gap-3">
          <div>
            <Toggle
              aria-label="Toggle Theme"
              size="sm"
              variant="default"
              className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-dark data-[state=on]:*:[svg]:stroke-dark"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Toggle>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
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

          <div>
            <h5 className="text-sm font-semibold">Mohamed</h5>
            <p className="text-xs text-muted-foreground">{t("agent")}</p>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;

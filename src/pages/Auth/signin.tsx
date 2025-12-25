import { SignInForm } from "@/components/sign-in-form/sign-in";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/store";

const Signin = () => {
  const { theme } = useAppSelector((state) => state.settings);
  return (
    <div
      className={
        theme === "dark"
          ? "flex justify-center items-center h-screen  "
          : " flex justify-center items-center h-screen bg-linear-to-br from-(--primary-400) via-(--primary-500) to-(--primary-700) "
      }
    >
      <Card
        className={
          theme === "dark"
            ? "w-full max-w-sm  "
            : "w-full max-w-sm bg-(--accent)  "
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-center ">
            <img
              className="w-16 h-16 object-fit border"
              src="https://res.cloudinary.com/doxyvufkz/image/upload/v1766599799/logo192_bzai2h.png"
              alt="alballd"
            />
          </CardTitle>
          <CardDescription className="text-center text-lg font-bold text-dark ">
            Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;

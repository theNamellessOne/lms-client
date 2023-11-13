import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignIn } from "@/components/auth/sign-in";
import { SignUp } from "@/components/auth/sign-up";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BiLogoGoogle } from "react-icons/bi";
import Link from "next/link";

export default function Auth() {
  return (
    <>
      <div className={"flex items-center justify-center min-h-screen"}>
        <Tabs defaultValue="sign-in" className="w-full sm:w-[400px] p-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in" className={"font-bold"}>
              Sign In
            </TabsTrigger>
            <TabsTrigger value="sign-up" className={"font-bold"}>
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignIn />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUp />
          </TabsContent>
          <div className={"my-6 relative"}>
            <Separator />
            <p
              className={
                "absolute top-0 -translate-y-1/2 right-1/2 translate-x-1/2 bg-secondary rounded px-3 text-secondary-foreground"
              }
            >
              OR
            </p>
          </div>
          <Link href={"http://localhost:3000/auth/google"}>
            <Button variant={"outline"} className={"w-full"}>
              <BiLogoGoogle className={"text-lg mr-2"} /> Sign in with Google
            </Button>
          </Link>
        </Tabs>
      </div>
    </>
  );
}

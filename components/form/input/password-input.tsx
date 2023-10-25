import { Input } from "@/components/ui/input";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { ControllerRenderProps } from "react-hook-form";
import { useState } from "react";

type PasswordInputProps = {
  field: ControllerRenderProps<any, any>;
  disabled: boolean;
};

export function PasswordInput({ field, disabled }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={"relative"}>
      <Input
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        placeholder="qwerty123"
        {...field}
      />
      {showPassword ? (
        <BiSolidHide
          size={30}
          onClick={() => setShowPassword(false)}
          className={
            "absolute top-0 translate-y-1.5 right-1 cursor-pointer hover:bg-primary transition-colors p-1 rounded-full"
          }
        />
      ) : (
        <BiSolidShow
          size={30}
          onClick={() => setShowPassword(true)}
          className={
            "absolute top-0 translate-y-1.5 right-1 cursor-pointer hover:bg-primary transition-colors p-1 rounded-full"
          }
        />
      )}
    </div>
  );
}

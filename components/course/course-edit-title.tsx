import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { LucideIcon } from "lucide-react";

type CourseEditTitleProps = {
  icon: LucideIcon;
  text: string;
};

export function CourseEditTitle({ icon: Icon, text }: CourseEditTitleProps) {
  return (
    <div className={"py-3 text-xl flex items-center gap-2"}>
      <div
        className={
          "text-primary bg-primary/20 dark:bg-secondary/30 rounded-full p-2"
        }
      >
        <Icon size={28} />
      </div>
      <h2 className={"capitalize"}>{text}</h2>
    </div>
  );
}

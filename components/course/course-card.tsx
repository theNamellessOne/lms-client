import Image from "next/image";
import { Button } from "@/components/ui/button";
import { COURSE_IMAGE_PLACEHOLDER } from "@/util/constants";

type CourseCardProps = {
  price: number;
  title: string;
  imageUrl: string;
  description: string;
};

export function CourseCard({
  price,
  title,
  imageUrl,
  description,
}: CourseCardProps) {
  return (
    <div className={"flex flex-col max-w-full border rounded-xl"}>
      <Image
        height={1000}
        width={1000}
        src={imageUrl || COURSE_IMAGE_PLACEHOLDER}
        alt={"courseImg"}
        className={"h-auto w-full rounded-xl"}
      />
      <div className={"flex flex-col p-2 min-h-[150px] h-full"}>
        <h2>{title}</h2>
        <p className={"mt-2 text-gray-600 flex-1 dark:text-gray-400"}>
          {description}
        </p>
        <div className={"flex justify-between items-center"}>
          <Button className={"px-5"} size={"sm"} variant={"secondary"}>
            Enroll
          </Button>
          <p className={"font-[500] mr-2"}>
            {price > 0 ? `${price}$` : "free"}
          </p>
        </div>
      </div>
    </div>
  );
}

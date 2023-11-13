import Image from "next/image";
import { Button } from "@/components/ui/button";
import { COURSE_IMAGE_PLACEHOLDER } from "@/util/constants";
import Link from "next/link";

type TeacherCourseCardProps = {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  description: string;
  isPublished: boolean;
};

export function TeacherCourseCard({
  id,
  price,
  title,
  imageUrl,
  isPublished,
  description,
}: TeacherCourseCardProps) {
  return (
    <div
      className={
        "flex border rounded-xl mt-2 flex-col md:flex-row items-stretch gap-5"
      }
    >
      <Image
        height={1000}
        width={1000}
        className={"h-auto w-full md:w-1/3 rounded-xl"}
        src={imageUrl || COURSE_IMAGE_PLACEHOLDER}
        alt={"course image"}
      />
      <div
        className={"flex flex-col min-h-[100px] md:min-h-[200px] md:w-2/3 p-2"}
      >
        <div className={"flex items-center justify-between"}>
          <h2 className={"text-lg"}>{title}</h2>
          <p className={"text-gray-500 text-xs"}>
            {isPublished ? "published" : "not published"}
          </p>
        </div>
        <p className={"mt-2 text-gray-600 flex-1 dark:text-gray-400"}>
          {description}
        </p>
        <div className={"flex justify-between items-center"}>
          {price > 0 ? (
            <p className={"font-[500]"}>{price}$</p>
          ) : (
            <p className={"font-[500]"}>Free</p>
          )}
          <Link href={`courses/edit/${id}`}>
            <Button className={"px-8"} variant={"ghost"}>
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

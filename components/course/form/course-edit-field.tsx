import { Editable } from "@/components/editable";
import { CourseField } from "@/components/course/form/course-field";
import * as z from "zod";
import { handleCoursePatch } from "@/service/course-service";
import Image from "next/image";
import { COURSE_IMAGE_PLACEHOLDER } from "@/util/constants";

type CourseEditFieldProps = {
  name: string;
  type?: "text" | "textarea" | "image" | "number";
  course: any;
  schema: z.ZodObject<any>;
};

export function CourseEditField({
  name,
  type = "text",
  course,
  schema,
}: CourseEditFieldProps) {
  const handleEdit = (values: z.infer<typeof schema>) => {
    handleCoursePatch(course["id"], schema, values);
  };

  let value = course[name] || (
    <p className={"italic text-slate-600 dark:text-primary-foreground/30"}>
      No {name}
    </p>
  );

  if (type === "image") {
    value = (
      <Image
        className={"rounded-xl"}
        src={course[name] || COURSE_IMAGE_PLACEHOLDER}
        alt={"image"}
        width={1000}
        height={1000}
      />
    );
  }

  return (
    <div className={"w-full rounded-xl p-4 bg-secondary dark:bg-secondary/30"}>
      <Editable
        title={name.toUpperCase()}
        value={value}
        body={
          <CourseField
            onSubmit={handleEdit}
            name={name}
            type={type}
            schema={schema}
            placeholder={name}
            description={`Course ${name}. You can change it any time.`}
            defaultValue={{ [name]: course[name] || "" }}
          />
        }
      />
    </div>
  );
}

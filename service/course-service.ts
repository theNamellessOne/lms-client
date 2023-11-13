import * as z from "zod";
import { titleSchema } from "@/lib/schemas";
import { httpClient } from "@/lib/httpClient";
import toast from "react-hot-toast";
import { publish } from "@/util/event-bus/event-bus";

export const handleCoursePost = (values: z.infer<typeof titleSchema>) => {
  httpClient
    .post("course", values)
    .then((r) => {
      toast.success("course created");
      publish({ name: "course_created", payload: true });
    })
    .catch(() => toast.error("something went wrong"));
};

export const handleCoursePatch = (
  id: number,
  schema: z.ZodObject<any>,
  values: z.infer<typeof schema>,
) => {
  httpClient
    .patch(`course/${id}`, values)
    .then((r) => {
      toast.success("course updated");
      publish({ name: "course_updated", payload: r.data });
    })
    .catch(() => toast.error("something went wrong"));
};

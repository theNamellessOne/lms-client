import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CourseField } from "@/components/course/form/course-field";
import { titleSchema } from "@/lib/schemas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { handleCoursePost } from "@/service/course-service";

export function CourseCreate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus className={"mr-3"} size={20} />
          Create Course
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Name Your Course</DialogTitle>
        </DialogHeader>
        <CourseField
          onSubmit={handleCoursePost}
          name={"title"}
          label={""}
          schema={titleSchema}
          placeholder={"title"}
          description={
            "What would you like to name your course? Don&apos;t worry, you can change this later."
          }
          defaultValue={{ title: "" }}
        />
      </DialogContent>
    </Dialog>
  );
}

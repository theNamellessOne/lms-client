"use client";

import { httpClient } from "@/lib/httpClient";
import {
  courseImageUrlSchema,
  descriptionSchema,
  priceSchema,
  titleSchema,
} from "@/lib/schemas";
import { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "@/util/event-bus/event-bus";
import { useRouter } from "next/navigation";
import { CourseEditField } from "@/components/course/form/course-edit-field";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { CourseEditTitle } from "@/components/course/course-edit-title";
import { CourseEditAttachments } from "@/components/course/form/course-edit-attachments";
import { CourseEditChapters } from "@/components/course/form/course-edit-chapters";

export default function CourseEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [course, setCourse] = useState<any>({});

  const fetchCourse = () => {
    let id = +params.id;
    if (!isNaN(id)) {
      httpClient
        .get(`course/${id}`)
        .then((r) => {
          if (!r.data["id"]) {
            router.push("/");
          }

          setCourse(r.data);
        })
        .catch(() => {
          router.push("/");
        });
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    fetchCourse();

    subscribe("course_updated", (payload) => {
      setCourse(payload);
    });

    return unsubscribe("course_updated", (payload) => {
      setCourse(payload);
    });
  }, []);

  if (course["id"]) {
    return (
      <div className={"flex flex-col md:flex-row gap-4"}>
        <div className={"flex flex-col gap-2 flex-1"}>
          <CourseEditTitle
            icon={LayoutDashboard}
            text={"customize your course"}
          />

          <CourseEditField
            name={"title"}
            course={course}
            schema={titleSchema}
          />

          <CourseEditField
            name={"description"}
            course={course}
            schema={descriptionSchema}
            type={"textarea"}
          />

          <CourseEditField
            name={"imageUrl"}
            course={course}
            schema={courseImageUrlSchema}
            type={"image"}
          />
        </div>
        <div className={"flex flex-col gap-2 flex-1"}>
          <CourseEditTitle icon={ListChecks} text={"Chapters"} />
          <CourseEditChapters courseId={course["id"]} />

          <CourseEditTitle icon={CircleDollarSign} text={"course price"} />

          <CourseEditField
            name={"price"}
            course={course}
            schema={priceSchema}
            type={"number"}
          />

          <CourseEditTitle icon={File} text={"attachments"} />
          <div
            className={
              "w-full rounded-xl p-4 bg-secondary dark:bg-secondary/30"
            }
          >
            <CourseEditAttachments course={course} />
          </div>
        </div>
      </div>
    );
  }
}

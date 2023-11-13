"use client";

import React, { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "@/util/event-bus/event-bus";
import { CourseCreate } from "@/components/course/form/course-create";
import { TeacherCourseCard } from "@/components/course/teacher-course-card";
import { Loader2 } from "lucide-react";
import { httpClient } from "@/lib/httpClient";

export default function TeacherCourses() {
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<any>(null);

  const fetchCourses = () => {
    setLoading(true);
    httpClient.get("course/teacher-courses").then((r) => {
      setCourses(r.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCourses();
    subscribe("course_created", fetchCourses);
    return unsubscribe("course_created", fetchCourses);
  }, []);

  return (
    <div>
      {loading ? (
        <div
          className={
            "fixed inset-0 bg-black backdrop-blur flex justify-center items-center"
          }
        >
          <Loader2 className={"animate-spin"} size={40} />
        </div>
      ) : (
        <>
          <div className={"flex items-center justify-between"}>
            <h1 className={"text-xl"}>My Courses</h1>
            <CourseCreate />
          </div>

          {courses?.map((course: any, idx: number) => {
            return (
              <TeacherCourseCard
                key={idx}
                id={course["id"]}
                price={course["price"]}
                title={course["title"]}
                imageUrl={course["imageUrl"]}
                isPublished={course["isPublished"]}
                description={course["description"]}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

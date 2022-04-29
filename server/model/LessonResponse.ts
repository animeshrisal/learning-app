import { Lesson } from "@prisma/client";

export interface UserLesson extends Lesson {
    completed: boolean;
}

import { Classroom } from "@prisma/client";

export interface UserClassroom extends Classroom {
    enrollment: boolean;
}

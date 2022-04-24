export interface Lesson {
    id: string;
    order: number;
    name: string;
    description: string;
    body: string;
    nextId: string;
    previousId: string;
}

export interface LessonState{
    isLoading: boolean;
    lessonList: Lesson[];
}


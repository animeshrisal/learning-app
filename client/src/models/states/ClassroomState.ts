export interface Classroom {
    id: string;
    subject: string;
    description: string;
    activeStatus: boolean;
    image: string;
}

export interface ClassroomState {
    isLoading: boolean;
    classroomList: Classroom[];
}

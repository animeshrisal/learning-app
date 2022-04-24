export interface Classroom {
    id: string;
    subject: string;
    description: string;
    activeStatus: boolean;
}

export interface ClassroomState {
    isLoading: boolean;
    classroomList: Classroom[];
}

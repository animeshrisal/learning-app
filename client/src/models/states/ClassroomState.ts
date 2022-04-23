export interface Classroom {
    id: string;
    subject: string;
    activeStatus: boolean;
}

export interface ClassroomState {
    isLoading: boolean;
    classroomList: Classroom[];
}

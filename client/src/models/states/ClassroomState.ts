export interface Classroom {
  id: string;
  subject: string;
  description: string;
  activeStatus: boolean;
  image: string;
  enrolled?: boolean;
}

export interface ClassroomState {
  isLoading: boolean;
  classroomList: Classroom[];
}

export interface ClassroomProps extends Classroom {
  handleClassroom: (id: string) => void;
}

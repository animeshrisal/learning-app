import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { retrieveClassroom, updateClassroom } from "../../slice/classroomSlice";
import { useDispatch, useSelector } from "react-redux";
import { Classroom } from "../../models/states/ClassroomState";
import { RootState } from "../../app/store";
import {
  retrieveLessonList,
  sort,
  updateLessonOrder,
} from "../../slice/lessonSlice";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Lesson } from "../../models/states/LessonState";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "../../components/SortableBox";

export type RouteParams = {
  classroomId: string;
};

const TeacherClass = (): JSX.Element => {
  const { classroomId } = useParams<{ classroomId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classroom = useSelector((state: RootState) =>
    state.classroom.classroomList.find(
      (classroom) => classroom.id === classroomId
    )
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [isSorting, setIsSorting] = useState<boolean>(true);

  const isLoading = useSelector((state: RootState) => state.lesson.isLoading);

  const lessonList: Lesson[] = useSelector(
    (state: RootState) => state.lesson.lessonList
  );

  const lessonListKeyList: string[] = useSelector((state: RootState) =>
    state.lesson.lessonList.map((x) => x.id)
  );

  useEffect(() => {
    if (classroomId) {
      dispatch(retrieveClassroom(classroomId));
      dispatch(retrieveLessonList(classroomId));
    }
  }, [classroomId, dispatch]);

  const goToAddLessonPage = (
    event: any,
    action: string = "post",
    id: String = "asd"
  ) => {
    navigate(`create/`, { state: { action, id } });
  };

  const goToQuizList = () => {
    navigate(`quizList/`);
  };

  const goToLessonPage = (id: string) => {
    navigate(`${id}`);
  };

  const editClassroom = (classroom: Classroom) => {
    if (classroomId) {
      dispatch(updateClassroom({ classroom, classroomId }));
    }
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      dispatch(sort({ activeId: active.id, overId: over.id }));
    }
  }

  const handleSorting = () => {
    if (classroomId) {
      dispatch(updateLessonOrder({ classroomId }));
      setIsSorting(false);
    }
  };

  if (classroom) {
    return (
      <Box margin="2rem">
        <div className="classroom-heading">
          <h1 className="classroom-title">{classroom.subject}</h1>
          <Flex justifyContent="flex-end">
            <ButtonGroup spacing={4} marginRight="2rem">
              <Button colorScheme="teal" onClick={goToAddLessonPage}>
                Add new lesson
              </Button>
              <Button colorScheme="teal" onClick={goToQuizList}>
                Quiz List
              </Button>
            </ButtonGroup>
          </Flex>
        </div>
        <Box marginTop="2rem" padding="2rem" bgColor="white">
          <Flex>
            <Heading>Lessons</Heading>
            <Spacer />
            {isSorting ? (
              <Button onClick={handleSorting}>Done Reordering</Button>
            ) : (
              <Button onClick={() => setIsSorting(true)}>Reorder </Button>
            )}
          </Flex>
          {isSorting ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={lessonListKeyList}
                strategy={verticalListSortingStrategy}
              >
                {lessonList.map((lesson: Lesson) => (
                  <SortableItem key={lesson.id} {...lesson} />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <Accordion>
              {lessonList.map((lesson: Lesson) => (
                <AccordionItem key={lesson.id}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Text fontWeight="bold">{lesson.name}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Box>{lesson.description}</Box>
                    <Flex justifyContent="flex-end">
                      <Button
                        onClick={() => goToLessonPage(lesson.id!)}
                        colorScheme="teal"
                      >
                        Go to lesson
                      </Button>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </Box>
      </Box>
    );
  } else {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
};

export default TeacherClass;

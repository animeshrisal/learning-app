import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lesson } from "../models/states/LessonState";

export function SortableItem(props: Lesson) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Flex
      borderTopWidth="1px"
      border-color="inherit"
      padding="0.5rem 1rem"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Text fontWeight="bold">{props.name}</Text>
      <Spacer />
      <FontAwesomeIcon icon={faNavicon} />
    </Flex>
  );
}

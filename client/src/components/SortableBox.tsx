import { Box } from '@chakra-ui/react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Lesson } from '../models/states/LessonState';

export function SortableItem(props: Lesson) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Box>{props.id}</Box>
      {props.name}
      {props.description}
    </Box>
  );
}
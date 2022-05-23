import { Box } from '@chakra-ui/react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableItem(props: any) {
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
      {props.id}
    </Box>
  );
}
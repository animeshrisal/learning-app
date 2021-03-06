import { Box } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LessonCard from "../../components/LessonCard";

const AddLessonPage = (props: any) => {
  const { state }: { state: any } = useLocation();

  return (
    <Box>
      <LessonCard {...state} />
    </Box>
  );
};

export default AddLessonPage;

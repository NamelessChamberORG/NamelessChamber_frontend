import FadeInOnView from "../components/FadeInOnView";
import classes from "./DiaryDetailPage.module.css";
import Paragraph from "../../../components/paragraph/Paragraph";
import { useMemo, useEffect, useRef } from "react";
import { useDiary } from "../hooks/useDiary";
import { useParams, useNavigate } from "react-router";
import { useToast } from "../../../contexts/ToastContext";
import { usePostAccess } from "../../../hooks/usePostAccess";

function DiaryDetailPage() {
   const { id } = useParams<keyof { id: string }>() as { id: string };
   const { data, isLoading } = useDiary(id);

   const navigate = useNavigate();
   const { canView, recordView } = usePostAccess();
   const { showToast } = useToast();

   const hasRun = useRef(false);

   useEffect(() => {
      if (hasRun.current) return;
      hasRun.current = true;
      if (canView()) {
         recordView();
      } else {
         showToast("더 많은 글을 보려면 새로운 글을 작성해주세요!", "info");
         navigate("/", {replace: true});
      }
   }, []);

   const paragraphs: string[] = useMemo(() => {
      if (!data?.content) return [];
      return data.content.trim().split(/\n{2,}/g);
   }, [data]);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <section className={`${classes.diary} ${classes.detail}`}>
      <Paragraph className={classes.intro}>
        곰곰이 시간을 들여서 다른 고민을 읽어보세요
      </Paragraph>
      
         <div className={classes.lines}>
            {paragraphs.map((p, i) => (
               <FadeInOnView key={i} className={classes.paragraph} once>
                  {p}
               </FadeInOnView>
            ))}
         </div>
      </section>
   );
}

export default DiaryDetailPage;

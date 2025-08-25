export function usePostAccess() {
   const getWritten = () => parseInt(localStorage.getItem("writtenPosts") || "0", 10);
   const getViewed = () => parseInt(localStorage.getItem("viewedPosts") || "0", 10);

   const recordWrite = () => {
      const newWritten = getWritten() + 1;
      localStorage.setItem("writtenPosts", newWritten.toString());
   };

   const recordView = () => {
      const newViewed = getViewed() + 1;
      localStorage.setItem("viewedPosts", newViewed.toString());
   };

   const canView = () => getViewed() < getWritten() * 2;

   return {
      recordWrite,
      recordView,
      canView,
   };
}

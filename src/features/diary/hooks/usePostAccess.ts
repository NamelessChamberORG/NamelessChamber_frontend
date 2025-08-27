const WRITTEN_POSTS_KEY = "writtenPosts";
const VIEWED_POSTS_KEY = "viewedPosts";

export function usePostAccess() {
  // 작성 횟수 가져오기
  const getWritten = () =>
    parseInt(localStorage.getItem(WRITTEN_POSTS_KEY) || "0", 10);

  // 열람 횟수 가져오기
  const getViewed = () =>
    parseInt(localStorage.getItem(VIEWED_POSTS_KEY) || "0", 10);

  // 작성 기록 1 증가
  const recordWrite = () => {
    const newWritten = getWritten() + 1;
    localStorage.setItem(WRITTEN_POSTS_KEY, newWritten.toString());
  };

  // 열람 기록 1 증가
  const recordView = () => {
    const newViewed = getViewed() + 1;
    localStorage.setItem(VIEWED_POSTS_KEY, newViewed.toString());
  };

  const canView = () => getViewed() < getWritten();

  return {
    recordWrite,
    recordView,
    canView,
  };
}

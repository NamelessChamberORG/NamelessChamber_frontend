export function usePostAccess() {
  // 작성 횟수 가져오기
  const getWritten = () =>
    parseInt(localStorage.getItem("writtenPosts") || "0", 10);

  // 열람 횟수 가져오기
  const getViewed = () =>
    parseInt(localStorage.getItem("viewedPosts") || "0", 10);

  // 작성 기록 1 증가
  const recordWrite = () => {
    const newWritten = getWritten() + 1;
    localStorage.setItem("writtenPosts", newWritten.toString());
  };

  // 열람 기록 1 증가
  const recordView = () => {
    const newViewed = getViewed() + 1;
    localStorage.setItem("viewedPosts", newViewed.toString());
  };

  const canView = () => getViewed() < getWritten();

  return {
    recordWrite,
    recordView,
    canView,
    getWritten,
    getViewed,
  };
}

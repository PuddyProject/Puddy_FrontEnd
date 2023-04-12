export default function CommunityComment() {
  return (
    <div className='commnuity-comment-container'>
      <div className='user-info'>
        <div className='user-nickname'>유토</div>
        <div className='user-role'>
          <span>수정하기 | </span>
          <span>삭제하기</span>
        </div>
      </div>
      <div className='body'>퍼디 프로젝트 댓글입니다.</div>

      <div className='date'>2023.04.09 07:13</div>
    </div>
  );
}

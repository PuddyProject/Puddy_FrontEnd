import CustomHeader from 'components/common/CustomHeader';
import FooterButton from 'components/common/FooterButton';
import Comment from 'components/qnaDetail/Comment';

import { useNavigate } from 'react-router-dom';

export default function QnaDetail() {
  const nav = useNavigate();

  return (
    <div>
      <CustomHeader
        left={'<'}
        center='Q&A'
        onClickLeft={() => {
          nav(-1);
        }}
        right='bell'
      />
      <div className='qna-detail-container'>
        <section className='title'>
          <div className='title-text'>
            <span className='title-category'>[카테고리]</span> 애기가 너무 공격적으로 깨물어요
            타이틀이 길어지면 이렇게 되겠네요
          </div>

          <div className='post-info'>
            <span className='post-date'>2023-03-05</span>
            <span className='post-user'>퍼디1234</span>
          </div>
          <hr className='qna-divide-line' />
        </section>

        <section className='body'>
          <div className='body-text'>
            두달 반 정도 된 강아지 인데 사람이 앉으면 올라온 뒤옷이나 팔찌등을 계속 물어요.
            간식등으로 교육을 하려 할때도 흥분해서 간식든 손을 마구 물기만 합니다. 누워있을때 코를
            툭치며 물려고 한적도 있어요. 무시하기, 소리내고 벌떡일어나기 아무것도 소용이 없어요.
            바디블로킹을 하면 뒤로갔다가 달려들며 발을 물어요 ㅠㅠ 나중에는 제가 발로차는 느낌이
            들어서 제가 애를 학대하는게 아닌가 걱정도 됩니다. 계속 압박하면 구석에숨다가 똥이나
            오줌을 싸는데, 제가 애를 괴롭히는것 같아 걱정입니다... 어떻게 해야 할까요.....
            학대하는게 아닌가 걱정도 됩니다. 계속 압박하면 구석에숨다가 똥이나 오줌을 싸는데, 제가
            애를 괴롭히는것 같아 걱정입니다... 어떻게 해야 할까요.....
          </div>
          <div className='tag-container'>
            <span className='tag-item'>알레스카 말라뮤트</span>
            <span className='tag-item'>중성화</span>
            <span className='tag-item'>여아</span>
            <span className='tag-item'>2.5kg</span>
            <span className='tag-item'>알레스카 말라뮤트</span>
          </div>
        </section>
        <hr className='qna-divide-line' />
        <section className='comment'>
          <div className='comment-title-conainer'>
            <span className='comment-title'>
              작성된 <span>답변 🐾</span>
            </span>
            <br />
            <span className='comment-sub-title'>원하는 답변이 달렸다면 채택을 해보세요.</span>
          </div>
          <Comment />
          <Comment isExport={true} />
          <Comment isExport={true} isWriteUser={true} />
        </section>
      </div>
      <FooterButton>답글 입력하기</FooterButton>
    </div>
  );
}

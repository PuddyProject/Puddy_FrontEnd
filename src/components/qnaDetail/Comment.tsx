import Button from 'components/common/Button';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import classnames from 'classnames';

const cn = classnames;
interface CommentProps {
  isExport?: boolean;
  isWriteUser?: boolean;
}

export default function Comment({ isExport = false, isWriteUser = false }: CommentProps) {
  return (
    <div className={cn('comment-card', { isExport })}>
      <div className='comment-card-user-info'>
        {isExport ? (
          <div className='user-export'>
            <span>이유</span> <AiOutlineCheckCircle />
          </div>
        ) : (
          <div className='user'>유토</div>
        )}

        <div className='user-roll-container'>
          <span className='user-roll'>{isExport ? '전문가 답변' : '사용자 답변'}</span>
          {isWriteUser && (
            <span className='user-roll'>
              <span>수정하기</span> | <span>삭제하기</span>
            </span>
          )}
        </div>
      </div>
      <div className='comment-card-body'>
        두달 반 정도 된 강아지 인데 사람이 앉으면 올라온 뒤 옷이나 팔찌등을 계속 물어요. 간식등으로
        교육을 하려 할때도 흥분해서 간식든 손을 마구 물기만 합니다. 누워있을때 코를 툭치며 물려고
        한적도 있어요. 무시하기, 소리내고 벌떡일어나기 아무것도 소용이 없어요. 바디블로킹을 하면
        뒤로갔다가 달려들며 발을 물어요 ㅠㅠ 나중에는 제가 발로차는 느낌이 들어서 제가 애를
        학대하는게 아닌가 걱정도 됩니다. 계속 압박하면 구석에숨다가 똥이나 오줌을 싸는데, 제가 애를
        괴롭히는것 같아 걱정입니다... 어떻게 해야 할까요.....두달 반 정도 된 강아지 인데 사람이
        앉으면 올라온 뒤 옷이나 팔찌등을 계속 물어요. 간식등으로 교육을 하려 할때도 흥분해서 간식든
        손을 마구 물기만 합니다. 누워있을때 코를 툭치며 물려고 한적도 있어요. 무시하기, 소리내고
        벌떡일어나기 아무것도 소용이 없어요. 바디블로킹을 하면 뒤로갔다가 달려들며 발을 물어요 ㅠㅠ
        나중에는 제가 발로차는 느낌이 들어서 제가 애를 학대하는
      </div>
      <div className='comment-button'>
        <Button width='110px' height='25px' fontWeight='600' fontSize='12px'>
          이 답변 채택하기
        </Button>
      </div>
    </div>
  );
}

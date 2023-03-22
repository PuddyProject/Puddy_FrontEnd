import InputBox from 'components/common/InputBox';
import InputTilte from 'components/common/InputTitle';
import FooterButton from 'components/common/FooterButton';
export default function NewPost() {
  return (
    <div>
      <div className='qna-newpost-main'>
        <InputTilte isRequire={true}>카테고리 </InputTilte>
        <div className='category-container'>
          {Array(6)
            .fill(0)
            .map(() => {
              return <div className='category-item'>텍스트</div>;
            })}
        </div>
        <InputTilte isRequire={true}> 제목 </InputTilte>
        <InputBox
          margin='10px 0px 20px 0px'
          padding='0px 0px 0px 15px'
          width='300px'
          placeholder='제목을 입력해주세요.(50자 이내)'
        />
        <div className='image-container'>
          <div className='image-add-item'>
            <p className='image-add-item-plus'>+</p>
            <p className='image-add-item-text'>이미지 등록</p>
          </div>
          <div className='image-item'></div>
          <div className='image-item'></div>
          <div className='image-item'></div>
        </div>
        <InputTilte isRequire={true}> 내용 </InputTilte>
        <textarea className='text-body' placeholder='내용을 입력해주세요.(500자 이내)'></textarea>
      </div>
      <FooterButton>등록하기</FooterButton>
    </div>
  );
}

import InputBox from 'components/common/InputBox';
import InputTilte from 'components/common/InputTitle';
import FooterButton from 'components/common/FooterButton';
import { useState, FormEvent } from 'react';
import { categoryItem } from 'constants/qnaNewPost';
import checkExtensions from 'utils/checkExtensions';
import axios from 'axios';
import checkFileSize from 'utils/checkFileSize';

interface PostInfo {
  title: string;
  content: string;
  category: string;
}

export default function NewPost() {
  const [postInfo, setPostInfo] = useState<PostInfo>({
    content: '',
    category: '',
    title: '',
  });
  const [filePreview, setFilePreview] = useState<string[]>([]);
  const [imgFile, setImgFile] = useState<File[]>([]);
  const onChangeHandler = (e: FormEvent<HTMLElement>) => {
    if ((e.target as HTMLInputElement).id === 'imgFile') {
      return;
    } else {
      setPostInfo((prev) => ({
        ...prev,
        [(e.target as HTMLInputElement).id]: (e.target as HTMLInputElement).value,
      }));
    }
  };

  const onClickHandler = (e: React.MouseEvent) => {
    setPostInfo((prev) => ({
      ...prev,
      [(e.target as HTMLButtonElement).id]: (e.target as HTMLButtonElement).innerText,
    }));
  };

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (filePreview.length >= 3) {
      alert('최대 업로드 가능한 파일 개수는 3개입니다.');
      return;
    }

    const files = e.target.files as FileList;
    const isValidImageExtensions = checkExtensions(files!);
    const isRightSize = checkFileSize(files!);
    if (!isValidImageExtensions) {
      alert('.jpg, .jpeg, .png, .gif 확장자만 업로드 할 수 있어요.');
      return;
    }
    if (!isRightSize) {
      alert('최대 10MB까지 업로드할 수 있어요.');
      return;
    }
    // eslint-disable-next-line semi-spacing
    for (let i = 0; i < files.length; i++) {
      setImgFile((prev) => [...prev, files[i]]);
      setFilePreview((prev) => [...prev, URL.createObjectURL(files[i])]);
    }
  };

  const onSendData = () => {
    const formData = new FormData();
    formData.append('requiest', new Blob([JSON.stringify(postInfo)], { type: 'application/json' }));
    formData.append('imgFile', imgFile[0]);
  };

  return (
    <div>
      <div className='qna-newpost-main' onChange={onChangeHandler}>
        <InputTilte isRequire={true}>카테고리 </InputTilte>
        <div className='category-container'>
          {categoryItem.map((category, i) => {
            const isSelected = category === postInfo.category;

            return (
              <div
                key={i}
                className={`category-item ${isSelected ? 'select' : ''}`}
                id='category'
                onClick={onClickHandler}
              >
                {category}
              </div>
            );
          })}
        </div>
        <InputTilte isRequire={true}> 제목 </InputTilte>
        <InputBox
          id='title'
          margin='10px 0px 20px 0px'
          padding='0px 0px 0px 15px'
          width='300px'
          placeholder='제목을 입력해주세요.(50자 이내)'
          value={postInfo.title}
        />
        <div className='image-container'>
          <input
            id='imgFile'
            className='image-add-item'
            style={{ display: 'none' }}
            type='file'
            accept='image/*'
            onChange={onFileChangeHandler}
          />
          <div className='image-item-add-button'>
            <label htmlFor='imgFile'>
              <p className='image-add-item-plus'>+</p>
              <p className='image-add-item-text'>이미지 등록</p>
            </label>
          </div>
          {Array(3)
            .fill(0)
            .map((_, i) => {
              return filePreview[i] !== undefined ? (
                <img key={i} className='image-item' src={filePreview[i]} alt='error' />
              ) : (
                <div key={i} className='image-item' />
              );
            })}
        </div>
        <InputTilte isRequire={true}> 내용 </InputTilte>
        <textarea
          id='content'
          className='text-body'
          placeholder='내용을 입력해주세요.(500자 이내)'
          defaultValue={postInfo.content}
        ></textarea>
      </div>
      <FooterButton onClick={onSendData}>등록하기</FooterButton>
    </div>
  );
}

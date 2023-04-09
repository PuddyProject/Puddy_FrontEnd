import InputBox from 'components/common/InputBox';
import InputTilte from 'components/common/InputTitle';
import FooterButton from 'components/common/FooterButton';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { categoryItem } from 'constants/qnaNewPost';
import checkExtensions from 'utils/checkExtensions';
import checkFileSize from 'utils/checkFileSize';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import CustomHeader from 'components/common/CustomHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { post } from 'utils';
import { PostDataInfo } from 'types/commentTypes';
import SymbolLogo from 'assets/SymbolLogo.svg';
import { AxiosResponse } from 'axios';

interface PostInfo {
  title: string;
  content: string;
  category: string;
}

export default function NewPost() {
  const location = useLocation();
  const editData: PostDataInfo = location.state;
  const isEditPage = location.pathname.includes('edit');
  const [postInfo, setPostInfo] = useState<PostInfo>({
    content: editData?.content || '',
    category: editData?.category || '',
    title: editData?.title || '',
  });

  const [tagList, setTagList] = useState<string[]>([]);
  const [filePreview, setFilePreview] = useState<string[]>(editData?.images || []);
  const [imgFile, setImgFile] = useState<File[]>([]);
  const firstInputBox = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const isVaildForm =
    postInfo.content.length >= 1 && postInfo.content !== '' && postInfo.title.length >= 1;

  const isCommunityPage = location.pathname.includes('community');
  useEffect(() => {
    // TODO: 현재는 안되는 코드이며 향후 시도 CORS 오류로 인해 일단 보류
    // fetch(`${editData?.images[0]}`, {
    //   method: 'GET',
    //   headers: {
    //     Origin: '*',
    //   },
    // }).then((res) => console.log(res));
    firstInputBox.current?.focus();
  }, []);

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

  const onClickRemoveHandler = (index: number) => {
    setImgFile((prev) => [...prev.filter((_, i) => i !== index)]);
    setFilePreview((prev) => [...prev.filter((_, i) => i !== index)]);
  };

  const onTagBoxKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let currentHashTag = (e.target as HTMLInputElement).value;
      if (currentHashTag === '') return;
      setTagList((prev) => Array.from(new Set([...prev, currentHashTag])));

      (e.target as HTMLInputElement).value = '';
    }
  };

  const onTagBoxChange = (e: FormEvent<HTMLElement>) => {
    if ((e.target as HTMLInputElement).value.length > 10) {
      alert('해쉬태그 최대 글자수는 10자 입니다');
      (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.slice(0, 10);
    }
  };

  const deleteTag = (index: number) => {
    setTagList((prev) => prev.filter((_, i) => i !== index));
  };

  const onSendData = async () => {
    const formData = new FormData();
    if (isCommunityPage) {
      formData.append(
        'request',
        new Blob([JSON.stringify(postInfo, tagList)], { type: 'application/json' })
      );
    } else {
      formData.append(
        'request',
        new Blob([JSON.stringify(postInfo)], { type: 'application/json' })
      );
    }

    // eslint-disable-next-line semi-spacing
    for (let i = 0; i < imgFile.length; i++) {
      formData.append('images', imgFile[i]);
    }

    // if (isEditPage) {
    //   res = await post({
    //     endpoint: `questions/${location.state.questionId}`,
    //     body: formData,
    //     isImage: true,
    //     isPost: false,
    //   });
    // } else {
    //   res = await post({ endpoint: 'questions/write', body: formData, isImage: true });
    // }

    let res: AxiosResponse;
    if (isCommunityPage) {
      res = await post({ endpoint: 'articles/write', body: formData, isImage: true });
      console.log(res);
    }
    // if (res.status === 200) {
    //   isEditPage ? alert('Q&A 수정이 완료 되었습니다.') : alert('Q&A 작성 완료 되었습니다.');
    //   nav(-1);
    // } else {
    //   alert('게시글을 작성하지 못하였습니다. 잠시 후 다시 시도해주세요.');
    // }
  };

  return (
    <div>
      <CustomHeader title='Q&A 등록' hideIcon />
      <div className='qna-newpost-container' onChange={onChangeHandler}>
        <InputTilte isRequire={true}> 제목 </InputTilte>
        <InputBox
          id='title'
          margin='10px 0px 20px 0px'
          padding='0px 0px 0px 15px'
          width='300px'
          placeholder='제목을 입력해주세요.(50자 이내)'
          value={postInfo.title}
          inputRef={firstInputBox}
        />
        {!isCommunityPage && (
          <>
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
          </>
        )}

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
                <div key={i} className='image-item'>
                  <img key={i} className='image-item' src={filePreview[i]} alt='error' />
                  <IoMdRemoveCircleOutline
                    size='25px'
                    className='remove-image'
                    onClick={() => onClickRemoveHandler(i)}
                  />
                </div>
              ) : (
                <div key={i} className='image-item'>
                  <img key={i} className='image-item' src={SymbolLogo} alt='error' />
                </div>
              );
            })}
        </div>
        <InputTilte isRequire={true}> 내용 </InputTilte>
        <textarea
          id='content'
          maxLength={500}
          className='text-body'
          placeholder='내용을 입력해주세요.(500자 이내)'
          defaultValue={postInfo.content}
        ></textarea>
        {isCommunityPage && (
          <>
            <InputTilte margin='15px 0px'>태그</InputTilte>
            <InputBox
              width='100%'
              placeholder='태그를 등록해보세요.'
              onKeyPress={onTagBoxKeyDown}
              onChange={onTagBoxChange}
            />
            <div className='tag-container'>
              {tagList.map((tag, index) => {
                return (
                  <span key={index} className='tag-item' onClick={() => deleteTag(index)}>
                    {tag}
                  </span>
                );
              })}
            </div>
          </>
        )}
      </div>
      <FooterButton onClick={onSendData} disabled={!isVaildForm}>
        {isEditPage ? '수정하기' : '등록하기'}
      </FooterButton>
    </div>
  );
}

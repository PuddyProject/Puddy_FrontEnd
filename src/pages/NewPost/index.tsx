import { useState, FormEvent, useEffect, useRef } from 'react';
import { BsPlus as PlusIcon } from 'react-icons/bs';
import { MdClose as CloseIcon } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

import { InputBox, InputTitle, FooterButton, CustomHeader } from 'components';
import { CATEGORY_ITEM } from 'constants/NewPost';

import { checkExtensions, checkFileSize, post, trimBody } from 'utils';
import { PostDataInfo } from 'types/commentTypes';
import { AxiosResponse } from 'axios';
import { articleApi, questionsApi } from 'constants/apiEndpoint';
import { convertImgToFile } from 'utils';

interface PostInfo {
  title: string;
  content: string;
  category: string;
  postCategory: number;
}

const IMG_BOX_COUNT = 3;

export default function NewPost() {
  const location = useLocation();
  const editData: PostDataInfo = location.state;
  const [postInfo, setPostInfo] = useState<PostInfo>({
    content: editData?.content || '',
    category: editData?.category || '',
    title: editData?.title || '',
    postCategory: 1,
  });

  const [tagList, setTagList] = useState<string[]>([]);
  const [filePreview, setFilePreview] = useState<string[]>(editData?.images || []);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const firstInputBox = useRef<HTMLInputElement>(null);
  const isVaildForm =
    postInfo.content.length >= 1 && postInfo.content !== '' && postInfo.title.length >= 1;

  const isQnaVaildForm = isVaildForm && postInfo.category !== '';
  const nav = useNavigate();
  const isCommunityPage = location.pathname.includes('community');
  const isEditPage = location.pathname.includes('edit');
  const POST_ID = isCommunityPage ? location.state?.articleId : location.state?.questionId;

  useEffect(() => {
    if (isEditPage) {
      const covertFile = async () => {
        const prevFileList: File[] = [];

        for (let imgUrl of editData.images!) {
          const file = await convertImgToFile(imgUrl);
          prevFileList.push(file!);
        }
        return prevFileList;
      };
      const prevFile = covertFile();
      prevFile.then((res) => setImgFiles(() => [...res]));
    }

    if (isEditPage && isCommunityPage) {
      const prevTagList: string[] = [];
      editData.tagList!.map((tagObject) => {
        const { tag } = tagObject;
        prevTagList.push(tag.tagName);
      });
      setTagList(() => [...prevTagList]);
    }

    firstInputBox.current?.focus();
  }, []);

  const sendData = async (formData: FormData) => {
    let res: AxiosResponse;

    res = await post({
      endpoint: `${
        isCommunityPage
          ? articleApi.getArticle(POST_ID || '')
          : questionsApi.requestQuestionsId(POST_ID || '')
      }`,
      body: formData,
      isImage: true,
      isPost: isEditPage ? false : true,
    });

    const page = isCommunityPage ? '커뮤니티' : 'Q&A';
    const editText = isEditPage ? '수정' : '작성';

    if (res.status === 200) {
      alert(`${page} 게시글 ${editText}이 되었습니다.`);
      nav(-1);
    } else {
      alert(`게시글을 ${editText} 하지 못하였습니다. 잠시 후 다시 시도해주세요.`);
    }
  };

  const onChangeHandler = (e: FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.id === 'imgFile') {
      return;
    } else {
      setPostInfo((prev) => ({
        ...prev,
        [target.id]: target.value,
      }));
    }
  };

  const onClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    setPostInfo((prev) => ({
      ...prev,
      [target.id]: target.innerText,
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

    for (const file of files) {
      setImgFiles((prev) => [...prev, file]);
      setFilePreview((prev) => [...prev, URL.createObjectURL(file)]);
    }
  };

  const onClickRemoveHandler = (index: number) => {
    setImgFiles((prev) => [...prev.filter((_, i) => i !== index)]);
    setFilePreview((prev) => [...prev.filter((_, i) => i !== index)]);
  };

  const onTagBoxKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key === 'Enter') {
      const currentHashTag = target.value;

      if (currentHashTag.trim() === '') return;
      setTagList((prev) => Array.from(new Set([...prev, currentHashTag])));

      target.value = '';
    }
  };

  const onTagBoxChange = (e: FormEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.value.length > 10) {
      alert('해쉬태그 최대 글자수는 10자 입니다');
      target.value = target.value.slice(0, 10);
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const target = e.target;
    target.selectionStart = target.value.length;
  };

  const deleteTag = (index: number) => {
    setTagList((prev) => prev.filter((_, i) => i !== index));
  };

  const onSendData = async () => {
    const formData = new FormData();

    const content = trimBody(postInfo.content);
    const commonData = { title: postInfo.title, content };

    if (isCommunityPage) {
      formData.append(
        'request',
        new Blob(
          [
            JSON.stringify({
              ...commonData,
              tagList,
              postCategory: 2,
            }),
          ],
          { type: 'application/json' }
        )
      );
    } else {
      formData.append(
        'request',
        new Blob(
          [
            JSON.stringify({
              ...commonData,
              category: postInfo.category,
              postCategory: 1,
            }),
          ],
          { type: 'application/json' }
        )
      );
    }

    for (const imgFile of imgFiles) {
      formData.append('images', imgFile);
    }

    sendData(formData);
  };

  return (
    <div className='qna-newpost-layout-container'>
      <CustomHeader
        title={isCommunityPage ? '글 작성' : 'Q&A 작성'}
        submitText={isEditPage ? '수정' : '등록'}
        onClickRight={onSendData}
        hideIcon
      />

      <div className='qna-newpost-container' onChange={onChangeHandler}>
        <section>
          <div className='image-container'>
            <input
              id='imgFile'
              className='image-add-item'
              type='file'
              accept='image/*'
              onChange={onFileChangeHandler}
            />
            <div className='add-image-button' role='button'>
              <label htmlFor='imgFile'>
                <i className='image-add-item-plus'>
                  <PlusIcon />
                </i>
                <p className='image-add-item-text'>
                  이미지 등록
                  <br />
                  (최대 3장)
                </p>
              </label>
            </div>
          </div>

          {filePreview.length ? (
            <div className='image-container upload-images'>
              {Array(IMG_BOX_COUNT)
                .fill(0)
                .map((_, i) => {
                  return filePreview[i] !== undefined ? (
                    <div key={i} className='image-item-box'>
                      <img key={i} className='image-item' src={filePreview[i]} alt='upload-img' />
                      <CloseIcon
                        size='25px'
                        className='remove-image'
                        onClick={() => onClickRemoveHandler(i)}
                      />
                    </div>
                  ) : (
                    <></>
                  );
                })}
            </div>
          ) : (
            <></>
          )}
        </section>

        <section>
          <InputTitle isRequire={true}>제목</InputTitle>
          <InputBox
            id='title'
            placeholder='제목을 입력해주세요. (50자 이내)'
            value={postInfo.title}
            inputRef={firstInputBox}
            onFocus={onFocus}
          />
        </section>

        {!isCommunityPage && (
          <section>
            <InputTitle isRequire={true}>카테고리</InputTitle>
            <div className='category-container'>
              {CATEGORY_ITEM.map((category, i) => {
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
          </section>
        )}

        <section>
          <InputTitle isRequire={true}>내용</InputTitle>
          <textarea
            id='content'
            maxLength={500}
            className='text-body'
            placeholder='내용을 입력해주세요. (500자 이내)'
            defaultValue={postInfo.content}
            onFocus={onFocus}
          ></textarea>
          {isCommunityPage && (
            <>
              <InputTitle margin='15px 0px'>태그</InputTitle>
              <InputBox
                placeholder='태그를 등록해보세요.'
                margin='0px 0px 15px 0px'
                onKeyPress={onTagBoxKeyDown}
                onChange={onTagBoxChange}
              />
              <div className='new-post-tag-container'>
                {tagList.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className='tag-item-new-post'
                      onClick={() => deleteTag(index)}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>

      <FooterButton
        onClick={onSendData}
        disabled={isCommunityPage ? !isVaildForm : !isQnaVaildForm}
      >
        {isEditPage ? '수정하기' : '등록하기'}
      </FooterButton>
    </div>
  );
}

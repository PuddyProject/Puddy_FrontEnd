import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomHeader, FileInput, FooterButton } from 'components';

import checkFileSize from 'utils/checkFileSize';
import { checkExtensions, patch, post } from 'utils';

import { useUser } from 'context/UserContext';
import { expertApi, myPageApi } from 'constants/apiEndpoint';
import { LOGIN_PATH } from 'constants/routes';
import Modal from 'components/common/Modal';

const ALLOWED_FILE_EXTENSIONS = ['pdf', 'doc', 'docx', 'hwp', 'jpg', 'jpeg', 'png'];

export default function AuthExpert() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { decodedToken, setDecodedToken } = useUser();
  const auth = decodedToken?.auth;

  const [fileUploaderText, setFileUploaderText] = useState('파일 첨부');
  const [uploadFile, setUploadFile] = useState<File>();

  useEffect(() => {
    if (!decodedToken) return;

    if (auth === 'ROLE_EXPERT') {
      alert('이미 인증된 유저입니다.');
      return navigate('/mypage');
    }
  }, [auth]);

  const onClickSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      // const res = await post({
      //   endpoint: `${expertApi.POST_EXPERT_DOCS}`,
      //   body: { file: uploadFile },
      //   isImage: true,
      // });
      // * 현재는 보내면 가입 시 적은 이메일에 담겨 보내집니다.
      // TODO: 어드민 페이지로 파일을 보내고 파일 검토 후
      // TODO: 전문가가 적합할 경우 role을 변경시킨 후 메일을 전송하는 로직으로 변경해야 합니다.
      // if (res.status === 200) {
      //   window.alert('서류 제출이 완료되었어요.');
      //   navigate('/');
      // }

      // ! 임시 코드 (테스트용)
      // ! 제출하기 버튼을 누르면 강제로 전문가 권한 부여
      const res = await patch({ endpoint: `${myPageApi.PATCH_USER_AUTH}`, isFormData: false });
      console.log(res);
      if (res.status === 201) {
        setShowModal(true);
        sessionStorage.removeItem('userToken');
        setDecodedToken(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = e.target.files;
    const isAllowed = checkExtensions(files, ALLOWED_FILE_EXTENSIONS);
    const isRightSize = checkFileSize(files);

    if (!isAllowed) {
      return window.alert(
        '.pdf, .doc, .docx, .hwp, .jpg, .jpeg, .png\n확장자 파일만 업로드 할 수 있어요.'
      );
    }

    if (!isRightSize) {
      return window.alert('최대 10MB까지 업로드할 수 있어요.');
    }

    setUploadFile(() => files[0]);

    setFileUploaderText(() => {
      if (isAllowed && files && files.length) {
        return files[0].name;
      }
      return '파일 첨부';
    });
  };

  return (
    <>
      {showModal && (
        <Modal
          children={
            <>
              <h2 className='modal-title'>전문가 권한 부여 완료</h2>
              <div className='modal-content'>다시 로그인 해주세요. 😊</div>
            </>
          }
          closeModal={() => {
            setShowModal(false);
            navigate(`${LOGIN_PATH}`);
          }}
        />
      )}
      <div className='auth-expert-container'>
        <CustomHeader title='전문가 인증' hideIcon />
        <h3 className='auth-expert-title'>
          <strong>자격증 및 기타 인증 서류</strong>를 업로드해 주세요.
          <br />
          제출된 서류는 검토 후 <strong>메일을 통해 안내</strong>해 드려요.
        </h3>
        <label className='file-input'>
          <FileInput
            text={fileUploaderText}
            onChange={onChangeFile}
            accept='.pdf, .doc, .docx, .hwp, .jpg, .jpeg, .png'
            placeholder='파일 첨부'
          />
        </label>
        <div className='auth-expert-allowed'>
          <p>허용 확장자 : .pdf, .doc, .docx, .hwp, .jpg, .jpeg, .png</p>
          <p>최대 10MB</p>
        </div>
        <FooterButton onClick={onClickSubmit}>제출하기</FooterButton>
      </div>
    </>
  );
}

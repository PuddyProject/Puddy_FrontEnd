import { useState } from 'react';
import { CustomHeader, FileInput, FooterButton } from 'components';

import checkFileSize from 'utils/checkFileSize';

export default function AuthExpert() {
  const [fileUploaderText, setFileUploaderText] = useState('파일 첨부');

  const checkAllowedExtensions = (files: FileList) => {
    const ALLOWED_FILE_EXTENSIONS = ['pdf', 'doc', 'docx', 'hwp', 'jpg', 'jpeg', 'png'];

    for (const file of [...files]) {
      const extension = file.name.split('.').pop();
      if (ALLOWED_FILE_EXTENSIONS.includes(extension!)) return true;
      return false;
    }

    return true;
  };

  const onClickSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const isAllowed = checkAllowedExtensions(files!);
    const isRightSize = checkFileSize(files!);

    if (!isAllowed) {
      return window.alert(
        '.pdf, .doc, .docx, .hwp, .jpg, .jpeg, .png\n확장자 파일만 업로드 할 수 있어요.'
      );
    }

    if (!isRightSize) {
      return window.alert('최대 10MB까지 업로드할 수 있어요.');
    }

    setFileUploaderText(() => {
      if (isAllowed && files && files.length) {
        return files[0].name;
      }
      return '파일 첨부';
    });
  };

  return (
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
  );
}

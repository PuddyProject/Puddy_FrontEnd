import axios from 'axios';

export const convertImgToFile = async (imgUrl: string) => {
  if (!imgUrl) return;

  const res = await axios.get(`${imgUrl}`, {
    responseType: 'blob',
  });

  const blob = res.data;
  const fileName = imgUrl.split('/').pop();
  const fileExtension = fileName?.split('.').pop();
  const metaData = { type: `image/${fileExtension}` };

  return new File([blob], fileName!, metaData);
};

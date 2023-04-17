import axios from 'axios';

export const convertImgToFile = async (imgUrl: string) => {
  if (!imgUrl) return;

  const res = await axios.get(`${imgUrl}`, {
    responseType: 'blob',
  });

  const blob = res.data;
  const fileName = imgUrl.split('/').pop()?.slice(36);
  const fileExtension = blob.type;
  const metaData = { type: `${fileExtension}` };

  return new File([blob], fileName!, metaData);
};

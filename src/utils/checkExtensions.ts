const ALLOWED_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

export default function checkExtensions(
  files: FileList,
  allowedExtensions = ALLOWED_FILE_EXTENSIONS
) {
  for (const file of [...files]) {
    const extensions = file.name.split('.').pop()?.toLocaleLowerCase();
    if (extensions && !allowedExtensions.includes(extensions)) return false;
    return true;
  }
}

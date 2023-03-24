export default function checkExtensions(files: FileList) {
  const ALLOWED_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

  for (const file of [...files]) {
    const extensions = file.name.split('.').pop();
    if (extensions && !ALLOWED_FILE_EXTENSIONS.includes(extensions)) return false;
    return true;
  }
}

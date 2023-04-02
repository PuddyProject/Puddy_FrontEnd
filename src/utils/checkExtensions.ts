const ALLOWED_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

export default function checkExtensions(files: FileList) {
  for (const file of [...files]) {
    const extensions = file.name.split('.').pop()?.toLocaleLowerCase();
    if (extensions && !ALLOWED_FILE_EXTENSIONS.includes(extensions)) return false;
    return true;
  }
}

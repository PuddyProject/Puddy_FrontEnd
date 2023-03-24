const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function checkFileSize(files: FileList) {
  for (const file of [...files]) {
    const size = file.size;
    if (size > MAX_FILE_SIZE) return false;
  }

  return true;
}

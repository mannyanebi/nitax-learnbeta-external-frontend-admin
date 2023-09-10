declare module 'file-reader' {
  function readFile(file: File): Promise<string>;
}
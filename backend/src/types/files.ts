export type FileNode = {
  type: "file";
  title: string;
  extension: string;
  language: string;
  path: string;
  code: string;
};

export type FolderNode = {
  type: "folder";
  title: string;
  children: TreeNode[];
};

export type TreeNode = FileNode | FolderNode;

export interface InputFile {
  path: string;
  language: string;
  code: string;
}

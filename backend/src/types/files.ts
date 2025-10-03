export type FileNode = {
  type: "file";
  name: string;
  language: string;
  path: string;
  code: string;
};

export type FolderNode = {
  type: "folder";
  name: string;
  children: TreeNode[];
};

export type TreeNode = FileNode | FolderNode;

export interface InputFile {
  path: string;
  language: string;
  code: string;
}

import { FolderNode, InputFile, TreeNode } from "../types/files";

export function addFileToTree(
  files: TreeNode[],
  raw_file: InputFile | string
): void {
  const file: InputFile =
    typeof raw_file === "string" ? JSON.parse(raw_file) : raw_file;
  const parts = file.path.split("/"); // e.g. ["src", "components", "TodoInput.tsx"]
  let currentLevel = files;

  parts.forEach((part, index) => {
    const isFile = index === parts.length - 1;

    if (isFile) {
      // Add file node
      currentLevel.push({
        type: "file",
        name: part,
        language: file.language,
        path: file.path,
        code: file.code,
      });
    } else {
      // Find or create folder
      let existingFolder = currentLevel.find(
        (folder): folder is FolderNode =>
          folder.type === "folder" && folder.name === part
      );
      if (!existingFolder) {
        existingFolder = { type: "folder", name: part, children: [] };
        currentLevel.push(existingFolder);
      }
      currentLevel = existingFolder.children;
    }
  });
}

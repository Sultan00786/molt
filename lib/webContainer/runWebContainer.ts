import { setWebcontainUrl } from "@/store/slices/codeSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { FileSystemTree, WebContainer } from "@webcontainer/api";

let webcontainerInstance: WebContainer | null = null;
export async function runWebContainer(
  files: FileSystemTree,
  dispatch: Dispatch
) {
  try {
    console.log("🚀 Booting WebContainer...");
    if (!webcontainerInstance) {
      webcontainerInstance = await WebContainer.boot();
    }

    //   const webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(files);
    await installDependencies(webcontainerInstance);
    await startDevServer(webcontainerInstance, dispatch);

    return webcontainerInstance;
  } catch (error) {
    console.error("❌ WebContainer error:", error);
    throw error;
  }
}

async function installDependencies(webcontainerInstance: WebContainer) {
  const installProcess = await webcontainerInstance.spawn("npm", ["install"]);
  installProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data);
      },
    })
  );
  const exitCode = await installProcess.exit;
  if (exitCode !== 0) {
    throw new Error(`npm install failed with exit code ${exitCode}`);
  }
  console.log("✅ Dependencies installed!");
}

async function startDevServer(
  webcontainerInstance: WebContainer,
  dispatch: Dispatch
) {
  const devProcess = await webcontainerInstance.spawn("npm", ["run", "dev"]);
  devProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data);
      },
    })
  );

  // Wait for `server-ready` event
  webcontainerInstance.on("server-ready", (port, url) => {
    console.log(`✅ Server ready on port ${port}`);
    console.log(`🌐 URL: ${url}`);
    dispatch(setWebcontainUrl(url));
  });
}

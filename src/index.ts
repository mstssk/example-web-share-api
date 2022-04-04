window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("share-this-page")?.addEventListener("click", () => {
    if (!navigator.share) {
      alert(
        "Web Share APIに対応していません。モバイルブラウザで試してください。"
      );
      return;
    }

    const title = document.title;
    const description = (
      document.querySelector("meta[name=description]") as HTMLMetaElement
    )?.content;

    navigator
      .share({
        title: title,
        text: description,
        url: location.href,
      })
      .then(() => {
        alert("シェアが完了しました！");
      })
      .catch((reason) => {
        alert(reason);
      });
  });

  const inputTypeFile = document.getElementById(
    "share-file"
  ) as HTMLInputElement;
  document
    .getElementById("share-file-button")
    ?.addEventListener("click", () => {
      if (!navigator.share) {
        alert(
          "Web Share APIに対応していません。モバイルブラウザで試してください。"
        );
        return;
      }
      const file = inputTypeFile.files?.[0];
      if (!file) {
        alert("ファイルを選択してください。");
        return;
      }
      if (!navigator.canShare({ files: [file] })) {
        alert(`「${file.name}」はシェアできません。`);
        return;
      }
      navigator
        .share({
          files: [file],
        })
        .then(() => {
          alert("シェアが完了しました！");
        })
        .catch((reason) => {
          alert(reason);
        })
        .finally(() => {
          inputTypeFile.value = "";
        });
    });
});

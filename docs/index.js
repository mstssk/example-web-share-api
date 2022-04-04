"use strict";
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("share-this-page")?.addEventListener("click", () => {
        if (!navigator.share) {
            alert("Web Share APIに対応していません。モバイルブラウザで試してください。");
            return;
        }
        const title = document.title;
        const description = document.querySelector("meta[name=description]")?.content;
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
    const inputTypeFile = document.getElementById("share-file");
    inputTypeFile.addEventListener("change", () => {
        if (!navigator.share) {
            alert("Web Share APIに対応していません。モバイルブラウザで試してください。");
            return;
        }
        const file = inputTypeFile.files?.[0];
        if (!file) {
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
        });
    });
});

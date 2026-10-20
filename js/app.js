/**
 * Flow Canvas - アプリケーションロジック
 * (c) 2025-2026 Masahiro ARAKANE
 */

// =============================================================================
// グローバル状態
// =============================================================================
let modeler = null;
let djsContainerObserver = null;
let breadcrumbsShownProcessed = false;
let currentFileName = "Flow Canvas";
let isDirty = false;
let notificationTimeoutId = null;

// =============================================================================
// DOM要素の参照取得
// =============================================================================
const bpmnContainer = document.getElementById("bpmn-container");
const fileInputBpmn = document.getElementById("file-input-bpmn");

// ヘッダー情報要素
const docFilenameEl = document.getElementById("doc-filename");
const docDirtyBadge = document.getElementById("doc-dirty-badge");

// アクションボタン
const btnNew = document.getElementById("btn-new");
const btnOpen = document.getElementById("btn-open");
const btnSave = document.getElementById("btn-save");
const btnExportSvg = document.getElementById("btn-export-svg");
const btnShowSvg = document.getElementById("btn-show-svg");
const btnLearn = document.getElementById("btn-learn");
const btnShortcuts = document.getElementById("btn-shortcuts");

// ズームコントロール
const btnZoomIn = document.getElementById("btn-zoom-in");
const btnZoomOut = document.getElementById("btn-zoom-out");
const btnZoomFit = document.getElementById("btn-zoom-fit");

// 通知バナー要素
const notificationBanner = document.getElementById("notification-banner");
const notificationTitle = document.getElementById("notification-title");
const notificationBody = document.getElementById("notification-body");
const notificationCloseBtn = document.getElementById("notification-close-btn");
const notificationIconContainer = document.getElementById("notification-icon");

// モーダルダイアログ群
const dialogConfirmNew = document.getElementById("dialog-confirm-new");
const dialogTemplatePicker = document.getElementById("dialog-template-picker");
const dialogFilename = document.getElementById("dialog-filename");
const dialogShortcuts = document.getElementById("dialog-shortcuts");

// =============================================================================
// 通知バナー (Notification Toast)
// =============================================================================
const NOTIFICATION_ICONS = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>`
};

function showNotification(title, message, type = "info", duration = 4000) {
  if (notificationTimeoutId) {
    clearTimeout(notificationTimeoutId);
    notificationTimeoutId = null;
  }

  notificationBanner.className = `dads-notification-banner dads-notification-banner--${type}`;
  notificationTitle.textContent = title;
  notificationBody.textContent = message;
  notificationIconContainer.innerHTML = NOTIFICATION_ICONS[type] || NOTIFICATION_ICONS.info;
  notificationBanner.hidden = false;

  if (duration > 0) {
    notificationTimeoutId = setTimeout(() => {
      hideNotification();
    }, duration);
  }
}

function hideNotification() {
  notificationBanner.hidden = true;
  if (notificationTimeoutId) {
    clearTimeout(notificationTimeoutId);
    notificationTimeoutId = null;
  }
}

notificationCloseBtn.addEventListener("click", hideNotification);

// 以前のshowError互換関数
function showError(message) {
  showNotification("エラーが発生しました", message, "error", 6000);
}

function clearError() {
  hideNotification();
}

// =============================================================================
// ドキュメント情報 & 状態更新
// =============================================================================
function updateDocumentInfo(filename, dirty = false) {
  currentFileName = filename;
  isDirty = dirty;

  if (docFilenameEl) {
    docFilenameEl.textContent = `${currentFileName}.bpmn`;
    docFilenameEl.title = `${currentFileName}.bpmn`;
  }
  document.title = `${dirty ? "* " : ""}${currentFileName} - Flow Canvas`;

  if (docDirtyBadge) {
    docDirtyBadge.hidden = !dirty;
  }
}

function setDirty(dirty) {
  if (isDirty !== dirty) {
    isDirty = dirty;
    updateDocumentInfo(currentFileName, isDirty);
  }
}

// =============================================================================
// モーダルダイアログ制御
// =============================================================================
function openModal(dialogEl) {
  if (!dialogEl) return;
  if (typeof dialogEl.showModal === "function") {
    dialogEl.showModal();
  } else {
    dialogEl.setAttribute("open", "");
  }
}

function closeModal(dialogEl) {
  if (!dialogEl) return;
  if (typeof dialogEl.close === "function") {
    dialogEl.close();
  } else {
    dialogEl.removeAttribute("open");
  }
}

// すべてのダイアログの閉じるボタン・キャンセルボタンの共通ハンドラ
document.querySelectorAll(".dads-dialog [data-dialog-close]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const dialog = e.target.closest("dialog");
    if (dialog) closeModal(dialog);
  });
});

// ダイアログ外の背景クリックで閉じる
[dialogConfirmNew, dialogTemplatePicker, dialogShortcuts].forEach((dialog) => {
  if (!dialog) return;
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      closeModal(dialog);
    }
  });
});

// =============================================================================
// ファイル名入力プロンプトダイアログ
// =============================================================================
function promptFileName(titleText, defaultName, extension) {
  return new Promise((resolve) => {
    const titleEl = document.getElementById("dialog-filename-title");
    const inputEl = document.getElementById("input-custom-filename");
    const extEl = document.getElementById("filename-extension");
    const formEl = document.getElementById("form-filename");
    const cancelBtn = document.getElementById("btn-filename-cancel");

    titleEl.textContent = titleText;
    inputEl.value = defaultName;
    extEl.textContent = `.${extension}`;

    const handleConfirm = (e) => {
      e.preventDefault();
      const val = inputEl.value.trim();
      if (!val) {
        showNotification("入力エラー", "ファイル名を入力してください。", "error");
        inputEl.focus();
        return;
      }
      cleanup();
      closeModal(dialogFilename);
      resolve(val);
    };

    const handleCancel = () => {
      cleanup();
      closeModal(dialogFilename);
      resolve(null);
    };

    function cleanup() {
      formEl.removeEventListener("submit", handleConfirm);
      cancelBtn.removeEventListener("click", handleCancel);
    }

    formEl.addEventListener("submit", handleConfirm);
    cancelBtn.addEventListener("click", handleCancel);

    openModal(dialogFilename);
    setTimeout(() => {
      inputEl.focus();
      inputEl.select();
    }, 50);
  });
}

// =============================================================================
// ファイル入出力ユーティリティ
// =============================================================================
function getCurrentDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function saveFile(defaultFilename, data, type) {
  const blob = new Blob([data], { type });
  const ext = defaultFilename.includes(".") ? defaultFilename.split(".").pop() : "";

  // File System Access API (Chrome, Edge)
  if (typeof window.showSaveFilePicker === "function") {
    try {
      const mimeMap = { bpmn: "application/xml", svg: "image/svg+xml" };
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: defaultFilename,
        types: [
          {
            description: defaultFilename.endsWith(".bpmn") ? "BPMN 2.0 ファイル" : "SVG 画像ファイル",
            accept: { [mimeMap[ext] || type]: ["." + ext] },
          },
        ],
      });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      return fileHandle.name;
    } catch (err) {
      if (err.name === "AbortError") return null;
      console.warn("showSaveFilePicker failed, fallback:", err);
    }
  }

  // フォールバック: ダイアログでファイル名を確認してダウンロード
  const baseNameWithoutExt = defaultFilename.replace(/\.[^/.]+$/, "");
  const chosenName = await promptFileName(
    ext === "bpmn" ? "BPMNファイルの保存" : "SVGファイルの保存",
    baseNameWithoutExt,
    ext
  );

  if (!chosenName) return null;

  const finalFilename = `${chosenName}.${ext}`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = finalFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  return finalFilename;
}

// =============================================================================
// ビューポート調整
// =============================================================================
function fitViewport() {
  if (!modeler) return;
  const canvas = modeler.get("canvas");
  if (canvas) {
    try {
      if (canvas.getRootElement()) {
        canvas.zoom("fit-viewport", "auto");
      }
    } catch (e) {
      console.error("ビューポートフィットに失敗:", e);
    }
  }
}

function fitViewportWithDelay(delay = 250) {
  setTimeout(fitViewport, delay);
}

// =============================================================================
// BPMNインポート & テンプレート読込
// =============================================================================
async function importBPMN(xml, originalFileName) {
  clearError();
  if (!modeler) return;
  try {
    await modeler.importXML(xml);
    const baseName = originalFileName
      ? originalFileName.replace(/\.(bpmn|xml)$/i, "")
      : "Flow Canvas";
    updateDocumentInfo(baseName, false);
    fitViewport();
    breadcrumbsShownProcessed = false;
    updateBreadcrumbsVisibility();
    showNotification("インポート完了", `${baseName} を正常に読み込みました。`, "success");
  } catch (err) {
    showError(`BPMNのインポートに失敗しました: ${err.message || err}`);
  }
}

async function loadTemplate(templateKey) {
  const template = BPMN_TEMPLATES[templateKey];
  if (!template) {
    showError("指定されたテンプレートが見つかりません。");
    return;
  }
  closeModal(dialogTemplatePicker);
  closeModal(dialogConfirmNew);
  try {
    await modeler.importXML(template.xml);
    const defaultName = templateKey === "empty" ? "新規プロセス" : template.name.split("（")[0];
    updateDocumentInfo(defaultName, false);
    fitViewport();
    breadcrumbsShownProcessed = false;
    updateBreadcrumbsVisibility();
    showNotification("新規作成完了", `テンプレート「${template.name}」を展開しました。`, "success");
  } catch (err) {
    showError(`テンプレート展開に失敗しました: ${err.message || err}`);
  }
}

// =============================================================================
// パンくずリスト更新
// =============================================================================
function updateBreadcrumbsVisibility() {
  const breadcrumbsULElement = bpmnContainer.querySelector("ul.bjs-breadcrumbs");
  if (breadcrumbsULElement) {
    const listItems = breadcrumbsULElement.querySelectorAll("li");
    if (listItems.length > 1) {
      breadcrumbsULElement.style.display = "block";
    } else {
      breadcrumbsULElement.style.display = "none";
    }
  }
}

// =============================================================================
// BPMN モデラーの初期化
// =============================================================================
function initializeModeler() {
  clearError();
  modeler = new BpmnJS({
    container: bpmnContainer,
    keyboard: { bindTo: window },
    additionalModules: [translateModule],
  });

  const eventBus = modeler.get("eventBus");
  const elementRegistry = modeler.get("elementRegistry");
  const overlays = modeler.get("overlays");

  // ドリルダウンオーバーレイ表示制御
  function updateDrilldownOverlayVisibility(element, selectedElementId) {
    const drilldownOverlays = overlays.get({
      element: element.id,
      type: "drilldown",
    });

    if (drilldownOverlays && drilldownOverlays.length > 0) {
      drilldownOverlays.forEach((overlay) => {
        let shouldShow = false;
        if (selectedElementId === element.id) {
          const bo = element.businessObject;
          if (
            bo &&
            (bo.$instanceOf("bpmn:SubProcess") || bo.$instanceOf("bpmn:CallActivity"))
          ) {
            shouldShow = true;
          }
        }
        if (overlay.html) {
          overlay.html.style.display = shouldShow ? "block" : "none";
        }
      });
    }
  }

  eventBus.on("selection.changed", function (event) {
    const newSelection = event.newSelection;
    const oldSelection = event.oldSelection;
    const selectedElement = newSelection.length === 1 ? newSelection[0] : null;
    const selectedElementId = selectedElement ? selectedElement.id : null;

    if (oldSelection.length === 1 && oldSelection[0] !== selectedElement) {
      updateDrilldownOverlayVisibility(oldSelection[0], selectedElementId);
    }
    if (selectedElement) {
      updateDrilldownOverlayVisibility(selectedElement, selectedElementId);
    } else {
      elementRegistry.forEach(function (element) {
        updateDrilldownOverlayVisibility(element, null);
      });
    }
  });

  function manageAllDrilldownOverlaysVisibility() {
    const currentSelection = modeler.get("selection").get();
    const selectedElement = currentSelection.length === 1 ? currentSelection[0] : null;
    const selectedElementId = selectedElement ? selectedElement.id : null;
    elementRegistry.forEach(function (element) {
      updateDrilldownOverlayVisibility(element, selectedElementId);
    });
  }

  eventBus.on(["import.done", "commandStack.changed"], function () {
    setTimeout(manageAllDrilldownOverlaysVisibility, 0);
  });

  // 編集検知
  modeler.on("commandStack.changed", () => {
    setDirty(true);
  });

  // 初期ダイアグラム読み込み
  const urlParams = new URLSearchParams(window.location.search);
  const templateParam = urlParams.get("template");
  const targetTemplate = (templateParam && BPMN_TEMPLATES[templateParam])
    ? BPMN_TEMPLATES[templateParam]
    : BPMN_TEMPLATES.empty;

  const initialXML = targetTemplate ? targetTemplate.xml : "";
  const initialName = (templateParam && targetTemplate)
    ? (targetTemplate.name.replace(/【.*?】/, "").trim() || "Flow Canvas")
    : "Flow Canvas";

  modeler
    .importXML(initialXML)
    .then(() => {
      updateDocumentInfo(initialName, false);
      fitViewport();
      breadcrumbsShownProcessed = false;
      updateBreadcrumbsVisibility();
      setTimeout(manageAllDrilldownOverlaysVisibility, 0);

      if (templateParam) {
        showNotification(
          "テンプレートを読み込みました",
          `「${targetTemplate.name}」を開きました。自由に作図・編集してみましょう！`,
          "info",
          6000
        );
      }

      const canvasInternal = modeler.get("canvas");
      if (canvasInternal && canvasInternal._container) {
        const djsContainerElement = canvasInternal._container;
        djsContainerObserver = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.type === "attributes" && mutation.attributeName === "class") {
              const targetElement = mutation.target;
              const classList = targetElement.classList;
              if (classList.contains("bjs-breadcrumbs-shown")) {
                if (!breadcrumbsShownProcessed) {
                  breadcrumbsShownProcessed = true;
                  updateBreadcrumbsVisibility();
                  fitViewportWithDelay();
                }
              } else {
                if (breadcrumbsShownProcessed) {
                  breadcrumbsShownProcessed = false;
                  updateBreadcrumbsVisibility();
                }
              }
            } else if (
              mutation.type === "childList" &&
              mutation.target.classList &&
              mutation.target.classList.contains("bjs-breadcrumbs")
            ) {
              updateBreadcrumbsVisibility();
            }
          }
        });
        djsContainerObserver.observe(djsContainerElement, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }
    })
    .catch((err) => {
      showError(`初期ダイアグラムの読み込みに失敗しました: ${err.message || err}`);
    });

  modeler.on("root.changed", () => {
    breadcrumbsShownProcessed = false;
    updateBreadcrumbsVisibility();
    fitViewportWithDelay();
  });

  window.addEventListener("resize", () => {
    if (modeler) {
      const canvas = modeler.get("canvas");
      if (canvas) canvas.resized();
    }
  });

  eventBus.on("breadcrumbs.updated", () => {
    updateBreadcrumbsVisibility();
    fitViewportWithDelay();
  });
}

// =============================================================================
// イベントリスナー設定
// =============================================================================

// 新規作成ボタン
btnNew.addEventListener("click", () => {
  if (isDirty) {
    openModal(dialogConfirmNew);
  } else {
    openModal(dialogTemplatePicker);
  }
});

// 新規作成確認ダイアログ内のアクション
document.getElementById("btn-confirm-new-template").addEventListener("click", () => {
  closeModal(dialogConfirmNew);
  openModal(dialogTemplatePicker);
});

document.getElementById("btn-confirm-new-empty").addEventListener("click", () => {
  loadTemplate("empty");
});

// テンプレート選択ダイアログのカードクリックイベント
document.querySelectorAll(".dads-template-card").forEach((card) => {
  card.addEventListener("click", () => {
    const templateId = card.getAttribute("data-template-id");
    if (templateId) {
      loadTemplate(templateId);
    }
  });
});

// ファイルを開く
btnOpen.addEventListener("click", () => {
  if (isDirty) {
    if (!window.confirm("未保存の変更があります。破棄して別のファイルを開きますか？")) {
      return;
    }
  }
  fileInputBpmn.click();
});

fileInputBpmn.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && modeler) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      await importBPMN(e.target.result, file.name);
    };
    reader.onerror = () => {
      showError("ファイルの読み込みに失敗しました。");
    };
    reader.readAsText(file);
  }
  event.target.value = "";
});

// BPMN保存
btnSave.addEventListener("click", async () => {
  clearError();
  if (!modeler) return;
  try {
    const dateStr = getCurrentDateString();
    const baseName = currentFileName !== "Flow Canvas" ? currentFileName : `${dateStr}_FlowCanvas`;
    const defaultFilename = `${baseName}.bpmn`;
    const { xml } = await modeler.saveXML({ format: true });
    const savedFilename = await saveFile(defaultFilename, xml, "application/xml");
    if (savedFilename) {
      const newTitle = savedFilename.replace(/\.(bpmn|xml)$/i, "");
      updateDocumentInfo(newTitle, false);
      showNotification("保存完了", `${savedFilename} を保存しました。`, "success");
    }
  } catch (err) {
    showError(`BPMNの保存に失敗しました: ${err.message || err}`);
  }
});

// SVGエクスポート
btnExportSvg.addEventListener("click", async () => {
  clearError();
  if (!modeler) return;
  try {
    const dateStr = getCurrentDateString();
    const baseName = currentFileName !== "Flow Canvas" ? currentFileName : `${dateStr}_FlowCanvas`;
    const defaultFilename = `${baseName}.svg`;
    const { svg } = await modeler.saveSVG();
    const savedFilename = await saveFile(defaultFilename, svg, "image/svg+xml");
    if (savedFilename) {
      showNotification("エクスポート完了", `${savedFilename} を出力しました。`, "success");
    }
  } catch (err) {
    showError(`SVGのエクスポートに失敗しました: ${err.message || err}`);
  }
});

// SVG別タブ表示
btnShowSvg.addEventListener("click", async () => {
  clearError();
  if (!modeler) return;
  try {
    const { svg } = await modeler.saveSVG();
    const svgWindow = window.open("");
    if (svgWindow) {
      svgWindow.document.write(svg);
      svgWindow.document.title = `${currentFileName} (SVGプレビュー)`;
      svgWindow.document.close();
      showNotification("SVG表示", "新しいタブにSVGプレビューを表示しました。", "info");
    } else {
      showError("ポップアップがブロックされました。ブラウザのポップアップ設定をご確認ください。");
    }
  } catch (err) {
    showError(`SVGの生成に失敗しました: ${err.message || err}`);
  }
});

// BPMN学習ハンドブック
btnLearn.addEventListener("click", () => {
  window.open("learn-bpmn.html", "_blank");
});

// ショートカットモーダル
btnShortcuts.addEventListener("click", () => {
  openModal(dialogShortcuts);
});

// ズームコントロール
btnZoomIn.addEventListener("click", () => {
  if (!modeler) return;
  const canvas = modeler.get("canvas");
  if (canvas) canvas.zoom(canvas.zoom() + 0.2);
});

btnZoomOut.addEventListener("click", () => {
  if (!modeler) return;
  const canvas = modeler.get("canvas");
  if (canvas) canvas.zoom(canvas.zoom() - 0.2);
});

btnZoomFit.addEventListener("click", () => {
  fitViewport();
});

// キーボードショートカット
document.addEventListener("keydown", (event) => {
  // Ctrl+Shift+H: ショートカット一覧
  if (event.ctrlKey && event.shiftKey && (event.key === "h" || event.key === "H")) {
    event.preventDefault();
    openModal(dialogShortcuts);
  }
  // Ctrl+S: BPMN保存
  if (event.ctrlKey && (event.key === "s" || event.key === "S")) {
    event.preventDefault();
    if (btnSave) btnSave.click();
  }
  // Ctrl+O: ファイルを開く
  if (event.ctrlKey && (event.key === "o" || event.key === "O")) {
    event.preventDefault();
    if (btnOpen) btnOpen.click();
  }
});

// キャンバスへのドラッグ＆ドロップ
bpmnContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  bpmnContainer.classList.add("drop-active");
});

bpmnContainer.addEventListener("dragleave", () => {
  bpmnContainer.classList.remove("drop-active");
});

bpmnContainer.addEventListener("drop", (event) => {
  event.preventDefault();
  bpmnContainer.classList.remove("drop-active");
  clearError();

  const files = event.dataTransfer.files;
  if (files.length === 1) {
    const file = files[0];
    if (file.name.endsWith(".bpmn") || file.name.endsWith(".xml")) {
      if (modeler) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          await importBPMN(e.target.result, file.name);
        };
        reader.onerror = () => {
          showError("ファイルの読み込みに失敗しました。");
        };
        reader.readAsText(file);
      }
    } else {
      showError("BPMNまたはXMLファイル (.bpmn, .xml) を選択してください。");
    }
  } else if (files.length > 1) {
    showError("一度にドロップできるファイルは1つのみです。");
  }
});

// 未保存警告
window.onbeforeunload = (event) => {
  if (isDirty) {
    const message = "変更が保存されていません。本当にこのページを離れますか？";
    event.returnValue = message;
    return message;
  }
};

// 起動時初期化
window.addEventListener("DOMContentLoaded", initializeModeler);


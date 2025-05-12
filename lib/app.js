// copyright (c) 2025, Masahiro ARAKANE

// グローバルなエラー処理とUI要素
const errorMessageDiv = document.getElementById("error-message");
const errorTextSpan = document.getElementById("error-text");
const closeErrorBtn = document.getElementById("close-error-btn");

// エラーメッセージを表示する関数
function showError(message) {
  errorTextSpan.textContent = message;
  errorMessageDiv.style.display = "block";
  console.error(message);
}

// エラーメッセージをクリアする関数
function clearError() {
  errorMessageDiv.style.display = "none";
  errorTextSpan.textContent = "";
}
closeErrorBtn.onclick = clearError;

// bpmn-js のための日本語翻訳
const japaneseTranslations = {
  "Activate create/remove space tool": "スペース作成/削除ツールを有効化",
  "Activate global connect tool": "グローバル接続ツールを有効化",
  "Activate hand tool": "ハンドツールを有効化",
  "Activate lasso tool": "投げ縄ツールを有効化",
  "Ad-hoc": "アドホック",
  "Add Lane above": "上にレーンを追加",
  "Add Lane below": "下にレーンを追加",
  "Append compensation activity": "補償アクティビティを追加",
  "Append conditional intermediate catch event":
    "条件付き中間キャッチイベントを追加",
  "Append end event": "終了イベントを追加",
  "Append gateway": "ゲートウェイを追加",
  "Append intermediate/boundary event": "中間/境界イベントを追加",
  "Append message intermediate catch event":
    "メッセージ中間キャッチイベントを追加",
  "Append receive task": "受信タスクを追加",
  "Append signal intermediate catch event":
    "シグナル中間キャッチイベントを追加",
  "Append task": "タスクを追加",
  "Append text annotation": "テキスト注釈を追加",
  "Append timer intermediate catch event": "タイマー中間キャッチイベントを追加",
  "Business rule task": "ビジネスルールタスク",
  "Call activity": "呼び出しアクティビティ",
  "Cancel boundary event": "キャンセル境界イベント",
  "Cancel end event": "キャンセル終了イベント",
  "Change type": "タイプ変更",
  "Collapsed pool": "折りたたまれたプール",
  "Compensation boundary event": "補償境界イベント",
  "Compensation end event": "補償終了イベント",
  "Compensation intermediate throw event": "補償中間スローイベント",
  "Compensation start event": "補償開始イベント",
  "Complex gateway": "複合ゲートウェイ",
  "Conditional boundary event": "条件付き境界イベント",
  "Conditional boundary event (non-interrupting)":
    "条件付き境界イベント（中断なし）",
  "Conditional flow": "条件フロー",
  "Conditional intermediate catch event": "条件付き中間キャッチイベント",
  "Conditional start event": "条件付き開始イベント",
  "Conditional start event (non-interrupting)":
    "条件付き開始イベント（中断なし）",
  "Connect using association": "関連を使用して接続",
  "Connect using data input association": "データ入力関連を使用して接続",
  "Connect using sequence/message flow":
    "シーケンス/メッセージフローを使用して接続",
  "Create data object reference": "データオブジェクト参照を作成",
  "Create data store reference": "データストア参照を作成",
  "Create end event": "終了イベントを作成",
  "Create expanded sub-process": "展開されたサブプロセスを作成",
  "Create gateway": "ゲートウェイを作成",
  "Create group": "グループを作成",
  "Create intermediate/boundary event": "中間/境界イベントを追加",
  "Create pool/participant": "プール/参加者を作成",
  "Create start event": "開始イベントを作成",
  "Create task": "タスクを作成",
  "Data object reference": "データオブジェクト参照",
  "Data store reference": "データストア参照",
  "Default flow": "デフォルトフロー",
  Delete: "削除",
  "Distribute elements horizontally": "要素を水平に配置",
  "Distribute elements vertically": "要素を垂直に配置",
  "Divide into three lanes": "3つのレーンに分割",
  "Divide into two lanes": "2つのレーンに分割",
  "Empty pool/participant": "プール/参加者を空にする",
  "Empty pool/participant (removes content)":
    "プール/参加者を空にする（内容は削除）",
  "End event": "終了イベント",
  "Error boundary event": "エラー境界イベント",
  "Error end event": "エラー終了イベント",
  "Error start event": "エラー開始イベント",
  "Escalation boundary event": "エスカレーション境界イベント",
  "Escalation boundary event (non-interrupting)":
    "エスカレーション境界イベント（中断なし）",
  "Escalation end event": "エスカレーション終了イベント",
  "Escalation intermediate throw event": "エスカレーション中間スローイベント",
  "Escalation start event": "エスカレーション開始イベント",
  "Escalation start event (non-interrupting)":
    "エスカレーション開始イベント（中断なし）",
  "Event sub-process": "イベントサブプロセス",
  "Event-based gateway": "イベントベースのゲートウェイ",
  "Exclusive gateway": "排他ゲートウェイ",
  "Inclusive gateway": "包含ゲートウェイ",
  "Intermediate throw event": "中間スローイベント",
  "Link intermediate catch event": "リンク中間キャッチイベント",
  "Link intermediate throw event": "リンク中間スローイベント",
  Loop: "ループ",
  "Manual task": "手動タスク",
  "Message boundary event": "メッセージ境界イベント",
  "Message boundary event (non-interrupting)":
    "メッセージ境界イベント（中断なし）",
  "Message end event": "メッセージ終了イベント",
  "Message intermediate catch event": "メッセージ中間キャッチイベント",
  "Message intermediate throw event": "メッセージ中間スローイベント",
  "Message start event": "メッセージ開始イベント",
  "Message start event (non-interrupting)":
    "メッセージ開始イベント（中断なし）",
  "Open {element}": "{element} を開く",
  "Parallel gateway": "並列ゲートウェイ",
  "Parallel multi-instance": "並列マルチインスタンス",
  "Participant multiplicity": "参加者多重度",
  "Receive task": "受信タスク",
  "Script task": "スクリプトタスク",
  "Search in diagram": "図内を検索",
  "Send task": "送信タスク",
  "Sequence flow": "シーケンスフロー",
  "Sequential multi-instance": "連続マルチインスタンス",
  "Service task": "サービスタスク",
  "Signal boundary event": "シグナル境界イベント",
  "Signal boundary event (non-interrupting)":
    "シグナル境界イベント（中断なし）",
  "Signal end event": "シグナル終了イベント",
  "Signal intermediate catch event": "シグナル中間キャッチイベント",
  "Signal intermediate throw event": "シグナル中間スローイベント",
  "Signal start event": "シグナル開始イベント",
  "Signal start event (non-interrupting)": "シグナル開始イベント（中断なし）",
  "Start event": "開始イベント",
  "Sub-process": "サブプロセス",
  "Sub-process (collapsed)": "サブプロセス（折りたたみ）",
  "Sub-process (expanded)": "サブプロセス（展開）",
  Task: "タスク",
  "Terminate end event": "終了イベントの終了",
  "Timer boundary event": "タイマー境界イベント",
  "Timer boundary event (non-interrupting)": "タイマー境界イベント（中断なし）",
  "Timer intermediate catch event": "タイマー中間キャッチイベント",
  "Timer start event": "タイマー開始イベント",
  "Timer start event (non-interrupting)": "タイマー開始イベント（中断なし）",
  "Toggle non-interrupting": "中断なしに切り替え",
  Transaction: "トランザクション",
  "User task": "ユーザータスク",
  "flow elements must be children of pools/participants":
    "フロー要素はプール/参加者の子でなければなりません",
};

// 初期BPMN XML図
const initialDiagramXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" targetNamespace="http://bpmn.io/schema/bpmn" id="Definitions_1" name="Default Process">
  <bpmn:process id="Process_1" name="Top" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="開始イベント"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Top">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

// モデラーインスタンスとUI要素
let modeler;
let djsContainerObserver;
let breadcrumbsShownProcessed = false;
let currentFileNameForTitle = "Flow Canvas"; // SVGタブタイトル用の現在のファイル名を格納する変数
let isDirty = false; // ダイアグラムが変更されたかどうかを示すフラグ

const bpmnContainer = document.getElementById("bpmn-container");
const btnCreateNew = document.getElementById("btn-create-new");
const btnExportBpmn = document.getElementById("btn-export-bpmn");
const btnImportBpmn = document.getElementById("btn-import-bpmn");
const fileInputBpmn = document.getElementById("file-input-bpmn");
const btnShowSvg = document.getElementById("btn-show-svg");
const btnExportSvg = document.getElementById("btn-export-svg");
const btnLearnBpmn = document.getElementById("btn-learn-bpmn");
const btnShowShortcuts = document.getElementById("btn-show-shortcuts");
const shortcutsModal = document.getElementById("shortcuts-modal");
const closeShortcutsModalBtn = document.getElementById(
  "close-shortcuts-modal-btn"
);

// ファイル名用の現在の日付文字列を取得する関数
function getCurrentDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ファイルをダウンロードする関数
function downloadFile(filename, data, type) {
  const blob = new Blob([data], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

// ビューポートを図の内容に合わせる関数
function fitViewport() {
  if (!modeler) return;
  const canvas = modeler.get("canvas");
  if (canvas) {
    try {
      if (canvas.getRootElement()) {
        canvas.zoom("fit-viewport", "auto");
        console.log(
          "ビューポートをフィットさせました。対象:",
          canvas.getRootElement().id
        );
      } else {
        console.warn(
          "ルート要素が見つからないため、ビューポートのフィットをスキップしました。"
        );
      }
    } catch (e) {
      console.error("ビューポートフィットに失敗:", e);
      showError(`ビューの調整に失敗しました: ${e.message || e}`);
    }
  }
}

// 遅延してビューポートをフィットさせる関数
function fitViewportWithDelay(delay = 250) {
  console.log(`ビューポート調整を ${delay}ms 遅延実行します。`);
  setTimeout(fitViewport, delay);
}

// BPMN XMLをインポートする関数
async function importBPMN(xml, originalFileName) {
  clearError();
  if (!modeler) return;
  if (
    !window.confirm(
      "現在のキャンバスをクリアしてファイルを開いてもよろしいですか？"
    )
  ) {
    console.log("ファイルインポートがキャンセルされました。");
    return;
  }
  try {
    await modeler.importXML(xml);
    console.log("BPMN XMLが正常にインポートされました。");
    if (originalFileName) {
      currentFileNameForTitle = originalFileName.replace(/\.(bpmn|xml)$/i, "");
      document.title = currentFileNameForTitle; // 現在のタブタイトルも更新
    }
    isDirty = false; // インポート後は変更なし状態
    fitViewport();
    breadcrumbsShownProcessed = false;
    updateBreadcrumbsVisibility();
  } catch (err) {
    showError(`BPMNファイルのインポートに失敗: ${err.message || err}`);
  }
}

// bpmn-js用のカスタム翻訳関数
function customTranslate(template, replacements) {
  replacements = replacements || {};
  const translatedTemplate = japaneseTranslations[template] || template;
  return translatedTemplate.replace(/{([^}]+)}/g, function (_, key) {
    const value = replacements[key];
    return value !== undefined ? value : "{" + key + "}";
  });
}
const translateModule = {
  translate: ["value", customTranslate],
};

// パンくずリストの表示/非表示をリスト項目に基づいて更新する関数
function updateBreadcrumbsVisibility() {
  const breadcrumbsULElement =
    bpmnContainer.querySelector("ul.bjs-breadcrumbs");
  if (breadcrumbsULElement) {
    const listItems = breadcrumbsULElement.querySelectorAll("li");
    if (listItems.length > 1) {
      breadcrumbsULElement.style.display = "block";
    } else {
      breadcrumbsULElement.style.display = "none";
    }
  }
}

// ショートカットモーダルを開閉する関数
function openShortcutsModal() {
  if (shortcutsModal) shortcutsModal.style.display = "block";
}

function closeShortcutsModal() {
  if (shortcutsModal) shortcutsModal.style.display = "none";
}

// BPMNモデラーを初期化する関数
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

  // ドリルダウンオーバーレイの表示/非表示を更新する関数
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
            (bo.$instanceOf("bpmn:SubProcess") ||
              bo.$instanceOf("bpmn:CallActivity"))
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

  // 選択変更を処理してドリルダウンオーバーレイを表示/非表示にする
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

  // 図の読み込み時および変更時にドリルダウンオーバーレイの表示を管理する
  function manageAllDrilldownOverlaysVisibility() {
    const currentSelection = modeler.get("selection").get();
    const selectedElement =
      currentSelection.length === 1 ? currentSelection[0] : null;
    const selectedElementId = selectedElement ? selectedElement.id : null;

    elementRegistry.forEach(function (element) {
      updateDrilldownOverlayVisibility(element, selectedElementId);
    });
  }

  eventBus.on(["import.done", "commandStack.changed"], function () {
    setTimeout(manageAllDrilldownOverlaysVisibility, 0);
  });

  // コマンドスタックの変更を監視してisDirtyフラグを更新
  modeler.on("commandStack.changed", () => {
    isDirty = true;
    console.log("変更あり、isDirty を true に設定");
  });

  // 初期図をインポート
  modeler
    .importXML(initialDiagramXML)
    .then(() => {
      console.log("初期ダイアグラムが正常に読み込まれました。");
      currentFileNameForTitle = "Flow Canvas"; // 初期読み込み時のデフォルトタイトル
      document.title = currentFileNameForTitle; // 現在のタブタイトルも設定
      isDirty = false; // 初期状態は変更なし
      fitViewport();
      breadcrumbsShownProcessed = false;
      updateBreadcrumbsVisibility();
      setTimeout(manageAllDrilldownOverlaysVisibility, 0); // 初期の表示確認

      const canvasInternal = modeler.get("canvas");
      if (canvasInternal && canvasInternal._container) {
        const djsContainerElement = canvasInternal._container;
        djsContainerObserver = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "class"
            ) {
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
      } else {
        console.warn("djs-containerの監視設定に失敗しました。");
      }
    })
    .catch((err) => {
      showError(`初期ダイアグラムの読み込みに失敗: ${err.message || err}`);
    });

  // ルート要素の変更を処理
  modeler.on("root.changed", (event) => {
    const currentRoot = event.element || event.newRoot || event.root;
    const oldRoot = event.oldRoot;
    if (currentRoot && typeof currentRoot.id !== "undefined") {
      console.log(
        "ルート要素が変更/更新されました: old=",
        oldRoot && typeof oldRoot.id !== "undefined" ? oldRoot.id : "undefined",
        "current=",
        currentRoot.id
      );
    } else if (currentRoot) {
      console.warn(
        "ルート要素が変更/更新されましたが、IDがありません:",
        currentRoot,
        "イベント詳細:",
        event
      );
    }
    breadcrumbsShownProcessed = false;
    updateBreadcrumbsVisibility();
    fitViewportWithDelay();
  });

  // ウィンドウリサイズを処理
  window.addEventListener("resize", function () {
    if (modeler) {
      const canvas = modeler.get("canvas");
      if (canvas) {
        canvas.resized();
        console.log(
          "ウィンドウリサイズイベント: canvas.resized() を呼び出しました。"
        );
      }
    }
  });

  // モジュールからのパンくずリスト更新を処理
  const eventBusInstance = modeler.get("eventBus");
  if (eventBusInstance) {
    eventBusInstance.on("breadcrumbs.updated", function (event) {
      console.log(
        "パンくずリスト(モジュール)が更新されました。イベント:",
        event
      );
      updateBreadcrumbsVisibility();
      fitViewportWithDelay();
    });
  } else {
    console.warn(
      "eventBusが見つからず、breadcrumbs.updatedイベントを購読できません。"
    );
  }
}

// ボタンのイベントリスナー
btnCreateNew.addEventListener("click", async () => {
  clearError();
  if (!modeler) return;
  if (
    !window.confirm(
      "現在のキャンパスをクリアして新規作成してもよろしいですか？"
    )
  ) {
    console.log("新規作成がキャンセルされました。");
    return;
  }
  try {
    const newDiagramXML = initialDiagramXML
      .replace(/id="Process_1"/g, `id="Process_${new Date().getTime()}"`)
      .replace(/name="Top"/g, 'name="Top"')
      .replace(/id="StartEvent_1"/g, `id="StartEvent_${new Date().getTime()}"`)
      .replace(/name="開始"/g, 'name="開始"');
    await modeler.importXML(newDiagramXML);
    currentFileNameForTitle = "Flow Canvas"; // 新規ダイアグラムのタイトルをリセット
    document.title = currentFileNameForTitle; // 現在のタブタイトルもリセット
    isDirty = false; // 新規作成後は変更なし状態
    console.log("新しいダイアグラムが作成されました。");
    fitViewport();
    breadcrumbsShownProcessed = false;
    updateBreadcrumbsVisibility();
  } catch (err) {
    showError(`新規ダイアグラムの作成に失敗: ${err.message || err}`);
  }
});

btnExportBpmn.addEventListener("click", async () => {
  clearError();
  if (!modeler) return;
  try {
    const dateStr = getCurrentDateString();
    const defaultFilename = `${dateStr}_FlowCanvas.bpmn`;
    const filename = window.prompt(
      "BPMNファイル名を入力してください:",
      defaultFilename
    );
    if (filename === null) {
      console.log("BPMNエクスポートがキャンセルされました。");
      return;
    }
    if (filename.trim() === "") {
      showError("ファイル名が空です。");
      return;
    }
    const finalFilename = filename.endsWith(".bpmn")
      ? filename
      : filename + ".bpmn";
    const { xml } = await modeler.saveXML({ format: true });
    downloadFile(finalFilename, xml, "application/xml");
    currentFileNameForTitle = finalFilename.replace(/\.(bpmn|xml)$/i, ""); // エクスポート成功時にタイトルを更新
    document.title = currentFileNameForTitle; // 現在のタブタイトルも更新
    isDirty = false; // 保存後は変更なし状態
    console.log(`BPMN XMLが ${finalFilename} としてエクスポートされました。`);
  } catch (err) {
    showError(`BPMNのエクスポートに失敗: ${err.message || err}`);
  }
});

btnImportBpmn.addEventListener("click", () => {
  clearError();
  fileInputBpmn.click();
});

fileInputBpmn.addEventListener("change", (event) => {
  clearError();
  const file = event.target.files[0];
  if (file && modeler) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      await importBPMN(e.target.result, file.name);
    };
    reader.onerror = (e) => {
      showError(`ファイルの読み込みに失敗しました。`);
    };
    reader.readAsText(file);
  }
  event.target.value = ""; // ファイル入力をリセット
});

btnShowSvg.addEventListener("click", async () => {
  clearError();
  if (!modeler) return;
  try {
    const { svg } = await modeler.saveSVG();

    // <text> 要素とSVG内部の <title> 要素の両方を削除
    let svgWithTitle = svg; // 修正案2を適用

    const svgWindow = window.open("");
    if (svgWindow) {
      svgWindow.document.write(svgWithTitle);
      svgWindow.document.title = currentFileNameForTitle; // SVG表示タブのタイトル
      svgWindow.document.close();
      console.log("SVGが新しいタブに表示されました。");
    } else {
      showError(
        "新しいタブを開けませんでした。ポップアップブロッカーを確認してください。"
      );
    }
  } catch (err) {
    showError(`SVGの生成または表示に失敗: ${err.message || err}`);
  }
});

btnExportSvg.addEventListener("click", async () => {
  clearError();
  if (!modeler) return;
  try {
    const dateStr = getCurrentDateString();
    const defaultFilename = `${dateStr}_FlowCanvas.svg`;
    const filename = window.prompt(
      "SVGファイル名を入力してください:",
      defaultFilename
    );
    if (filename === null) {
      console.log("SVGエクスポートがキャンセルされました。");
      return;
    }
    if (filename.trim() === "") {
      showError("ファイル名が空です。");
      return;
    }
    const finalFilename = filename.endsWith(".svg")
      ? filename
      : filename + ".svg";
    const { svg } = await modeler.saveSVG();
    downloadFile(finalFilename, svg, "image/svg+xml");
    currentFileNameForTitle = finalFilename.replace(/\.svg$/i, "");
    console.log(`SVGが ${finalFilename} としてエクスポートされました。`);
  } catch (err) {
    showError(`SVGのエクスポートに失敗: ${err.message || err}`);
  }
});

btnLearnBpmn.addEventListener("click", () => {
  window.open("learn-bpmn.html", "_blank");
});

// ショートカットモーダルのイベントリスナー
if (btnShowShortcuts) {
  btnShowShortcuts.addEventListener("click", openShortcutsModal);
}
if (closeShortcutsModalBtn) {
  closeShortcutsModalBtn.addEventListener("click", closeShortcutsModal);
}
if (shortcutsModal) {
  window.addEventListener("click", function (event) {
    if (event.target == shortcutsModal) {
      closeShortcutsModal();
    }
  });
}

// キーボードショートカット
document.addEventListener("keydown", function (event) {
  // Ctrl+Shift+H: ショートカットモーダル表示
  if (
    event.ctrlKey &&
    event.shiftKey &&
    (event.key === "h" || event.key === "H")
  ) {
    event.preventDefault();
    openShortcutsModal();
  }
  // Ctrl+S: BPMNファイル保存
  if (event.ctrlKey && (event.key === "s" || event.key === "S")) {
    event.preventDefault();
    if (btnExportBpmn) {
      btnExportBpmn.click();
    }
  }
  // Ctrl+X: やり直し
  if (event.ctrlKey && (event.key === "x" || event.key === "X")) {
    event.preventDefault();
    if (modeler) {
      const commandStack = modeler.get("commandStack");
      if (commandStack && commandStack.canRedo()) {
        commandStack.redo();
        console.log("やり直しを実行しました。");
      } else {
        console.log("やり直し可能な操作がありません。");
      }
    }
  }
});

// BPMNファイルのドラッグアンドドロップ機能
const dropContainer = document.getElementById("bpmn-container");
dropContainer.addEventListener("dragover", function (event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  dropContainer.classList.add("drop-active");
});

dropContainer.addEventListener("dragleave", function (event) {
  dropContainer.classList.remove("drop-active");
});

dropContainer.addEventListener("drop", function (event) {
  event.preventDefault();
  dropContainer.classList.remove("drop-active");
  clearError();
  console.log("drop event");

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
      showError("BPMNまたはXMLファイルを選択してください。");
    }
  } else if (files.length > 1) {
    showError("一度に1つのファイルのみドロップできます。");
  }
});

// ウィンドウ読み込み時にモデラーを初期化
window.onload = initializeModeler;

// タブを閉じる前の確認
window.onbeforeunload = function (event) {
  if (isDirty) {
    const confirmationMessage =
      "変更が保存されていません。本当にこのページを離れますか？";
    event.returnValue = confirmationMessage; // ほとんどのブラウザで標準
    return confirmationMessage; // 一部の古いブラウザ用
  }
};

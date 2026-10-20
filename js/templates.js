/**
 * Flow Canvas - BPMN 2.0 プリセットテンプレート集
 * (c) 2025-2026 Masahiro ARAKANE
 */

const BPMN_TEMPLATES = {
  empty: {
    id: "empty",
    name: "空のプール（新規作成用）",
    description: "単一の空プールから自由に作図を開始するシンプルなテンプレートです。",
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" targetNamespace="http://bpmn.io/schema/bpmn" id="Definitions_1" name="Default Process">
  <bpmn:collaboration id="Collaboration_1">
    <bpmn:participant id="Participant_1" name="業務プロセス" processRef="Process_1" />
  </bpmn:collaboration>
  <bpmn:process id="Process_1" isExecutable="false" />
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1">
      <bpmndi:BPMNShape id="ParticipantShape_1" bpmnElement="Participant_1">
        <dc:Bounds x="100" y="100" width="700" height="280" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
  },

  approval: {
    id: "approval",
    name: "申請・承認フロー（3レーン）",
    description: "「申請者」「上長」「会計担当」の3レーンによる典型的な稟議・申請承認プロセスです。",
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_Approval" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:collaboration id="Collaboration_Approval">
    <bpmn:participant id="Participant_Org" name="申請承認業務" processRef="Process_Approval" />
  </bpmn:collaboration>
  <bpmn:process id="Process_Approval" isExecutable="false">
    <bpmn:laneSet id="LaneSet_1">
      <bpmn:lane id="Lane_Applicant" name="申請者">
        <bpmn:flowNodeRef>Start_Apply</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_Create</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_Fix</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_Manager" name="承認者（上長）">
        <bpmn:flowNodeRef>Task_Review</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_Judge</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_Admin" name="会計担当">
        <bpmn:flowNodeRef>Task_Process</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>End_Approved</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>End_Rejected</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>

    <bpmn:startEvent id="Start_Apply" name="申請起案">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_Create" name="申請書作成・提出">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:incoming>Flow_Remake</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_Review" name="内容審査">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:task>
    <bpmn:exclusiveGateway id="Gateway_Judge" name="承認可否">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_Pass</bpmn:outgoing>
      <bpmn:outgoing>Flow_Reject</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:task id="Task_Fix" name="差戻し対応">
      <bpmn:incoming>Flow_Reject</bpmn:incoming>
      <bpmn:outgoing>Flow_Remake</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_Process" name="決裁・処理実行">
      <bpmn:incoming>Flow_Pass</bpmn:incoming>
      <bpmn:outgoing>Flow_End</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="End_Approved" name="処理完了">
      <bpmn:incoming>Flow_End</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:endEvent id="End_Rejected" name="却下終了" />

    <bpmn:sequenceFlow id="Flow_1" sourceRef="Start_Apply" targetRef="Task_Create" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Create" targetRef="Task_Review" />
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_Review" targetRef="Gateway_Judge" />
    <bpmn:sequenceFlow id="Flow_Pass" name="承認" sourceRef="Gateway_Judge" targetRef="Task_Process" />
    <bpmn:sequenceFlow id="Flow_Reject" name="差戻し" sourceRef="Gateway_Judge" targetRef="Task_Fix" />
    <bpmn:sequenceFlow id="Flow_Remake" sourceRef="Task_Fix" targetRef="Task_Create" />
    <bpmn:sequenceFlow id="Flow_End" sourceRef="Task_Process" targetRef="End_Approved" />
  </bpmn:process>

  <bpmndi:BPMNDiagram id="BPMNDiagram_Approval">
    <bpmndi:BPMNPlane id="BPMNPlane_Approval" bpmnElement="Collaboration_Approval">
      <bpmndi:BPMNShape id="Participant_Org_di" bpmnElement="Participant_Org" isHorizontal="true">
        <dc:Bounds x="120" y="80" width="860" height="420" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_Admin_di" bpmnElement="Lane_Admin" isHorizontal="true">
        <dc:Bounds x="150" y="360" width="830" height="140" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_Manager_di" bpmnElement="Lane_Manager" isHorizontal="true">
        <dc:Bounds x="150" y="220" width="830" height="140" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_Applicant_di" bpmnElement="Lane_Applicant" isHorizontal="true">
        <dc:Bounds x="150" y="80" width="830" height="140" />
      </bpmndi:BPMNShape>

      <bpmndi:BPMNShape id="Start_Apply_di" bpmnElement="Start_Apply">
        <dc:Bounds x="202" y="132" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="198" y="175" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Create_di" bpmnElement="Task_Create">
        <dc:Bounds x="290" y="110" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Review_di" bpmnElement="Task_Review">
        <dc:Bounds x="440" y="250" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Judge_di" bpmnElement="Gateway_Judge" isMarkerVisible="true">
        <dc:Bounds x="615" y="265" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="675" y="283" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Fix_di" bpmnElement="Task_Fix">
        <dc:Bounds x="580" y="110" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Process_di" bpmnElement="Task_Process">
        <dc:Bounds x="720" y="390" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="End_Approved_di" bpmnElement="End_Approved">
        <dc:Bounds x="892" y="412" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="888" y="455" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>

      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="238" y="150" />
        <di:waypoint x="290" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="410" y="150" />
        <di:waypoint x="425" y="150" />
        <di:waypoint x="425" y="290" />
        <di:waypoint x="440" y="290" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="560" y="290" />
        <di:waypoint x="615" y="290" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Pass_di" bpmnElement="Flow_Pass">
        <di:waypoint x="640" y="315" />
        <di:waypoint x="640" y="430" />
        <di:waypoint x="720" y="430" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="648" y="360" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Reject_di" bpmnElement="Flow_Reject">
        <di:waypoint x="640" y="265" />
        <di:waypoint x="640" y="190" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="645" y="225" width="34" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Remake_di" bpmnElement="Flow_Remake">
        <di:waypoint x="580" y="150" />
        <di:waypoint x="410" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_End_di" bpmnElement="Flow_End">
        <di:waypoint x="840" y="430" />
        <di:waypoint x="892" y="430" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
  },

  incident: {
    id: "incident",
    name: "障害・インシデント対応フロー（2レーン）",
    description: "「一次受付」「技術対応」の2レーンによる障害発生時の初動・エスカレーションフローです。",
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_Incident" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:collaboration id="Collaboration_Incident">
    <bpmn:participant id="Participant_Incident" name="インシデント対応" processRef="Process_Incident" />
  </bpmn:collaboration>
  <bpmn:process id="Process_Incident" isExecutable="false">
    <bpmn:laneSet id="LaneSet_Inc">
      <bpmn:lane id="Lane_Triage" name="一次受付 / オペレータ">
        <bpmn:flowNodeRef>Start_Alert</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_Triage</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_Severity</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_Notify</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>End_Resolved</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_Tech" name="技術担当 / SRE">
        <bpmn:flowNodeRef>Task_Investigate</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_Recovery</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>

    <bpmn:startEvent id="Start_Alert" name="アラート検知">
      <bpmn:outgoing>Flow_Inc_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_Triage" name="初動切り分け">
      <bpmn:incoming>Flow_Inc_1</bpmn:incoming>
      <bpmn:outgoing>Flow_Inc_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:exclusiveGateway id="Gateway_Severity" name="自チームで対応可能？">
      <bpmn:incoming>Flow_Inc_2</bpmn:incoming>
      <bpmn:outgoing>Flow_Self</bpmn:outgoing>
      <bpmn:outgoing>Flow_Escalate</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:task id="Task_Investigate" name="詳細原因調査">
      <bpmn:incoming>Flow_Escalate</bpmn:incoming>
      <bpmn:outgoing>Flow_Inc_3</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_Recovery" name="復旧作業・恒久対策">
      <bpmn:incoming>Flow_Inc_3</bpmn:incoming>
      <bpmn:outgoing>Flow_To_Notify</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_Notify" name="関係者連絡・事後報告">
      <bpmn:incoming>Flow_Self</bpmn:incoming>
      <bpmn:incoming>Flow_To_Notify</bpmn:incoming>
      <bpmn:outgoing>Flow_Finish</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="End_Resolved" name="インシデント解決">
      <bpmn:incoming>Flow_Finish</bpmn:incoming>
    </bpmn:endEvent>

    <bpmn:sequenceFlow id="Flow_Inc_1" sourceRef="Start_Alert" targetRef="Task_Triage" />
    <bpmn:sequenceFlow id="Flow_Inc_2" sourceRef="Task_Triage" targetRef="Gateway_Severity" />
    <bpmn:sequenceFlow id="Flow_Self" name="可能" sourceRef="Gateway_Severity" targetRef="Task_Notify" />
    <bpmn:sequenceFlow id="Flow_Escalate" name="要エスカレーション" sourceRef="Gateway_Severity" targetRef="Task_Investigate" />
    <bpmn:sequenceFlow id="Flow_Inc_3" sourceRef="Task_Investigate" targetRef="Task_Recovery" />
    <bpmn:sequenceFlow id="Flow_To_Notify" sourceRef="Task_Recovery" targetRef="Task_Notify" />
    <bpmn:sequenceFlow id="Flow_Finish" sourceRef="Task_Notify" targetRef="End_Resolved" />
  </bpmn:process>

  <bpmndi:BPMNDiagram id="BPMNDiagram_Incident">
    <bpmndi:BPMNPlane id="BPMNPlane_Incident" bpmnElement="Collaboration_Incident">
      <bpmndi:BPMNShape id="Participant_Incident_di" bpmnElement="Participant_Incident" isHorizontal="true">
        <dc:Bounds x="120" y="80" width="860" height="320" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_Tech_di" bpmnElement="Lane_Tech" isHorizontal="true">
        <dc:Bounds x="150" y="240" width="830" height="160" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_Triage_di" bpmnElement="Lane_Triage" isHorizontal="true">
        <dc:Bounds x="150" y="80" width="830" height="160" />
      </bpmndi:BPMNShape>

      <bpmndi:BPMNShape id="Start_Alert_di" bpmnElement="Start_Alert">
        <dc:Bounds x="202" y="142" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="187" y="185" width="67" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Triage_di" bpmnElement="Task_Triage">
        <dc:Bounds x="290" y="120" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Severity_di" bpmnElement="Gateway_Severity" isMarkerVisible="true">
        <dc:Bounds x="465" y="135" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="448" y="105" width="85" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Investigate_di" bpmnElement="Task_Investigate">
        <dc:Bounds x="430" y="280" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Recovery_di" bpmnElement="Task_Recovery">
        <dc:Bounds x="590" y="280" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Notify_di" bpmnElement="Task_Notify">
        <dc:Bounds x="690" y="120" width="130" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="End_Resolved_di" bpmnElement="End_Resolved">
        <dc:Bounds x="872" y="142" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="848" y="185" width="85" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>

      <bpmndi:BPMNEdge id="Flow_Inc_1_di" bpmnElement="Flow_Inc_1">
        <di:waypoint x="238" y="160" />
        <di:waypoint x="290" y="160" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Inc_2_di" bpmnElement="Flow_Inc_2">
        <di:waypoint x="410" y="160" />
        <di:waypoint x="465" y="160" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Self_di" bpmnElement="Flow_Self">
        <di:waypoint x="515" y="160" />
        <di:waypoint x="690" y="160" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="590" y="142" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Escalate_di" bpmnElement="Flow_Escalate">
        <di:waypoint x="490" y="185" />
        <di:waypoint x="490" y="280" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="495" y="225" width="89" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Inc_3_di" bpmnElement="Flow_Inc_3">
        <di:waypoint x="550" y="320" />
        <di:waypoint x="590" y="320" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_To_Notify_di" bpmnElement="Flow_To_Notify">
        <di:waypoint x="710" y="320" />
        <di:waypoint x="755" y="320" />
        <di:waypoint x="755" y="200" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Finish_di" bpmnElement="Flow_Finish">
        <di:waypoint x="820" y="160" />
        <di:waypoint x="872" y="160" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
  },

  practice_cert: {
    id: "practice_cert",
    name: "【演習課題】証明書オンライン申請受付フロー",
    description: "30分クイックコース用演習：未完成のフローに不備分岐を追加して完成させましょう。",
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_PracticeCert" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:collaboration id="Collaboration_PracticeCert">
    <bpmn:participant id="Participant_Cert" name="証明書オンライン申請受付" processRef="Process_PracticeCert" />
    <bpmn:textAnnotation id="Annotation_Mission">
      <bpmn:text>【演習ミッション】
1. ひし形（ゲートウェイ）から上に矢印を引く
2. 「窓口担当課」に［不備連絡を送信する］タスクを配置
3. 矢印に「不備あり」と条件名を入力して完成させよう！</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:association id="Assoc_Mission" sourceRef="Gateway_Defect" targetRef="Annotation_Mission" />
  </bpmn:collaboration>
  <bpmn:process id="Process_PracticeCert" isExecutable="false">
    <bpmn:laneSet id="LaneSet_Cert">
      <bpmn:lane id="Lane_Citizen" name="住民（申請者）">
        <bpmn:flowNodeRef>Start_Citizen</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_Staff" name="窓口担当課">
        <bpmn:flowNodeRef>Task_Check</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_Defect</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_Issue</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>End_Success</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:startEvent id="Start_Citizen" name="証明書申請を送信">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_Check" name="申請内容を確認する">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:exclusiveGateway id="Gateway_Defect" name="不備判定">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_Pass</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:task id="Task_Issue" name="証明書を発行・発送する">
      <bpmn:incoming>Flow_Pass</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="End_Success" name="交付完了">
      <bpmn:incoming>Flow_3</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="Start_Citizen" targetRef="Task_Check" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Check" targetRef="Gateway_Defect" />
    <bpmn:sequenceFlow id="Flow_Pass" name="不備なし" sourceRef="Gateway_Defect" targetRef="Task_Issue" />
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_Issue" targetRef="End_Success" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_Cert">
    <bpmndi:BPMNPlane id="BPMNPlane_Cert" bpmnElement="Collaboration_PracticeCert">
      <bpmndi:BPMNShape id="Participant_Cert_di" bpmnElement="Participant_Cert" isHorizontal="true">
        <dc:Bounds x="100" y="60" width="820" height="360" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_Staff_di" bpmnElement="Lane_Staff" isHorizontal="true">
        <dc:Bounds x="130" y="220" width="790" height="200" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_Citizen_di" bpmnElement="Lane_Citizen" isHorizontal="true">
        <dc:Bounds x="130" y="60" width="790" height="160" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Start_Citizen_di" bpmnElement="Start_Citizen">
        <dc:Bounds x="182" y="112" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="160" y="155" width="80" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Check_di" bpmnElement="Task_Check">
        <dc:Bounds x="260" y="270" width="120" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Defect_di" bpmnElement="Gateway_Defect" isMarkerVisible="true">
        <dc:Bounds x="435" y="285" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="438" y="342" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Issue_di" bpmnElement="Task_Issue">
        <dc:Bounds x="550" y="270" width="130" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="End_Success_di" bpmnElement="End_Success">
        <dc:Bounds x="742" y="292" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="738" y="335" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Annotation_Mission_di" bpmnElement="Annotation_Mission">
        <dc:Bounds x="350" y="80" width="320" height="90" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="218" y="130" />
        <di:waypoint x="239" y="130" />
        <di:waypoint x="239" y="310" />
        <di:waypoint x="260" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="380" y="310" />
        <di:waypoint x="435" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_Pass_di" bpmnElement="Flow_Pass">
        <di:waypoint x="485" y="310" />
        <di:waypoint x="550" y="310" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="495" y="292" width="45" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="680" y="310" />
        <di:waypoint x="742" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Assoc_Mission_di" bpmnElement="Assoc_Mission">
        <di:waypoint x="454" y="291" />
        <di:waypoint x="420" y="170" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
  }
};


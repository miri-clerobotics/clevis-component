'use client';

import React, { useState, useCallback, useRef, useEffect } from "react";

// ── SVG paths ─────────────────────────────────────────────────────────────────
const P = {
  play:      "M0.812159 0C0.954693 0 1.09479 0.0374038 1.21824 0.108657L12.5884 6.67091C12.7133 6.74171 12.8174 6.8443 12.8898 6.96833C12.9621 7.09246 13 7.23392 13 7.37758C13 7.52124 12.9621 7.6627 12.8898 7.78683C12.8174 7.91085 12.7133 8.01346 12.5884 8.08425L1.21824 14.6465C1.09479 14.7178 0.95469 14.7552 0.812159 14.7552C0.669625 14.7552 0.529526 14.7178 0.406083 14.6465C0.282144 14.575 0.17918 14.4716 0.10787 14.3475C0.036645 14.2235 -0.000549024 14.0828 6.18592e-06 13.9398V0.815325C-0.000551788 0.672314 0.0366467 0.531675 0.10787 0.407663C0.17918 0.283584 0.282144 0.180211 0.406083 0.108657C0.529528 0.0373989 0.669622 2.20653e-06 0.812159 0Z",
  clock:    "M6.66667 0C5.34813 0 4.0592 0.390993 2.96287 1.12354C1.86654 1.85608 1.01206 2.89727 0.507473 4.11544C0.00288855 5.33362 -0.129134 6.67406 0.128101 7.96727C0.385336 9.26048 1.02027 10.4484 1.95262 11.3807C2.88497 12.3131 4.07286 12.948 5.36607 13.2052C6.65927 13.4625 7.99972 13.3304 9.21789 12.8259C10.4361 12.3213 11.4773 11.4668 12.2098 10.3705C12.9423 9.27414 13.3333 7.98521 13.3333 6.66667C13.3333 5.79119 13.1609 4.92428 12.8259 4.11544C12.4908 3.30661 11.9998 2.57168 11.3807 1.95262C10.7617 1.33356 10.0267 0.842501 9.21789 0.50747C8.40906 0.172438 7.54215 0 6.66667 0V0ZM6.66667 12C5.61184 12 4.58069 11.6872 3.70363 11.1012C2.82657 10.5151 2.14298 9.68218 1.73931 8.70765C1.33564 7.73311 1.23003 6.66075 1.43581 5.62619C1.6416 4.59162 2.14955 3.64131 2.89543 2.89543C3.64131 2.14955 4.59162 1.6416 5.62619 1.43581C6.66075 1.23002 7.73311 1.33564 8.70765 1.73931C9.68219 2.14298 10.5151 2.82656 11.1012 3.70363C11.6872 4.58069 12 5.61183 12 6.66667C12 8.08115 11.4381 9.43771 10.4379 10.4379C9.43771 11.4381 8.08116 12 6.66667 12V12ZM8.73334 7.08667L7.33334 6.28V3.33333C7.33334 3.15652 7.2631 2.98695 7.13807 2.86193C7.01305 2.7369 6.84348 2.66667 6.66667 2.66667C6.48986 2.66667 6.32029 2.7369 6.19527 2.86193C6.07024 2.98695 6 3.15652 6 3.33333V6.66667C6 6.66667 6 6.72 6 6.74667C6.00395 6.7926 6.0152 6.83761 6.03334 6.88C6.04707 6.91955 6.06494 6.95754 6.08667 6.99333C6.10491 7.03123 6.12727 7.067 6.15334 7.1L6.26 7.18667L6.32 7.24667L8.05334 8.24667C8.15494 8.30425 8.26989 8.33414 8.38667 8.33333C8.53428 8.33437 8.67806 8.28638 8.79546 8.19689C8.91286 8.10741 8.99724 7.98149 9.03537 7.83889C9.0735 7.69628 9.06322 7.54505 9.00615 7.40892C8.94907 7.27278 8.84843 7.15944 8.72 7.08667H8.73334Z",
  camera:   "M4.95709 12.5166L7.79633 7.6L10.0333 11.4747C8.95616 12.2516 7.66136 12.6687 6.33333 12.6667C5.86086 12.6667 5.40043 12.6147 4.95709 12.5166ZM3.73033 12.1093C2.91667 11.7414 2.18973 11.206 1.59695 10.5381C1.00416 9.87026 0.558849 9.08491 0.290066 8.23333H5.96789L3.73033 12.1093ZM0.0316666 6.96666C0.0105555 6.75851 0 6.5474 0 6.33333C0 4.68223 0.632066 3.1787 1.66693 2.05137L4.5049 6.96666H0.0316666ZM2.63403 1.19257C3.71087 0.415591 5.00544 -0.00174796 6.33333 5.50283e-06C6.80579 5.50283e-06 7.26623 0.0519388 7.70956 0.150105L4.87033 5.06667L2.63403 1.19257ZM8.93632 0.557338C9.74999 0.925298 10.4769 1.46068 11.0697 2.12854C11.6625 2.79641 12.1078 3.58175 12.3766 4.43333H6.69876L8.93632 0.557338ZM12.635 5.7C12.6561 5.90815 12.6667 6.11927 12.6667 6.33333C12.6691 7.91946 12.074 9.44831 10.9997 10.6153L8.16176 5.7H12.635Z",
  fold:     "M3.52939 4.47606C3.59137 4.53855 3.6651 4.58814 3.74634 4.62199C3.82758 4.65583 3.91472 4.67326 4.00273 4.67326C4.09074 4.67326 4.17787 4.65583 4.25911 4.62199C4.34035 4.58814 4.41409 4.53855 4.47606 4.47606L7.80939 1.14273C7.93493 1.01719 8.00546 0.846929 8.00546 0.669395C8.00546 0.49186 7.93493 0.321597 7.80939 0.196061C7.68386 0.0705253 7.5136 0 7.33606 0C7.15853 0 6.98826 0.0705253 6.86273 0.196061L4.00273 3.06273L1.14273 0.196061C1.01719 0.0705253 0.846929 0 0.669395 0C0.49186 0 0.321597 0.0705253 0.196061 0.196061C0.0705253 0.321597 0 0.49186 0 0.669395C0 0.846929 0.0705253 1.01719 0.196061 1.14273L3.52939 4.47606ZM4.47606 7.5294C4.41409 7.46691 4.34035 7.41731 4.25911 7.38347C4.17787 7.34962 4.09074 7.3322 4.00273 7.3322C3.91472 7.3322 3.82758 7.34962 3.74634 7.38347C3.6651 7.41731 3.59137 7.46691 3.52939 7.5294L0.196061 10.8627C0.0705253 10.9883 0 11.1585 0 11.3361C0 11.5136 0.0705253 11.6839 0.196061 11.8094C0.321597 11.9349 0.49186 12.0055 0.669395 12.0055C0.846929 12.0055 1.01719 11.9349 1.14273 11.8094L4.00273 8.94273L6.86273 11.8094C6.9247 11.8719 6.99844 11.9215 7.07968 11.9553C7.16092 11.9892 7.24805 12.0066 7.33606 12.0066C7.42407 12.0066 7.51121 11.9892 7.59245 11.9553C7.67369 11.9215 7.74742 11.8719 7.80939 11.8094C7.87188 11.7474 7.92148 11.6737 7.95532 11.5924C7.98917 11.5112 8.00659 11.4241 8.00659 11.3361C8.00659 11.2481 7.98917 11.1609 7.95532 11.0797C7.92148 10.9984 7.87188 10.9247 7.80939 10.8627L4.47606 7.5294Z",
  unfold:   "M6.86273 7.53053L4.00273 10.3972L1.14273 7.53053C1.01719 7.405 0.846929 7.33447 0.669395 7.33447C0.49186 7.33447 0.321597 7.405 0.196061 7.53053C0.0705253 7.65607 0 7.82633 0 8.00387C0 8.1814 0.0705253 8.35166 0.196061 8.4772L3.52939 11.8105C3.59137 11.873 3.6651 11.9226 3.74634 11.9565C3.82758 11.9903 3.91472 12.0077 4.00273 12.0077C4.09074 12.0077 4.17787 11.9903 4.25911 11.9565C4.34035 11.9226 4.41409 11.873 4.47606 11.8105L7.80939 8.4772C7.87155 8.41504 7.92086 8.34125 7.9545 8.26003C7.98814 8.17882 8.00546 8.09177 8.00546 8.00387C8.00546 7.91596 7.98814 7.82891 7.9545 7.7477C7.92086 7.66648 7.87155 7.59269 7.80939 7.53053C7.74724 7.46837 7.67344 7.41907 7.59223 7.38543C7.51101 7.35179 7.42397 7.33447 7.33606 7.33447C7.24816 7.33447 7.16111 7.35179 7.0799 7.38543C6.99868 7.41907 6.92489 7.46837 6.86273 7.53053V7.53053ZM1.14273 4.4772L4.00273 1.61053L6.86273 4.4772C6.9247 4.53968 6.99844 4.58928 7.07968 4.62313C7.16092 4.65697 7.24805 4.6744 7.33606 4.6744C7.42407 4.6744 7.51121 4.65697 7.59245 4.62313C7.67369 4.58928 7.74742 4.53968 7.80939 4.4772C7.87188 4.41522 7.92148 4.34149 7.95532 4.26025C7.98917 4.17901 8.00659 4.09187 8.00659 4.00387C8.00659 3.91586 7.98917 3.82872 7.95532 3.74748C7.92148 3.66624 7.87188 3.59251 7.80939 3.53053L4.47606 0.197199C4.41409 0.134713 4.34035 0.0851171 4.25911 0.0512713C4.17787 0.0174255 4.09074 0 4.00273 0C3.91472 0 3.82758 0.0174255 3.74634 0.0512713C3.6651 0.0851171 3.59137 0.134713 3.52939 0.197199L0.196061 3.53053C0.0705253 3.65607 0 3.82633 0 4.00387C0 4.1814 0.0705253 4.35166 0.196061 4.4772C0.321597 4.60273 0.49186 4.67326 0.669395 4.67326C0.846929 4.67326 1.01719 4.60273 1.14273 4.4772Z",
  trash:    "M8.87333 14H3.12667C2.31333 14 1.67333 13.3667 1.62667 12.5267L1.03333 3H0.5C0.226667 3 0 2.77333 0 2.5C0 2.22667 0.226667 2 0.5 2H1.49333C1.49333 2 1.49333 2 1.5 2H3.49333V1.25333C3.49333 1.08667 3.52667 0.926667 3.58667 0.773333C3.64667 0.62 3.74 0.486667 3.85333 0.366667C3.97333 0.246667 4.10667 0.16 4.26 0.0933333C4.42667 0.0333333 4.58667 0 4.74667 0H7.24667C7.4 0 7.57333 0.0333333 7.72667 0.0933333C7.88 0.16 8.02 0.246667 8.13333 0.366667C8.25333 0.486667 8.34 0.62 8.40667 0.773333C8.46667 0.92 8.5 1.08 8.5 1.24667V1.99333H11.5C11.7733 1.99333 12 2.22 12 2.49333C12 2.76667 11.7733 2.99333 11.5 2.99333H10.9667L10.3733 12.5267C10.32 13.38 9.69333 13.9933 8.87333 13.9933V14ZM2.03333 3L2.62667 12.4667C2.64 12.7867 2.84667 13 3.12667 13H8.87333C9.15333 13 9.35333 12.7867 9.37333 12.4667L9.96667 3H2.03333ZM4.5 2H7.5V1.25333C7.5 1.22 7.5 1.18667 7.48 1.16C7.46667 1.12667 7.44667 1.1 7.42667 1.08C7.40667 1.06 7.37333 1.04 7.34667 1.02667C7.32 1.01333 7.28667 1.00667 7.25333 1.00667H4.75333C4.71333 1.02 4.68667 1.00667 4.65333 1.02667C4.62667 1.04 4.59333 1.06 4.57333 1.08C4.55333 1.1 4.53333 1.13333 4.52 1.16C4.50667 1.19333 4.5 1.22 4.5 1.25333V2.00667V2ZM8 12H7.98C7.70667 11.9867 7.48667 11.76 7.5 11.48L7.75333 4.48C7.76 4.20667 8.02667 3.98667 8.27333 4C8.54667 4.00667 8.76667 4.24 8.75333 4.52L8.5 11.52C8.49333 11.7933 8.26667 12 8 12ZM4 12C3.73333 12 3.51333 11.7867 3.5 11.52L3.24667 4.52C3.24 4.24667 3.45333 4.01333 3.72667 4C4.01333 3.98667 4.23333 4.20667 4.24667 4.48L4.5 11.48C4.50667 11.7533 4.29333 11.9867 4.02 12H4ZM6 12C5.72667 12 5.5 11.7733 5.5 11.5V4.5C5.5 4.22667 5.72667 4 6 4C6.27333 4 6.5 4.22667 6.5 4.5V11.5C6.5 11.7733 6.27333 12 6 12Z",
  more:      "M6 0C5.73629 0 5.47851 0.0781987 5.25924 0.224707C5.03998 0.371216 4.86908 0.579454 4.76816 0.823089C4.66724 1.06672 4.64084 1.33481 4.69229 1.59345C4.74373 1.8521 4.87072 2.08967 5.05719 2.27614C5.24366 2.46261 5.48124 2.5896 5.73988 2.64105C5.99852 2.69249 6.26661 2.66609 6.51025 2.56517C6.75388 2.46426 6.96212 2.29336 7.10863 2.07409C7.25514 1.85483 7.33333 1.59704 7.33333 1.33333C7.33333 0.979711 7.19286 0.640573 6.94281 0.390525C6.69276 0.140476 6.35362 0 6 0ZM1.33333 0C1.06963 0 0.811839 0.0781987 0.592574 0.224707C0.373308 0.371216 0.202411 0.579454 0.101495 0.823089C0.000577709 1.06672 -0.0258267 1.33481 0.0256202 1.59345C0.0770672 1.8521 0.204055 2.08967 0.390525 2.27614C0.576995 2.46261 0.814572 2.5896 1.07321 2.64105C1.33185 2.69249 1.59994 2.66609 1.84358 2.56517C2.08721 2.46426 2.29545 2.29336 2.44196 2.07409C2.58847 1.85483 2.66667 1.59704 2.66667 1.33333C2.66667 0.979711 2.52619 0.640573 2.27614 0.390525C2.02609 0.140476 1.68696 0 1.33333 0ZM10.6667 0C10.403 0 10.1452 0.0781987 9.92591 0.224707C9.70664 0.371216 9.53574 0.579454 9.43483 0.823089C9.33391 1.06672 9.30751 1.33481 9.35895 1.59345C9.4104 1.8521 9.53739 2.08967 9.72386 2.27614C9.91033 2.46261 10.1479 2.5896 10.4065 2.64105C10.6652 2.69249 10.9333 2.66609 11.1769 2.56517C11.4205 2.46426 11.6288 2.29336 11.7753 2.07409C11.9218 1.85483 12 1.59704 12 1.33333C12 0.979711 11.8595 0.640573 11.6095 0.390525C11.3594 0.140476 11.0203 0 10.6667 0Z",
  flag:     "M0.989583 12H0V0.679554L0.122135 0.554196C0.211979 0.461518 0.749479 0 2.5 0C3.46901 0 4.55286 0.394018 5.50911 0.741429C6.27917 1.02134 7.00651 1.28571 7.5 1.28571C8.61536 1.28571 9.39375 0.904018 9.40104 0.9L10 0.601607V7.55063L9.76979 7.66902C9.73203 7.6875 8.83307 8.14286 7.5 8.14286C6.87135 8.14286 6.08385 7.95161 5.25026 7.74884C4.31328 7.52116 3.34453 7.28571 2.5 7.28571C1.53984 7.28571 1.20469 7.43518 0.989583 7.52973V12Z",
  tipOuter: "M8 1.28516L1.71387 6L8 10.7139V12L0 6L8 0V1.28516Z",
  tipInner: "M8 10.7139L1.71387 6L8 1.28516V10.7139Z",
};

// ── Types ─────────────────────────────────────────────────────────────────────
type LabelState = "default" | "hover" | "longHover" | "clicked" | "dragList" | "dragFollowing";
type CircleState = "default" | "hover" | "pressed";

interface PortItem { id: number; type: string; name: string; green?: boolean; }
interface ItemState { label: LabelState; circle: CircleState; }

// ── Port data ─────────────────────────────────────────────────────────────────
const INITIAL_LEFT: PortItem[] = [
  { id: 0, type: "Port Type Group", name: "Port name" },
  { id: 1, type: "Port Type Group", name: "Port name" },
  { id: 2, type: "Port Type Group", name: "Port name" },
  { id: 3, type: "Port Type Group", name: "Port name" },
  { id: 4, type: "Port Type Group", name: "Port name" },
  { id: 5, type: "Port Type Group", name: "Port name" },
];

const INITIAL_RIGHT: PortItem[] = [
  { id: 10, type: "Nullable <Boolean>", name: "Executed flow port", green: true },
  { id: 11, type: "Nullable <Boolean>", name: "Error flow port",    green: true },
  { id: 12, type: "Port Type Group",    name: "Port name",          green: false },
  { id: 13, type: "Port Type Group",    name: "Port name",          green: false },
  { id: 14, type: "Port Type Group",    name: "Port name",          green: false },
  { id: 15, type: "Port Type Group",    name: "Port name",          green: false },
];

const INIT_STATE = (): ItemState => ({ label: "default", circle: "default" });

// ── Port circle ───────────────────────────────────────────────────────────────
function PortCircle({
  side,
  state,
  green,
  labelClicked,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
}: {
  side: "left" | "right";
  state: CircleState;
  green?: boolean;
  labelClicked?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: () => void;
}) {
  const isLeft = side === "left";

  if (state === "default") {
    const fill   = labelClicked ? "#E0E0E0" : "white";
    const stroke = labelClicked ? "#999999" : (green ? "#16B375" : "#666666");
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignSelf: "stretch",
          flexShrink: 0,
          paddingLeft: isLeft ? 3 : 7,
          paddingRight: isLeft ? 7 : 3,
          cursor: "crosshair",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5.5" fill={fill} stroke={stroke} />
        </svg>
      </div>
    );
  }

  const innerFill = state === "pressed" ? "#335CFF" : "white";
  const innerStroke = state === "pressed" ? "white" : "#666666";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        flexShrink: 0,
        paddingLeft: isLeft ? 0 : 4,
        paddingRight: isLeft ? 4 : 0,
        cursor: "crosshair",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect width="18" height="18" rx="9" fill="#BCCFFF" />
        <circle cx="9" cy="9" r="5.5" fill={innerFill} stroke={innerStroke} />
      </svg>
    </div>
  );
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 34,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(51,51,51,0.9)",
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: "8px 12px",
          minWidth: 64,
          marginBottom: -1,
        }}
      >
        <span style={{ fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 14, lineHeight: "20px", color: "#f9f9f9" }}>
          Detail
        </span>
      </div>
      <div style={{ width: 12, height: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" style={{ transform: "rotate(-90deg) scaleY(-1)" }}>
          <path d={P.tipOuter} fill="#CCCCCC" />
          <path d={P.tipInner} fill="rgba(51,51,51,0.9)" />
        </svg>
      </div>
    </div>
  );
}

// ── Left port label ───────────────────────────────────────────────────────────
function PortLabelLeft({
  state,
  portType,
  portName,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
}: {
  state: LabelState;
  portType: string;
  portName: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}) {
  if (state === "dragFollowing") {
    return (
      <div
        style={{
          width: 201,
          height: 34,
          background: "#335cff",
          borderRadius: 4,
          paddingLeft: 12,
          paddingRight: 8,
          paddingTop: 4,
          paddingBottom: 4,
          opacity: 0.8,
          flexShrink: 0,
          cursor: "grabbing",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 12, lineHeight: "16px", color: "#f9f9f9" }}>
          {portName}
        </span>
      </div>
    );
  }

  const bgMap: Record<LabelState, string> = {
    default:       "#f9f9f9",
    hover:         "#f2f2f2",
    longHover:     "#f2f2f2",
    clicked:       "#e0e0e0",
    dragList:      "#e0e0e0",
    dragFollowing: "#335cff",
  };
  const bg = bgMap[state];
  const opacity = state === "dragList" ? 0.3 : 1;
  const cursor = state === "dragList" ? "default" : "grab";
  const showBlueBorder = state === "clicked" || state === "dragList";

  return (
    <div
      style={{
        width: 201,
        background: bg,
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
        opacity,
        flexShrink: 0,
        position: "relative",
        cursor,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
    >
      {showBlueBorder && (
        <div aria-hidden style={{ position: "absolute", inset: 0, border: "1px solid #335cff", borderRadius: 4, pointerEvents: "none" }} />
      )}
      <span
        style={{
          display: "block",
          fontFamily: "'Pretendard:Medium',sans-serif",
          fontSize: 8,
          lineHeight: "10px",
          color: "#999",
          textAlign: "left",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {portType}
      </span>
      <span
        style={{
          display: "block",
          fontFamily: "'Pretendard:Medium',sans-serif",
          fontSize: 14,
          lineHeight: "20px",
          color: "#666",
          textAlign: "left",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {portName}
      </span>
      {state === "longHover" && <Tooltip />}
    </div>
  );
}

// ── Right port label ──────────────────────────────────────────────────────────
function PortLabelRight({
  state,
  portType,
  portName,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
}: {
  state: LabelState;
  portType: string;
  portName: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}) {
  const bgMap: Record<LabelState, string> = {
    default:       "#f9f9f9",
    hover:         "#f2f2f2",
    longHover:     "#f2f2f2",
    clicked:       "#e0e0e0",
    dragList:      "#e0e0e0",
    dragFollowing: "#335cff",
  };
  const bg = bgMap[state];
  const opacity = state === "dragList" ? 0.3 : 1;
  const showBlueBorderR = state === "clicked" || state === "dragList";

  return (
    <div
      style={{
        flex: "1 0 0",
        minWidth: 1,
        background: bg,
        borderRadius: 4,
        paddingLeft: 8,
        paddingRight: 12,
        paddingTop: 2,
        paddingBottom: 2,
        opacity,
        position: "relative",
        cursor: "grab",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
    >
      {showBlueBorderR && (
        <div aria-hidden style={{ position: "absolute", inset: 0, border: "1px solid #335cff", borderRadius: 4, pointerEvents: "none" }} />
      )}
      <span
        style={{
          display: "block",
          fontFamily: "'Pretendard:Medium',sans-serif",
          fontSize: 8,
          lineHeight: "10px",
          color: "#999",
          textAlign: "right",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {portType}
      </span>
      <span
        style={{
          display: "block",
          fontFamily: "'Pretendard:Medium',sans-serif",
          fontSize: 14,
          lineHeight: "20px",
          color: "#666",
          textAlign: "right",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {portName}
      </span>
      {state === "longHover" && <Tooltip />}
    </div>
  );
}

// ── Port row ──────────────────────────────────────────────────────────────────
function PortRow({
  leftItem, rightItem,
  leftState, rightState,
  leftDragging, rightDragging,
  onLeftStateChange, onRightStateChange,
  onLeftLabelDown, onRightLabelDown,
  rowIndex, onPortSelect,
}: {
  leftItem?: PortItem; rightItem?: PortItem;
  leftState: ItemState; rightState: ItemState;
  leftDragging: boolean; rightDragging: boolean;
  onLeftStateChange: (patch: Partial<ItemState>) => void;
  onRightStateChange: (patch: Partial<ItemState>) => void;
  onLeftLabelDown: (e: React.MouseEvent) => void;
  onRightLabelDown: (e: React.MouseEvent) => void;
  rowIndex: number;
  onPortSelect: (side: "left" | "right", index: number) => void;
}) {
  const leftHoverRef  = useRef<any>();
  const rightHoverRef = useRef<any>();

  useEffect(() => () => { clearTimeout(leftHoverRef.current); clearTimeout(rightHoverRef.current); }, []);

  const leftEnter  = () => { if (leftDragging) return; onLeftStateChange({ label: "hover" }); leftHoverRef.current = setTimeout(() => onLeftStateChange({ label: "longHover" }), 800); };
  const leftLeave  = () => { clearTimeout(leftHoverRef.current); if (leftState.label === "dragList") return; onLeftStateChange({ label: "default" }); };
  const rightEnter = () => { if (rightDragging) return; onRightStateChange({ label: "hover" }); rightHoverRef.current = setTimeout(() => onRightStateChange({ label: "longHover" }), 800); };
  const rightLeave = () => { clearTimeout(rightHoverRef.current); if (rightState.label === "dragList") return; onRightStateChange({ label: "default" }); };

  const handleLeftLabelDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPortSelect("left", rowIndex);
    onLeftLabelDown(e);
  };
  const handleRightLabelDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPortSelect("right", rowIndex);
    onRightLabelDown(e);
  };

  const lce = () => { if (leftState.circle === "default") onLeftStateChange({ circle: "hover" }); };
  const lcl = () => { onLeftStateChange({ circle: "default" }); };
  const lcd = (e: React.MouseEvent) => { e.stopPropagation(); onLeftStateChange({ circle: "pressed" }); };
  const lcu = () => { onLeftStateChange({ circle: "hover" }); };

  const rce = () => { if (rightState.circle === "default") onRightStateChange({ circle: "hover" }); };
  const rcl = () => { onRightStateChange({ circle: "default" }); };
  const rcd = (e: React.MouseEvent) => { e.stopPropagation(); onRightStateChange({ circle: "pressed" }); };
  const rcu = () => { onRightStateChange({ circle: "hover" }); };

  const leftClicked  = (leftDragging  ? false : leftState.label  === "clicked");
  const rightClicked = (rightDragging ? false : rightState.label === "clicked");

  return (
    <div style={{ width: 458, display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "stretch", flexShrink: 0 }}>
        <PortCircle side="left" state={leftDragging ? "default" : leftState.circle}
          labelClicked={leftClicked}
          onMouseEnter={lce} onMouseLeave={lcl} onMouseDown={lcd} onMouseUp={lcu} />
        {leftItem ? (
          <PortLabelLeft
            state={leftDragging ? "dragList" : leftState.label}
            portType={leftItem.type} portName={leftItem.name}
            onMouseEnter={leftEnter} onMouseLeave={leftLeave} onMouseDown={handleLeftLabelDown}
          />
        ) : (
          <div style={{ width: 201, height: 34, background: "#f9f9f9", borderRadius: 4, padding: "2px 8px 2px 12px" }} />
        )}
      </div>

      <div style={{ width: 223, display: "flex", alignItems: "stretch", flexShrink: 0 }}>
        {rightItem ? (
          <PortLabelRight
            state={rightDragging ? "dragList" : rightState.label}
            portType={rightItem.type} portName={rightItem.name}
            onMouseEnter={rightEnter} onMouseLeave={rightLeave} onMouseDown={handleRightLabelDown}
          />
        ) : (
          <div style={{ flex: 1, height: 34, background: "#f9f9f9", borderRadius: 4 }} />
        )}
        <PortCircle side="right" state={rightDragging ? "default" : rightState.circle}
          green={rightItem?.green}
          labelClicked={rightClicked}
          onMouseEnter={rce} onMouseLeave={rcl} onMouseDown={rcd} onMouseUp={rcu} />
      </div>
    </div>
  );
}

// ── Node head ─────────────────────────────────────────────────────────────────
function NodeHead({ onDoubleClick }: { onDoubleClick?: () => void }) {
  return (
    <div
      className="bg-[#f2f2f2] content-stretch flex flex-col gap-[12px] items-start overflow-clip pb-[8px] pt-[16px] relative rounded-[4px] shrink-0 w-full"
      onDoubleClick={(e) => { e.stopPropagation(); onDoubleClick?.(); }}
      style={{ cursor: "default" }}
    >
      <div className="flex items-center gap-[8px] px-[16px] w-full">
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "'Pretendard:Bold',sans-serif", fontWeight: "bold", fontSize: 14, lineHeight: "20px", color: "#666" }}>
            Node type
          </span>
          <span style={{ fontFamily: "'Pretendard:Bold',sans-serif", fontWeight: "bold", fontSize: 20, lineHeight: "28px", color: "#333" }}>
            Node Name (1)
          </span>
        </div>
        <div className="h-[48px] w-[72px] bg-[#f2f2f2] border border-[#e0e0e0] rounded-[8px] flex items-center justify-center shrink-0">
          <div style={{ width: 24, height: 24, position: "relative", overflow: "clip" }}>
            <div style={{
              position: "absolute",
              bottom: "19.26%",
              top: "19.26%",
              left: "calc(50% + 1px)",
              transform: "translateX(-50%)",
              aspectRatio: "13.573 / 15.406",
            }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 13 14.7552">
                <path d={P.play} fill="#CCCCCC" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-[16px] w-full">
        <div className="bg-white border border-[#ebedef] rounded-[100px] h-[20px] pl-[6px] pr-[8px] flex items-center gap-[2px]">
          <div style={{ width: 16, height: 16, position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" viewBox="0 0 12.6667 12.6667">
              <path d={P.camera} fill="#6F7E88" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 12, lineHeight: "16px", color: "#666", whiteSpace: "nowrap" }}>
            CoPick 3D 250S
          </span>
        </div>
        <div className="flex items-center gap-[4px] h-[20px]">
          <span style={{ fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 12, lineHeight: "16px", color: "#999", whiteSpace: "nowrap" }}>
            실행 기록 없음
          </span>
          <div style={{ width: 16, height: 16, position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" viewBox="0 0 13.3333 13.3333">
              <path d={P.clock} fill="#B3B3B3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Toolbar ───────────────────────────────────────────────────────────────────
function Toolbar({
  opacity,
  isCollapsed,
  onFoldToggle,
  onMoreClick,
}: {
  opacity: number;
  isCollapsed: boolean;
  onFoldToggle: () => void;
  onMoreClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className="absolute bg-white flex gap-[8px] items-center px-[8px] py-[4px] right-0 rounded-[32px] top-[-40px]"
      style={{ opacity, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onFoldToggle(); }}
        className="flex items-center p-[4px] rounded-[100px] border-none bg-transparent cursor-pointer hover:bg-[#f0f0f0]"
      >
        <div style={{ width: 16, height: 16, position: "relative", overflow: "hidden" }}>
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            fill="none"
            viewBox={isCollapsed ? "0 0 8.00659 12.0077" : "0 0 8.00659 12.0066"}
          >
            <path d={isCollapsed ? P.unfold : P.fold} fill="#666666" />
          </svg>
        </div>
      </button>
      <div className="bg-[#e0e0e0] h-[16px] w-px" />
      <button
        onClick={(e) => e.stopPropagation()}
        className="flex items-center p-[4px] rounded-[100px] border-none bg-transparent cursor-pointer hover:bg-[#f0f0f0]"
      >
        <div style={{ width: 16, height: 16, position: "relative", overflow: "hidden" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" viewBox="0 0 12 14">
            <path d={P.trash} fill="#666666" />
          </svg>
        </div>
      </button>
      <button
        onClick={onMoreClick}
        className="flex items-center p-[4px] rounded-[100px] border-none bg-transparent cursor-pointer hover:bg-[#f0f0f0]"
      >
        <div style={{ width: 16, height: 16, position: "relative", overflow: "hidden" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" viewBox="0 0 12 2.66667">
            <path d={P.more} fill="#666666" />
          </svg>
        </div>
      </button>
    </div>
  );
}

// ── Context menu ──────────────────────────────────────────────────────────────
function ContextMenu({
  isStartNode,
  onSetStart,
  onUnsetStart,
  onClose,
  x,
  y,
}: {
  isStartNode: boolean;
  onSetStart: () => void;
  onUnsetStart: () => void;
  onClose: () => void;
  x: number;
  y: number;
}) {
  const groups: { label: string; danger?: boolean; onClick: () => void }[][] = [
    [
      { label: "입력 플로우포트 추가하기", onClick: onClose },
      { label: isStartNode ? "시작 노드 해제하기" : "시작 노드로 설정하기", onClick: isStartNode ? onUnsetStart : onSetStart },
    ],
    [
      { label: "노드 이름 변경하기", onClick: onClose },
      { label: "복사하기", onClick: onClose },
    ],
    [
      { label: "노드 삭제하기", danger: true, onClick: onClose },
    ],
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 200,
        background: "#1c1c1c",
        borderRadius: 8,
        boxShadow: "0px 0px 8px 0px rgba(28,28,28,0.24)",
        zIndex: 200,
        overflow: "hidden",
        paddingTop: 4,
        paddingBottom: 4,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {groups.map((group, gi) => (
        <div key={gi}>
          {gi > 0 && <div style={{ height: 1, background: "#666" }} />}
          {group.map((item, ii) => (
            <button
              key={ii}
              onClick={(e) => { e.stopPropagation(); item.onClick(); }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                paddingLeft: 8,
                paddingRight: 4,
                paddingTop: 4,
                paddingBottom: 4,
                fontFamily: "'Pretendard:Regular',sans-serif",
                fontSize: 12,
                lineHeight: "16px",
                color: item.danger ? "#ff4444" : "#f9f9f9",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
type NodeVisualState = "default" | "hover" | "selected" | "selected-hover";
const STATE_LABELS: Record<NodeVisualState, { ko: string; en: string }> = {
  default:          { ko: "기본",                en: "Default" },
  hover:            { ko: "호버",                en: "Hover" },
  selected:         { ko: "선택됨",              en: "Selected" },
  "selected-hover": { ko: "선택됨 + 호버",       en: "Selected + Hover" },
};

export default function App() {
  // 🚀 이 부분이 추가되었습니다: MDX 충돌 없이 Tailwind를 안전하게 불러오는 마법의 코드
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('tailwind-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-script';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [isStartNode, setIsStartNode] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState<"left" | "right" | null>(null);
  const nodeWrapperRef = useRef<HTMLDivElement>(null);

  const handleFoldToggle = useCallback(() => {
    setIsCollapsing(true);
    setIsCollapsed((c) => !c);
  }, []);

  const [leftPorts, setLeftPorts]   = useState<PortItem[]>(INITIAL_LEFT);
  const [rightPorts, setRightPorts] = useState<PortItem[]>(INITIAL_RIGHT);
  const [leftStates, setLeftStates]   = useState<ItemState[]>(INITIAL_LEFT.map(INIT_STATE));
  const [rightStates, setRightStates] = useState<ItemState[]>(INITIAL_RIGHT.map(INIT_STATE));

  interface DragInfo {
    side: "left" | "right";
    sourceIndex: number;
    dropIndex: number;
    x: number; y: number;
  }
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);

  const updateLeft  = useCallback((i: number, p: Partial<ItemState>) => setLeftStates(s => s.map((x, j) => j === i ? { ...x, ...p } : x)), []);
  const updateRight = useCallback((i: number, p: Partial<ItemState>) => setRightStates(s => s.map((x, j) => j === i ? { ...x, ...p } : x)), []);

  const handlePortSelect = useCallback((side: "left" | "right", index: number) => {
    setLeftStates(prev => prev.map((s, i) =>
      side === "left" && i === index ? { ...s, label: "clicked" } : s.label === "clicked" ? { ...s, label: "default" } : s
    ));
    setRightStates(prev => prev.map((s, i) =>
      side === "right" && i === index ? { ...s, label: "clicked" } : s.label === "clicked" ? { ...s, label: "default" } : s
    ));

    const resetOnUp = () => {
      setLeftStates(prev => prev.map(s => s.label === "clicked" ? { ...s, label: "default" } : s));
      setRightStates(prev => prev.map(s => s.label === "clicked" ? { ...s, label: "default" } : s));
      window.removeEventListener("mouseup", resetOnUp);
    };
    window.addEventListener("mouseup", resetOnUp);
  }, []);

  const makeDragStart = useCallback((side: "left" | "right", index: number) => (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX, startY = e.clientY;
    let active = false;
    let drop = index;

    const move = (ev: MouseEvent) => {
      if (!active && Math.abs(ev.clientX - startX) + Math.abs(ev.clientY - startY) > 5) {
        active = true;
        setDragInfo({ side, sourceIndex: index, dropIndex: index, x: ev.clientX, y: ev.clientY });
      }
      if (active) setDragInfo(d => d ? { ...d, x: ev.clientX, y: ev.clientY } : null);
    };

    const up = () => {
      if (active) {
        if (side === "left") {
          setLeftPorts(prev => { if (drop === index || drop === index + 1) return prev; const n = [...prev]; const [r] = n.splice(index, 1); n.splice(drop > index ? drop - 1 : drop, 0, r); return n; });
          setLeftStates(prev => { if (drop === index || drop === index + 1) return prev; const n = [...prev]; const [r] = n.splice(index, 1); n.splice(drop > index ? drop - 1 : drop, 0, r); return n; });
        } else {
          setRightPorts(prev => { if (drop === index || drop === index + 1) return prev; const n = [...prev]; const [r] = n.splice(index, 1); n.splice(drop > index ? drop - 1 : drop, 0, r); return n; });
          setRightStates(prev => { if (drop === index || drop === index + 1) return prev; const n = [...prev]; const [r] = n.splice(index, 1); n.splice(drop > index ? drop - 1 : drop, 0, r); return n; });
        }
      }
      setDragInfo(null);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    (window as any).__setPortDrop = (v: number) => { drop = v; setDragInfo(d => d ? { ...d, dropIndex: v } : null); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }, []);

  const handleRowDragMove = useCallback((rowIndex: number, e: React.MouseEvent, totalRows: number) => {
    if (!dragInfo) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const mid = rect.top + rect.height / 2;
    const drop = e.clientY < mid ? rowIndex : rowIndex + 1;
    (window as any).__setPortDrop?.(drop);
  }, [dragInfo]);

  const nodeState: NodeVisualState = (() => {
    if (isSelected && isHovered) return "selected-hover";
    if (isSelected) return "selected";
    if (isHovered) return "hover";
    return "default";
  })();

  const borderWidth = isSelected ? 2 : 1;
  const borderColor = isSelected ? "#666" : isHovered ? "#ccc" : "#e0e0e0";
  const shadow =
    isSelected || isHovered
      ? "drop-shadow(0px 8px 16px rgba(28,28,28,0.16))"
      : "drop-shadow(0px 4px 6px rgba(28,28,28,0.1))";
  const showToolbar = isHovered || isSelected;
  const toolbarOpacity = isSelected ? 1 : 0.3;

  const info = STATE_LABELS[nodeState];

  return (
    <div
      className="min-h-screen bg-[#f0f0f0] flex flex-col items-center select-none"
      style={{ paddingTop: 60, paddingBottom: 60, gap: 40 }}
      onClick={() => setShowContextMenu(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 13, lineHeight: "20px", color: "#999", marginBottom: 4 }}>
          Components / Node — 개발자 모드
        </p>
        <h1 style={{ fontFamily: "'Pretendard:Bold',sans-serif", fontSize: 28, lineHeight: "36px", color: "#1c1c1c", margin: 0 }}>
          인터랙션 미리보기
        </h1>
      </div>

      <div
        className="bg-[#e2e2e2] rounded-[20px]"
        style={{
          width: 720,
          height: 600,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 80,
          overflow: "visible",
        }}
      >
        <div
          ref={nodeWrapperRef}
          style={{ width: 440, position: "relative" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            if (showContextMenu) { setShowContextMenu(false); return; }
            setIsSelected((s) => !s);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            const rect = nodeWrapperRef.current?.getBoundingClientRect();
            setContextMenuPos({ x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) });
            setIsSelected(true);
            setShowContextMenu(true);
          }}
        >
          {isStartNode && (
            <div
              className="absolute left-[-0.5px] top-[-28px] bg-[#335CFF] rounded-[100px] pl-[4px] pr-[8px] py-[2px]"
              style={{ display: "flex", alignItems: "center", gap: 2, pointerEvents: "none", zIndex: 10 }}
            >
              <div style={{ width: 16, height: 16, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 10 12">
                  <path d={P.flag} fill="#F9F9F9" />
                </svg>
              </div>
              <span style={{ fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 12, lineHeight: "16px", color: "#f9f9f9", whiteSpace: "nowrap" }}>
                시작 노드
              </span>
            </div>
          )}

          {showToolbar && (
            <Toolbar
              opacity={toolbarOpacity}
              isCollapsed={isCollapsed}
              onFoldToggle={handleFoldToggle}
              onMoreClick={(e) => {
                e.stopPropagation();
                const rect = nodeWrapperRef.current?.getBoundingClientRect();
                const btnRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                setContextMenuPos({
                  x: btnRect.left - (rect?.left ?? 0),
                  y: btnRect.bottom - (rect?.top ?? 0) + 6,
                });
                setShowContextMenu(true);
              }}
            />
          )}

          <div
            className="bg-white flex flex-col items-center p-[8px] relative rounded-[8px] cursor-pointer"
            style={{ filter: shadow }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-[8px]"
              style={{ border: `${borderWidth}px solid ${borderColor}` }}
            />

            <NodeHead onDoubleClick={handleFoldToggle} />

            <div
              style={{
                overflow: (isCollapsing || isCollapsed) ? "hidden" : "visible",
                maxHeight: isCollapsed ? 0 : 500,
                transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                width: 458,
                flexShrink: 0,
              }}
              onTransitionEnd={() => setIsCollapsing(false)}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, paddingBottom: 12, position: "relative" }}>
                {Array.from({ length: Math.max(leftPorts.length, rightPorts.length) }).map((_, i) => {
                  const isLastRow = i === Math.max(leftPorts.length, rightPorts.length) - 1;
                  return (
                    <div
                      key={i}
                      style={{ width: 458, flexShrink: 0, marginBottom: isLastRow ? 0 : 4 }}
                      onMouseMove={(e) => handleRowDragMove(i, e, Math.max(leftPorts.length, rightPorts.length))}
                    >
                      <PortRow
                        leftItem={leftPorts[i]}
                        rightItem={rightPorts[i]}
                        leftState={leftStates[i] ?? INIT_STATE()}
                        rightState={rightStates[i] ?? INIT_STATE()}
                        leftDragging={dragInfo?.side === "left" && dragInfo.sourceIndex === i}
                        rightDragging={dragInfo?.side === "right" && dragInfo.sourceIndex === i}
                        onLeftStateChange={(p) => updateLeft(i, p)}
                        onRightStateChange={(p) => updateRight(i, p)}
                        onLeftLabelDown={makeDragStart("left", i)}
                        onRightLabelDown={makeDragStart("right", i)}
                        rowIndex={i}
                        onPortSelect={handlePortSelect}
                      />
                    </div>
                  );
                })}

                {dragInfo && (
                  <div
                    style={{
                      position: "absolute",
                      height: 2,
                      background: "#335CFF",
                      borderRadius: 1,
                      pointerEvents: "none",
                      left: dragInfo.side === "left" ? 22 : 235,
                      width: 201,
                      top: 9 + dragInfo.dropIndex * 38,
                    }}
                  />
                )}
              </div>
            </div>

            {isCollapsed && (
              <>
                <div
                  className="absolute right-[-8px] size-[16px] bg-[#666] rounded-[100px] flex items-center justify-center"
                  style={{ top: "50%", transform: "translateY(-50%)", cursor: "default", zIndex: 10 }}
                  onMouseEnter={() => setHoveredBadge("right")}
                  onMouseLeave={() => setHoveredBadge(null)}
                  onClick={(e) => e.stopPropagation()}
                  onDoubleClick={(e) => { e.stopPropagation(); handleFoldToggle(); }}
                >
                  <span style={{ fontFamily: "'Pretendard:Regular',sans-serif", fontSize: 10, lineHeight: "12px", color: "#f9f9f9" }}>
                    {rightPorts.length}
                  </span>
                  {hoveredBadge === "right" && (
                    <div style={{ position: "absolute", bottom: "calc(100% + 4px)", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none", zIndex: 100 }}>
                      <div style={{ background: "rgba(51,51,51,0.9)", border: "1px solid #ccc", borderRadius: 8, padding: "8px 12px", whiteSpace: "nowrap", marginBottom: -1 }}>
                        <span style={{ fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 14, lineHeight: "20px", color: "#f9f9f9" }}>
                          3 / {rightPorts.length}개 포트 연결됨
                        </span>
                      </div>
                      <div style={{ width: 12, height: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" style={{ transform: "rotate(-90deg) scaleY(-1)" }}>
                          <path d={P.tipOuter} fill="#CCCCCC" />
                          <path d={P.tipInner} fill="rgba(51,51,51,0.9)" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="absolute left-[-8px] size-[16px] bg-[#666] rounded-[100px] flex items-center justify-center"
                  style={{ top: "50%", transform: "translateY(-50%)", cursor: "default", zIndex: 10 }}
                  onMouseEnter={() => setHoveredBadge("left")}
                  onMouseLeave={() => setHoveredBadge(null)}
                  onClick={(e) => e.stopPropagation()}
                  onDoubleClick={(e) => { e.stopPropagation(); handleFoldToggle(); }}
                >
                  <span style={{ fontFamily: "'Pretendard:Regular',sans-serif", fontSize: 10, lineHeight: "12px", color: "#f9f9f9" }}>
                    {leftPorts.length}
                  </span>
                  {hoveredBadge === "left" && (
                    <div style={{ position: "absolute", bottom: "calc(100% + 4px)", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none", zIndex: 100 }}>
                      <div style={{ background: "rgba(51,51,51,0.9)", border: "1px solid #ccc", borderRadius: 8, padding: "8px 12px", whiteSpace: "nowrap", marginBottom: -1 }}>
                        <span style={{ fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 14, lineHeight: "20px", color: "#f9f9f9" }}>
                          3 / {leftPorts.length}개 포트 연결됨
                        </span>
                      </div>
                      <div style={{ width: 12, height: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" style={{ transform: "rotate(-90deg) scaleY(-1)" }}>
                          <path d={P.tipOuter} fill="#CCCCCC" />
                          <path d={P.tipInner} fill="rgba(51,51,51,0.9)" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {showContextMenu && (
            <ContextMenu
              isStartNode={isStartNode}
              onSetStart={() => { setIsStartNode(true); setShowContextMenu(false); }}
              onUnsetStart={() => { setIsStartNode(false); setShowContextMenu(false); }}
              onClose={() => setShowContextMenu(false)}
              x={contextMenuPos.x}
              y={contextMenuPos.y}
            />
          )}
        </div>
      </div>

      {dragInfo && (
        <div style={{ position: "fixed", left: dragInfo.x + 12, top: dragInfo.y - 12, zIndex: 1000, pointerEvents: "none" }}>
          <div style={{ background: "#335cff", borderRadius: 4, padding: "4px 12px", width: 160, opacity: 0.8, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
            <span style={{ fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 12, lineHeight: "16px", color: "#f9f9f9" }}>
              {dragInfo.side === "left"
                ? leftPorts[dragInfo.sourceIndex]?.name
                : rightPorts[dragInfo.sourceIndex]?.name}
            </span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ background: "#1c1c1c", color: "white", borderRadius: 100, padding: "4px 12px", fontFamily: "'Pretendard:Bold',sans-serif", fontSize: 13 }}>
            {info.ko}
          </span>
          {isCollapsed && (
            <span style={{ background: "#555", color: "white", borderRadius: 100, padding: "4px 10px", fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 12 }}>
              아코디언 접힘
            </span>
          )}
          {isStartNode && (
            <span style={{ background: "#335CFF", color: "white", borderRadius: 100, padding: "4px 10px", fontFamily: "'Pretendard:Medium',sans-serif", fontSize: 12 }}>
              시작 노드
            </span>
          )}
          <span style={{ fontFamily: "'Pretendard:Regular',sans-serif", fontSize: 13, color: "#999" }}>
            {info.en}
          </span>
        </div>
      </div>
    </div>
  );
}

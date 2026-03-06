export interface HumanDesignReport {
  level: string;
  type: HdContent;
  strategy: HdContent;
  signature: HdContent;
  notSelfTheme: HdContent;
  authority: HdContent;
  definition: HdContent;
  profile: HdContent;
  cross: HdContent;
  variables: any;
  arrows: HdVariables;
  centers: HdCenter[];
  gates: HdGate[];
  designGates: HdGateDetail[];
  channels: HdContent[];
}

export interface HdContent {
  key: string;
  title: string;
  description: string;
  imageId: null
}
export interface HdChart {
  centers: HdCenter[],
  gates: HdGate[],
  variables: HdVariables
}

export interface HdCenter {
  name: string;
  isDefined: boolean;
  content: HdContent;
}

export interface HdGate {
  gate: number;
  type: "Design" | "Personality" | "Both",
  title: string;
  description: string;
}

export interface HdGateDetail {
  gate: number;
  line: number;
  type: "Design" | "Personality" | "Both";
  fixingState: "None" | "Juxtaposed" | "Exalted" | "Detriment";
  planet: string,
  center: string
  quarter: string
}

export interface HdArrow {
  direction: 'left' | 'right';
  color: number;
  rone: number;
}

export interface HdVariables {
  digestionArrow: HdArrow,
  environmentArrow: HdArrow,
  awarenessArrow: HdArrow,
  perspectiveArrow: HdArrow
}

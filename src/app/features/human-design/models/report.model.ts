export interface HumanDesignReport {
  name: string;
  type: string;
  strategy: string;
  authority: string;
  profile: string;
  incarnationCrossDescription: string;
  definedCenters: any[];
  channels: any[];
  gates: any[];
}

export interface HdChart {
  centers: HdCenter[],
  gates: HdGate[],
  variables: HdVariables
}

export interface HdCenter {
  name: string;
  isDefined: boolean;
}

export interface HdGate {
  gate: number;
  type: "Design" | "Personality" | "Both"
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

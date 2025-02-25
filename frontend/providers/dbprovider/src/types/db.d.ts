import { DBTypeEnum, DBStatusEnum, PodStatusEnum } from '@/constants/db';
import { BackupStatusEnum } from '@/constants/backup';
import type {
  V1Deployment,
  V1ConfigMap,
  V1Service,
  V1Ingress,
  V1Secret,
  V1HorizontalPodAutoscaler,
  V1Pod,
  SinglePodMetrics,
  V1StatefulSet
} from '@kubernetes/client-node';

export type DBType = `${DBTypeEnum}`;

export type DeployKindsType =
  | V1Deployment
  | V1StatefulSet
  | V1ConfigMap
  | V1Service
  | V1Ingress
  | V1Secret
  | V1HorizontalPodAutoscaler;

export type EditType = 'form' | 'yaml';

export interface DBStatusMapType {
  label: string;
  value: `${DBStatusEnum}`;
  color: string;
  backgroundColor: string;
  dotColor: string;
}

export interface DBListItemType {
  id: string;
  name: string;
  dbType: DBType;
  status: DBStatusMapType;
  createTime: string;
  cpu: number;
  memory: number;
  storage: string;
  conditions: DBConditionItemType[];
}

export interface DBEditType {
  dbType: DBType;
  dbVersion: string;
  dbName: string;
  replicas: number;
  cpu: number; //
  memory: number;
  storage: number;
}

export interface DBDetailType extends DBEditType {
  id: string;
  createTime: string;
  status: DBStatusMapType;
  conditions: DBConditionItemType[];
}

export interface DBConditionItemType {
  lastTransitionTime: string;
  message: string;
  observedGeneration: 3;
  reason: string;
  status: 'True' | 'False';
  type: string;
}

export interface PodStatusMapType {
  label: string;
  value: `${PodStatusEnum}`;
  color: string;
}
export interface PodDetailType extends V1Pod {
  podName: string;
  status: PodStatusMapType;
  nodeName: string;
  ip: string;
  restarts: number;
  age: string;
  cpu: number;
  memory: number;
}

export interface PodEvent {
  id: string;
  reason: string;
  message: string;
  count: number;
  type: string | 'Normal' | 'Warning';
  firstTime: string;
  lastTime: string;
}

export interface BackupStatusMapType {
  label: string;
  value: `${BackupStatusEnum}`;
  color: string;
}
export interface BackupItemType {
  id: string;
  name: string;
  status: BackupStatusMapType;
  startTime: Date;
  endTime: Date;
  storage: number;
  type: 'auto' | 'manual';
}

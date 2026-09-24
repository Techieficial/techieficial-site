import {
  FlowArrowIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  RobotIcon,
  VideoCameraIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";

/** Maps icon names used in content files to Phosphor icons. */
const registry: Record<string, ComponentType<IconProps>> = {
  FlowArrow: FlowArrowIcon,
  Megaphone: MegaphoneIcon,
  VideoCamera: VideoCameraIcon,
  Robot: RobotIcon,
  GraduationCap: GraduationCapIcon,
};

export function ContentIcon({ name, ...props }: { name: string } & IconProps) {
  const Icon = registry[name] ?? SparkleIcon;
  return <Icon {...props} />;
}

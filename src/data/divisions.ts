import type { LucideIcon } from 'lucide-react'
import { GraduationCap, CircuitBoard, HousePlug, Wrench, Bot, FlaskConical } from 'lucide-react'

/** The six business divisions of VISRONIX Technologies. */
export type Division = {
  index: string
  name: string
  summary: string
  to: string
  icon: LucideIcon
}

export const divisions: Division[] = [
  {
    index: '01',
    name: 'STEM Education & Training',
    summary:
      'Hands-on robotics, electronics, IoT and embedded-systems learning for school and college students.',
    to: '/stem-education',
    icon: GraduationCap,
  },
  {
    index: '02',
    name: 'Electronic Components Store',
    summary:
      'Boards, sensors, modules and maker hardware — a curated catalogue with direct enquiry ordering.',
    to: '/electronic-components',
    icon: CircuitBoard,
  },
  {
    index: '03',
    name: 'IoT & Smart Home Solutions',
    summary:
      'Smart lighting, appliance automation, energy monitoring and custom connected devices.',
    to: '/iot-solutions',
    icon: HousePlug,
  },
  {
    index: '04',
    name: 'Engineering Project Support',
    summary:
      'Technical guidance, design and prototype development for school, college and custom projects.',
    to: '/engineering-projects',
    icon: Wrench,
  },
  {
    index: '05',
    name: 'AGRINEX Robotics',
    summary:
      'Our flagship smart agricultural robot — engineering automation for the fields that feed us.',
    to: '/agrinex',
    icon: Bot,
  },
  {
    index: '06',
    name: 'Research & Innovation',
    summary:
      'Applied exploration in robotics, embedded intelligence and emerging technology.',
    to: '/research',
    icon: FlaskConical,
  },
]

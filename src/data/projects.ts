/**
 * Portfolio & project data.
 *
 * HONESTY: only AGRINEX is a confirmed VISRONIX project today, and it is an
 * in-development prototype — not a completed case study. No invented client
 * projects, outcomes or statistics are published. When real projects are
 * completed, add entries with `status: 'completed'` and verified outcomes.
 */

export type ProjectStatus = 'prototype' | 'in-progress' | 'completed'
export type ProjectCategory = 'Robotics' | 'IoT' | 'Electronics' | 'Automation' | 'Research'

export type Project = {
  id: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  summary: string
  problem: string
  solution: string
  technologies: string[]
  relatedService: { label: string; to: string }
  link?: { label: string; to: string }
}

export const statusLabels: Record<ProjectStatus, string> = {
  prototype: 'Prototype',
  'in-progress': 'In development',
  completed: 'Completed',
}

export const projectCategories: ProjectCategory[] = [
  'Robotics',
  'IoT',
  'Electronics',
  'Automation',
  'Research',
]

export const projects: Project[] = [
  {
    id: 'agrinex',
    title: 'AGRINEX — Smart Agricultural Robot',
    category: 'Robotics',
    status: 'prototype',
    summary:
      'An agricultural robot being developed in-house to take repetitive field work off farmers — starting with autonomous navigation and monitoring in farm rows.',
    problem:
      'Manual field operations are labour-intensive, repetitive and hard to scale. Small farms need affordable automation that fits real field conditions, not industrial equipment priced for large agribusiness.',
    solution:
      'AGRINEX is being engineered as a compact, field-capable robot platform — combining embedded control, sensor-based navigation and a modular chassis designed around agricultural row geometry.',
    technologies: ['Embedded control', 'Sensor fusion', 'Robotics chassis design', 'IoT connectivity'],
    relatedService: { label: 'Research & Innovation', to: '/research' },
    link: { label: 'View the AGRINEX page', to: '/agrinex' },
  },
]

/**
 * Research & innovation areas.
 * Status is honest: only AGRINEX-related work is confirmed as active.
 * Everything else is a declared direction of exploration, not a claim
 * of completed research.
 */

export type ResearchArea = {
  id: string
  name: string
  status: 'active' | 'exploring'
  description: string
}

export const researchAreas: ResearchArea[] = [
  {
    id: 'agri-robotics',
    name: 'Agricultural Robotics',
    status: 'active',
    description:
      'AGRINEX — field-capable robot platforms for monitoring and assistance in real farm conditions.',
  },
  {
    id: 'autonomous-navigation',
    name: 'Autonomous Navigation',
    status: 'active',
    description:
      'Sensor-based navigation and obstacle handling for robots operating in unstructured outdoor spaces.',
  },
  {
    id: 'embedded-systems',
    name: 'Embedded Systems',
    status: 'active',
    description:
      'Firmware, real-time control and low-power design — the engineering layer beneath every VISRONIX product.',
  },
  {
    id: 'iot-networks',
    name: 'IoT & Sensor Networks',
    status: 'exploring',
    description:
      'Multi-node sensing, edge data collection and dashboards for agriculture and smart environments.',
  },
  {
    id: 'applied-ai',
    name: 'Applied AI',
    status: 'exploring',
    description:
      'Practical machine intelligence where it earns its place — vision and decision support for robotics.',
  },
  {
    id: 'product-development',
    name: 'New Product Development',
    status: 'exploring',
    description:
      'Turning lab ideas into buildable products: design-for-manufacture thinking, cost-down and iteration.',
  },
]

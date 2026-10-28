/**
 * IoT & smart home services.
 * Scope note: only services VISRONIX has described (design, prototyping,
 * custom development) are presented. Installation/maintenance claims are
 * avoided until the client confirms that scope.
 */

export type IotService = {
  id: string
  name: string
  summary: string
  points: string[]
}

export const iotServices: IotService[] = [
  {
    id: 'smart-lighting',
    name: 'Smart Lighting',
    summary: 'Lighting you control from your phone, a wall switch or automatically by schedule and presence.',
    points: ['App and manual control', 'Scheduling and scenes', 'Motion / presence-based switching'],
  },
  {
    id: 'appliance-automation',
    name: 'Home Appliance Automation',
    summary: 'Bring everyday appliances into a single control system — safely, with proper isolation and ratings.',
    points: ['Relay-based switching', 'Safety-first wiring design', 'Works alongside existing switches'],
  },
  {
    id: 'energy-monitoring',
    name: 'Energy Monitoring',
    summary: 'See where power goes. Live consumption data that helps you find waste and reduce bills.',
    points: ['Real-time consumption readings', 'Per-circuit or whole-home views', 'Dashboard with history'],
  },
  {
    id: 'sensor-monitoring',
    name: 'Sensor-Based Monitoring',
    summary: 'Temperature, humidity, motion, gas and more — sensed, logged and alerted on your phone.',
    points: ['Environment sensing', 'Threshold alerts', 'Logged data for review'],
  },
  {
    id: 'custom-iot-devices',
    name: 'Custom IoT Devices',
    summary: 'A device you need that nobody sells yet. We design, prototype and build it around your requirement.',
    points: ['Requirement analysis', 'Hardware + firmware development', 'Prototype iteration'],
  },
  {
    id: 'connected-systems',
    name: 'Connected Systems & Prototypes',
    summary: 'Multi-node systems for homes, labs and small businesses — sensors, controllers and dashboards working together.',
    points: ['Node-to-node communication', 'Central dashboards', 'Proof-of-concept to working pilot'],
  },
]

/** How an IoT engagement typically proceeds (described honestly as our approach). */
export const iotProcess = [
  {
    step: 'Consultation',
    text: 'We discuss your space, your appliances and what you want automated — then advise what is practical.',
  },
  {
    step: 'Design',
    text: 'We select hardware and design the control logic around your requirements and safety needs.',
  },
  {
    step: 'Prototype & build',
    text: 'We build and test the system, iterating with you until it behaves the way you expect.',
  },
  {
    step: 'Handover',
    text: 'You get a working system and a clear walkthrough of how to use and maintain it.',
  },
]

/**
 * STEM course catalogue.
 *
 * NOTE (client input needed): fees, schedules, batch dates and certifications
 * are intentionally NOT included — nothing here is confirmed yet. Enquiry
 * CTAs ask the company directly, so no invented details are published.
 * Add `fee`, `schedule` or `certificate` fields here once verified.
 */

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type CourseAudience = 'School' | 'College' | 'School & College'

export type Course = {
  id: string
  title: string
  level: CourseLevel
  audience: CourseAudience
  description: string
  skills: string[]
  format: string
}

export const courses: Course[] = [
  {
    id: 'robotics-foundations',
    title: 'Robotics Foundations',
    level: 'Beginner',
    audience: 'School & College',
    description:
      'Build and program your first robots. Learn how motors, drivers, sensors and simple code come together into a machine that moves and reacts.',
    skills: ['Robot chassis & drive systems', 'Motor control basics', 'Obstacle sensing', 'Block/Arduino programming'],
    format: 'Hands-on workshop sessions with take-home robot builds',
  },
  {
    id: 'arduino-electronics',
    title: 'Arduino & Electronics',
    level: 'Beginner',
    audience: 'School & College',
    description:
      'From first breadboard circuit to working Arduino projects. Understand components, read schematics and wire real things that blink, sense and respond.',
    skills: ['Circuit fundamentals', 'Arduino programming', 'Breadboarding & soldering', 'Reading datasheets'],
    format: 'Lab-style practical sessions, component kits provided',
  },
  {
    id: 'iot-systems',
    title: 'IoT Systems',
    level: 'Intermediate',
    audience: 'College',
    description:
      'Connect devices to the cloud. Build sensor nodes, stream live data and control hardware remotely — the full stack of a working IoT product.',
    skills: ['ESP32 development', 'Wi-Fi & MQTT networking', 'Cloud dashboards', 'Sensor integration'],
    format: 'Project-based learning with a connected-device capstone',
  },
  {
    id: 'embedded-systems',
    title: 'Embedded Systems with ESP32',
    level: 'Intermediate',
    audience: 'College',
    description:
      'Go closer to the metal. Microcontroller architecture, peripherals, timers, communication protocols and firmware that runs reliably.',
    skills: ['ESP32 / microcontroller architecture', 'GPIO, ADC, PWM, timers', 'I2C, SPI, UART', 'Low-power design'],
    format: 'Structured modules with firmware lab exercises',
  },
  {
    id: 'sensors-microcontrollers',
    title: 'Sensors & Microcontrollers',
    level: 'Beginner',
    audience: 'School & College',
    description:
      'Teach machines to measure the world. Temperature, motion, light, distance — wire sensors to microcontrollers and turn readings into decisions.',
    skills: ['Sensor selection & wiring', 'Signal reading (analog/digital)', 'Calibration', 'Data-driven control'],
    format: 'Hands-on sensor lab with guided experiments',
  },
  {
    id: 'project-lab',
    title: 'Project Lab — Build Your Own',
    level: 'Advanced',
    audience: 'College',
    description:
      'Bring an idea, leave with a working prototype. Guided self-directed building with mentor support on design, sourcing, debugging and iteration.',
    skills: ['Project planning', 'Rapid prototyping', 'Debugging methodology', 'Documentation & demo skills'],
    format: 'Mentored open-lab format over multiple weeks',
  },
]

/** Learning domains highlighted on the education page and homepage. */
export const learningDomains = [
  {
    name: 'Robotics',
    description: 'Mechanisms, drive systems, autonomy basics and robot programming.',
  },
  {
    name: 'Arduino & Electronics',
    description: 'Circuits, components, microcontrollers and hands-on prototyping.',
  },
  {
    name: 'IoT',
    description: 'Connected devices, sensors, networks and cloud dashboards.',
  },
  {
    name: 'Embedded Systems',
    description: 'Firmware, peripherals and real-world constraints of small computers.',
  },
  {
    name: 'Sensors & Microcontrollers',
    description: 'Measuring the physical world and acting on it with code.',
  },
  {
    name: 'Project-Based Learning',
    description: 'Every concept lands in a working build you can demo and explain.',
  },
]

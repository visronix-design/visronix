/**
 * Electronic components catalogue.
 *
 * HONESTY RULES (enforced by the store UI):
 *  - `demo: true` entries are demonstration listings so the client can see
 *    the catalogue structure. They describe standard, well-known hobby
 *    electronics parts — but VISRONIX has NOT yet confirmed its actual
 *    stock, prices or availability. Every enquiry therefore asks the
 *    company directly instead of showing invented prices or stock counts.
 *  - Replace demo entries with the real inventory as it is confirmed.
 *    New products: copy the Product shape, set demo: false.
 */

export type ProductCategory =
  | 'Arduino boards'
  | 'ESP32 boards'
  | 'Sensors'
  | 'Electronic modules'
  | 'Microcontrollers'
  | 'Motor drivers'
  | 'Connectivity modules'
  | 'Development accessories'
  | 'Other components'

export const productCategories: ProductCategory[] = [
  'Arduino boards',
  'ESP32 boards',
  'Sensors',
  'Electronic modules',
  'Microcontrollers',
  'Motor drivers',
  'Connectivity modules',
  'Development accessories',
  'Other components',
]

export type Product = {
  id: string
  name: string
  category: ProductCategory
  description: string
  /** Short factual spec highlights for standard, well-known parts. */
  specs: string[]
  demo: boolean
}

export const products: Product[] = [
  {
    id: 'arduino-uno-r3',
    name: 'Arduino Uno R3',
    category: 'Arduino boards',
    description:
      'The classic maker microcontroller board — the standard first board for electronics and robotics learning.',
    specs: ['ATmega328P @ 16 MHz', '14 digital I/O, 6 analog inputs', 'USB programming', '5 V logic'],
    demo: true,
  },
  {
    id: 'arduino-nano',
    name: 'Arduino Nano',
    category: 'Arduino boards',
    description:
      'Compact breadboard-friendly Arduino board for space-constrained builds and small robots.',
    specs: ['ATmega328P', 'Mini-B USB', 'Breadboard-compatible footprint'],
    demo: true,
  },
  {
    id: 'esp32-devkit',
    name: 'ESP32 DevKit V1',
    category: 'ESP32 boards',
    description:
      'Wi-Fi + Bluetooth dual-core microcontroller board — the workhorse of IoT projects and connected devices.',
    specs: ['Dual-core 240 MHz', 'Wi-Fi 802.11 b/g/n + Bluetooth', '34 GPIO, 12-bit ADC', 'Micro-USB'],
    demo: true,
  },
  {
    id: 'esp32-cam',
    name: 'ESP32-CAM',
    category: 'ESP32 boards',
    description:
      'ESP32 board with camera support for vision projects, remote monitoring and simple image capture.',
    specs: ['OV2640 camera', 'MicroSD slot', 'Wi-Fi + Bluetooth'],
    demo: true,
  },
  {
    id: 'ultrasonic-hc-sr04',
    name: 'Ultrasonic Sensor HC-SR04',
    category: 'Sensors',
    description:
      'Distance measurement sensor used in obstacle-avoiding robots, level sensing and proximity detection.',
    specs: ['2 cm – 400 cm range', 'Trigger + echo pins', '5 V operation'],
    demo: true,
  },
  {
    id: 'dht11',
    name: 'DHT11 Temperature & Humidity Sensor',
    category: 'Sensors',
    description:
      'Combined temperature and humidity sensor — a standard choice for weather stations and environment monitoring.',
    specs: ['Digital single-wire output', '0–50 °C, 20–90 % RH typical range'],
    demo: true,
  },
  {
    id: 'ir-obstacle',
    name: 'IR Obstacle Avoidance Module',
    category: 'Sensors',
    description:
      'Infrared reflection sensor for line following, edge detection and basic obstacle avoidance robots.',
    specs: ['Adjustable threshold', 'Digital output'],
    demo: true,
  },
  {
    id: 'relay-4ch',
    name: '4-Channel Relay Module',
    category: 'Electronic modules',
    description:
      'Switch mains appliances safely from a microcontroller — the core building block of home automation.',
    specs: ['4 isolated channels', 'Opto-isolated inputs', '5 V coil'],
    demo: true,
  },
  {
    id: 'motor-driver-l298n',
    name: 'L298N Motor Driver Module',
    category: 'Motor drivers',
    description:
      'Dual H-bridge driver for running DC motors and stepper motors in robots and automation builds.',
    specs: ['Dual H-bridge', 'Up to 2 A per channel (typical)', '5–35 V motor supply'],
    demo: true,
  },
  {
    id: 'servo-mg996r',
    name: 'MG996R Servo Motor',
    category: 'Other components',
    description:
      'Metal-gear standard servo for robotic joints, steering and articulated mechanisms.',
    specs: ['Metal gears', '~10 kg·cm torque class', 'PWM control'],
    demo: true,
  },
  {
    id: 'hc-05',
    name: 'HC-05 Bluetooth Module',
    category: 'Connectivity modules',
    description:
      'Serial Bluetooth bridge for wireless control of robots and microcontroller projects.',
    specs: ['Bluetooth 2.0 SPP', 'UART interface'],
    demo: true,
  },
  {
    id: 'esp8266-nodemcu',
    name: 'NodeMCU ESP8266',
    category: 'Microcontrollers',
    description:
      'Wi-Fi microcontroller board — a compact, economical option for simple connected devices.',
    specs: ['ESP8266 @ 80 MHz', 'Wi-Fi 802.11 b/g/n', 'Micro-USB'],
    demo: true,
  },
  {
    id: 'breadboard-kit',
    name: 'Breadboard + Jumper Kit',
    category: 'Development accessories',
    description:
      'Solderless prototyping essentials — breadboard and jumper wires for every build session.',
    specs: ['830-point breadboard', 'M/M + M/F jumper set'],
    demo: true,
  },
  {
    id: 'lcd-16x2-i2c',
    name: '16×2 LCD with I2C Backpack',
    category: 'Electronic modules',
    description:
      'Character display module for showing readings, statuses and menus — only two data wires needed with I2C.',
    specs: ['16 columns × 2 rows', 'I2C interface (SDA/SCL)', '5 V backlit'],
    demo: true,
  },
]

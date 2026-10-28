/**
 * AGRINEX — flagship agricultural robot content.
 *
 * HONESTY: the client has not yet supplied verified feature lists,
 * specifications, photos or videos. The page therefore presents:
 *  - the agricultural problem (industry context, not product claims),
 *  - a clearly-labelled development status,
 *  - designed placeholders for media and specifications,
 * and never presents concept art as a real photograph. Replace the
 * placeholder flags below as verified material arrives.
 */

export type CapabilityGroup = {
  id: 'implemented' | 'in-development' | 'planned'
  label: string
  note: string
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: 'implemented',
    label: 'Implemented in the prototype',
    note: 'Confirmed capabilities will be listed here as the prototype is documented.',
  },
  {
    id: 'in-development',
    label: 'Under development',
    note: 'Features currently being engineered and tested on the prototype.',
  },
  {
    id: 'planned',
    label: 'Planned improvements',
    note: 'The direction the platform is heading — not yet built, not yet promised.',
  },
]

export const agrinexJourney = [
  {
    stage: 'Concept',
    text: 'Identifying the agricultural problems worth solving and the platform shape that solves them.',
    state: 'done' as const,
  },
  {
    stage: 'Prototype',
    text: 'Building and iterating the first working robot — chassis, drive, control and sensing.',
    state: 'current' as const,
  },
  {
    stage: 'Field testing',
    text: 'Validating behaviour in real farm conditions, across rows, soil and weather.',
    state: 'next' as const,
  },
  {
    stage: 'Pilot deployment',
    text: 'Working alongside farmers to prove value in daily use.',
    state: 'future' as const,
  },
]

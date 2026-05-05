export const qk = {
  user: {
    home: () => ['user', 'home'] as const,
  },
  workout: {
    routines: () => ['workout', 'routines'] as const,
    routine: (id: string) => ['workout', 'routine', id] as const,
    template: (id: string) => ['workout', 'routine', id] as const,
  },
} as const;
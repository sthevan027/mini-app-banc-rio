export const accountKeys = {
  all: ['account'] as const,
  overview: () => [...accountKeys.all, 'overview'] as const,
}

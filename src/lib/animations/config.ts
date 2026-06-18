export const animConfig = {
  enabled: true,
  heroAnimations: true,
  scrollReveal: true,
  productCardAnimations: true,
  floatingElements: true,
  // 'reduced' = desactiva floats y loops en mobile, 'off' = desactiva todo
  mobileAnimations: 'reduced' as 'full' | 'reduced' | 'off',
  debug: false,
} as const;

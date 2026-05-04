export function calculateEffectivePermissions(roleDefaults = [], overrides = []) {
  const effective = new Set(roleDefaults);

  for (const override of overrides) {
    if (override.override_type === 'add') {
      effective.add(override.permission_key);
    } else if (override.override_type === 'remove') {
      effective.delete(override.permission_key);
    }
  }

  return Array.from(effective);
}

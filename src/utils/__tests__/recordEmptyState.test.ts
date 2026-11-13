import { getRecordEmptyState } from '../recordEmptyState';

const defaults = {
  isSearchMode: false,
  searchQuery: '',
  hasFilters: false,
  petName: 'Buddy',
};

describe('getRecordEmptyState', () => {
  it('shows an onboarding CTA for a pet without medical records', () => {
    const state = getRecordEmptyState(defaults);
    expect(state).toEqual({
      icon: 'document-text-outline',
      title: 'No medical records yet',
      description: "Keep Buddy's health history in one place. Return to the pet profile to add a record.",
      buttonText: 'Back to pet profile',
      action: 'back',
    });
  });

  it('uses generic copy when the pet has no name', () => {
    expect(getRecordEmptyState({ ...defaults, petName: undefined }).description).toContain(
      "your pet's health history",
    );
  });

  it('offers to clear filters instead of treating filtered results as a new pet', () => {
    const state = getRecordEmptyState({ ...defaults, hasFilters: true });
    expect(state.action).toBe('clearFilters');
    expect(state.title).toBe('No matching records');
  });

  it('offers to clear the search instead of navigating away', () => {
    const state = getRecordEmptyState({
      ...defaults,
      isSearchMode: true,
      searchQuery: 'rabies',
    });
    expect(state.action).toBe('clearSearch');
    expect(state.description).toContain('"rabies"');
  });

  it('prioritizes search even when filters are active', () => {
    const state = getRecordEmptyState({
      ...defaults,
      isSearchMode: true,
      searchQuery: ' checkup ',
      hasFilters: true,
    });
    expect(state.action).toBe('clearSearch');
    expect(state.description).toContain('"checkup"');
  });
});

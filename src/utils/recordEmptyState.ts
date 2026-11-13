/**
 * Copy and action for the zero-records view. Keep search, filters, and a
 * genuinely empty medical history separate so the CTA does the right thing.
 */
export type RecordEmptyAction = 'clearSearch' | 'clearFilters' | 'back';

export interface RecordEmptyState {
  icon: 'search-outline' | 'funnel-outline' | 'document-text-outline';
  title: string;
  description: string;
  buttonText: string;
  action: RecordEmptyAction;
}

export function getRecordEmptyState({
  isSearchMode,
  searchQuery,
  hasFilters,
  petName,
}: {
  isSearchMode: boolean;
  searchQuery: string;
  hasFilters: boolean;
  petName?: string;
}): RecordEmptyState {
  if (isSearchMode) {
    return {
      icon: 'search-outline',
      title: 'No search results',
      description: `No medical records match "${searchQuery.trim()}". Try a different search.`,
      buttonText: 'Clear search',
      action: 'clearSearch',
    };
  }

  if (hasFilters) {
    return {
      icon: 'funnel-outline',
      title: 'No matching records',
      description: 'No records match these filters. Try another date or record type.',
      buttonText: 'Clear filters',
      action: 'clearFilters',
    };
  }

  return {
    icon: 'document-text-outline',
    title: 'No medical records yet',
    description: `Keep ${petName?.trim() || "your pet"}'s health history in one place. Return to the pet profile to add a record.`,
    buttonText: 'Back to pet profile',
    action: 'back',
  };
}

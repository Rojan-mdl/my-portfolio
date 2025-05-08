import { Suspense } from 'react';
import PortfolioLoader from '@/components/portfolio/PortfolioLoader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PortfolioContent() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PortfolioLoader />
    </Suspense>
  );
} 
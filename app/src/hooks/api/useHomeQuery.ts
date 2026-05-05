import { useQuery } from '@tanstack/react-query';
import { qk } from '../../lib/queryKeys';
import { getHome } from '../../api/user';

export const useHomeQuery = () => {
  return useQuery({
    queryKey: qk.user.home(),
    queryFn: getHome,
    staleTime: 30_000,
  });
};
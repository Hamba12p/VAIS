declare module '@hookform/resolvers/zod' {
  import type { Resolver } from 'react-hook-form';
  export function zodResolver(schema: any, options?: any): Resolver<any, any>;
}

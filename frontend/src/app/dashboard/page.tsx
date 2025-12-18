import { Protected } from '@/components/layout/Protected';

export default function DashboardPage() {
    return (
        <Protected>
            <div>Dashboard (protected)</div>
        </Protected>
    );
}
